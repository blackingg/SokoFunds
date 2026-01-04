export type Tab = {
  id: string;
  label: string;
};

export type Transaction = {
  id: string;
  name: string;
  time: string;
  amount: string;
  logo: string;
  status?: 'pending' | 'confirmed' | 'failed';
};

export type ActionItem = {
  label: string;
  iconName: string;
};

export type QuickAccessItem = {
  label: string;
  iconName: string;
};

export type GetStartedItemType = {
  id: number;
  iconName: string;
  title: string;
  description: string;
};

export type Card = {
  id: string;
  type: 'Virtual' | 'Physical';
  provider: 'Visa' | 'Mastercard';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  isFrozen: boolean;
  balance: number;
  color: string;
};

export type Investment = {
  id: string;
  name: string;
  category: string;
  amount: number;
  returns: string;
  iconName: string;
};

export type UserProfile = {
  name: string;
  email: string;
  accountNumber: string;
  avatar: string;
};

export type InvestmentOpportunity = {
  name: string;
  returns: string;
  risk: 'Low' | 'Medium' | 'High';
};

export type BankState = {
  balance: number;
  walletBalance: number;
  transactions: Transaction[];
  cards: Card[];
  investments: Investment[];
  opportunities: InvestmentOpportunity[];
  userProfile: UserProfile;
};
