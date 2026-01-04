import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BankState, Transaction, Card, Investment, UserProfile } from '../types/types';

interface BankActions {
  sendMoney: (
    name: string,
    amount: number,
    logo: string
  ) => Promise<{ success: boolean; error?: string }>;
  toggleCardFreeze: (cardId: string) => void;
  addMoney: (amount: number, cardId?: string) => Promise<{ success: boolean; error?: string }>;
}

export type BankStore = BankState &
  BankActions & {
    pendingOperations: Set<string>;
  };

const initialData: BankState = {
  balance: 42850000.0, // Total net worth approx $15,000
  walletBalance: 2840500.0, // Liquid spendable money approx $1,000
  userProfile: {
    name: 'Mubarak Odetunde ',
    email: 'odetundemubarak04@gmail.com',
    accountNumber: '8140120760',
    avatar:
      'https://static.vecteezy.com/system/resources/previews/001/234/721/large_2x/portrait-of-a-young-black-man-vector.jpg',
  },
  transactions: [
    {
      id: '1',
      name: 'Okpeta Daniel',
      time: '12:35 PM',
      amount: '-FC45,000.00',
      logo: 'UBA',
      status: 'confirmed',
    },
    {
      id: '2',
      name: 'Odetunde Mukhtar',
      time: '11:37 AM',
      amount: '-FC850,000.00',
      logo: 'Carbon',
      status: 'confirmed',
    },
    {
      id: '3',
      name: 'Salisu Sherifdeen',
      time: '11:22 AM',
      amount: '-FC120,500.00',
      logo: 'FCMB',
      status: 'confirmed',
    },
    {
      id: '4',
      name: 'Vodacom Data 2438140120760',
      time: '10:54 AM',
      amount: '-FC15,000.00',
      logo: 'Voda',
      status: 'confirmed',
    },
    {
      id: '5',
      name: 'Umaru Abubakar',
      time: '9:23 AM',
      amount: '+FC50,000.00',
      logo: 'Ecobank',
      status: 'confirmed',
    },
  ],
  cards: [
    {
      id: '1',
      type: 'Virtual',
      provider: 'Visa',
      cardNumber: '**** **** **** 4290',
      expiryDate: '12/26',
      cvv: '123',
      isFrozen: false,
      balance: 1500000.0,
      color: '#007AFF',
    },
    {
      id: '2',
      type: 'Physical',
      provider: 'Mastercard',
      cardNumber: '**** **** **** 8812',
      expiryDate: '09/25',
      cvv: '456',
      isFrozen: true,
      balance: 14509500.0,
      color: '#34C759',
    },
  ],
  investments: [
    {
      id: '1',
      name: 'Goma Real Estate',
      category: 'Property',
      amount: 15000000.0,
      returns: '+12.5%',
      iconName: 'Buildings',
    },
    {
      id: '2',
      name: 'Soko Tech Kinshasa',
      category: 'Stocks',
      amount: 9000000.0,
      returns: '+24.1%',
      iconName: 'Chart',
    },
  ],
  opportunities: [
    { name: 'Kivu Mining Alpha', returns: '22% p.a', risk: 'High' },
    { name: 'Soko Fixed Deposit', returns: '14.5% p.a', risk: 'Low' },
    { name: 'Lubumbashi Tech Hub', returns: '18% p.a', risk: 'Medium' },
  ],
};

const api = {
  sendMoney: async (data: { name: string; amount: number; logo: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
  },

  addMoney: async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
  },
};

export const useBankStore = create<BankStore>()(
  persist(
    (set, get) => ({
      ...initialData,
      pendingOperations: new Set<string>(),

      sendMoney: async (name: string, amount: number, logo: string) => {
        const tempId = `temp_${crypto.randomUUID()}`;
        const operationKey = `send_${tempId}`;

        if (get().pendingOperations.has(operationKey)) {
          return { success: false, error: 'Transaction already in progress' };
        }

        const currentWalletBalance = get().walletBalance;
        if (currentWalletBalance < amount) {
          return {
            success: false,
            error: 'Insufficient wallet balance. Please add money via card first.',
          };
        }

        set((state) => ({
          pendingOperations: new Set(state.pendingOperations).add(operationKey),
        }));

        const optimisticTransaction: Transaction = {
          id: tempId,
          name,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          amount: `-FC${amount.toLocaleString()}`,
          logo,
          status: 'pending',
        };

        set((state) => ({
          walletBalance: state.walletBalance - amount,
          balance: state.balance - amount,
          transactions: [optimisticTransaction, ...state.transactions],
        }));

        try {
          const result = await api.sendMoney({ name, amount, logo });

          set((state) => {
            const newPending = new Set(state.pendingOperations);
            newPending.delete(operationKey);

            return {
              transactions: state.transactions.map((t) =>
                t.id === tempId ? { ...t, id: result.id, status: 'confirmed' } : t
              ),
              pendingOperations: newPending,
            };
          });

          return { success: true };
        } catch (error) {
          set((state) => {
            const newPending = new Set(state.pendingOperations);
            newPending.delete(operationKey);

            return {
              walletBalance: state.walletBalance + amount,
              balance: state.balance + amount,
              transactions: state.transactions.map((t) =>
                t.id === tempId ? { ...t, status: 'failed' } : t
              ),
              pendingOperations: newPending,
            };
          });

          return {
            success: false,
            error: error instanceof Error ? error.message : 'Transaction failed',
          };
        }
      },

      addMoney: async (amount: number, cardId?: string) => {
        const tempId = `temp_${crypto.randomUUID()}`;
        const operationKey = `topup_${tempId}`;

        if (get().pendingOperations.has(operationKey)) {
          return { success: false, error: 'Top-up already in progress' };
        }

        if (cardId) {
          const card = get().cards.find((c) => c.id === cardId);
          if (!card || card.balance < amount) {
            return { success: false, error: 'Insufficient card balance' };
          }
        }

        set((state) => ({
          pendingOperations: new Set(state.pendingOperations).add(operationKey),
        }));

        const optimisticTransaction: Transaction = {
          id: tempId,
          name: cardId ? 'Top-up from Card' : 'Top-up',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          amount: `+FC${amount.toLocaleString()}`,
          logo: cardId ? 'Card' : 'Deposit',
          status: 'pending',
        };

        set((state) => {
          const newCards = cardId
            ? state.cards.map((c) => (c.id === cardId ? { ...c, balance: c.balance - amount } : c))
            : state.cards;

          return {
            walletBalance: state.walletBalance + amount,
            balance: cardId ? state.balance : state.balance + amount,
            cards: newCards,
            transactions: [optimisticTransaction, ...state.transactions],
          };
        });

        try {
          const result = await api.addMoney(amount);

          set((state) => {
            const newPending = new Set(state.pendingOperations);
            newPending.delete(operationKey);

            return {
              transactions: state.transactions.map((t) =>
                t.id === tempId ? { ...t, id: result.id, status: 'confirmed' } : t
              ),
              pendingOperations: newPending,
            };
          });

          return { success: true };
        } catch (error) {
          set((state) => {
            const newPending = new Set(state.pendingOperations);
            newPending.delete(operationKey);

            const newCards = cardId
              ? state.cards.map((c) =>
                  c.id === cardId ? { ...c, balance: c.balance + amount } : c
                )
              : state.cards;

            return {
              walletBalance: state.walletBalance - amount,
              balance: cardId ? state.balance : state.balance - amount,
              cards: newCards,
              transactions: state.transactions.map((t) =>
                t.id === tempId ? { ...t, status: 'failed' } : t
              ),
              pendingOperations: newPending,
            };
          });

          return {
            success: false,
            error: error instanceof Error ? error.message : 'Top-up failed',
          };
        }
      },

      toggleCardFreeze: (cardId: string) => {
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId ? { ...card, isFrozen: !card.isFrozen } : card
          ),
        }));
      },
    }),
    {
      name: 'bank-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        balance: state.balance,
        userProfile: state.userProfile,
        transactions: state.transactions,
        cards: state.cards,
        investments: state.investments,
      }),
    }
  )
);
