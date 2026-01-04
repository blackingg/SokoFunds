import React from 'react';
import { StatusBar, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WalletHeader } from '../components/WalletHeader';
import { ActionButton } from '../components/ActionButton';
import { QuickAccessButton } from '../components/QuickAccessButton';
import { TransactionItem } from '../components/TransactionItem';
import { GetStartedItem } from '../components/GetStartedItem';
import { ActionItem, QuickAccessItem, GetStartedItemType } from '../types/types';
import { useBankStore, BankStore } from '../store/useBankStore';
import { useNavigation } from '@react-navigation/native';
import { AddMoneyModal } from '../components/AddMoneyModal';

const actionButtons: ActionItem[] = [
  { label: 'Add money', iconName: 'AddCircle' },
  { label: 'My cards', iconName: 'Card' },
  { label: 'Send money', iconName: 'SendSquare' },
];

const quickAccessItems: QuickAccessItem[] = [
  { label: 'Airtime', iconName: 'Phone' },
  { label: 'Betting', iconName: 'Football' },
  { label: 'Data Bundle', iconName: 'Chart' },
  { label: 'TV Sub', iconName: 'Tv' },
  { label: 'Water Bill', iconName: 'Water' },
];

const getStartedItems: GetStartedItemType[] = [
  {
    id: 1,
    iconName: 'Wallet',
    title: 'Add Money',
    description: 'Get more from your account',
  },
  {
    id: 2,
    iconName: 'Card',
    title: 'Create a debit card',
    description: 'Get more from your account',
  },
  {
    id: 3,
    iconName: 'Gift',
    title: 'Earn FC 2,000 for inviting friends to S...',
    description: 'Get more from your account',
  },
];

export const HomePage: React.FC = () => {
  const transactions = useBankStore((state: BankStore) => state.transactions);
  const navigation = useNavigation<any>();
  const [isAddMoneyVisible, setIsAddMoneyVisible] = React.useState(false);

  const handleActionPress = (label: string) => {
    if (label === 'Send money') {
      navigation.navigate('Send');
    } else if (label === 'My cards') {
      navigation.navigate('Cards');
    } else if (label === 'Add money') {
      setIsAddMoneyVisible(true);
    } else {
      console.log(`${label} pressed`);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#007AFF' }}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />

      <WalletHeader />

      <AddMoneyModal
        isVisible={isAddMoneyVisible}
        onClose={() => setIsAddMoneyVisible(false)}
        onNavigateToFullPage={() => navigation.navigate('AddMoney')}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          marginTop: 40,
        }}>
        <View
          style={{
            top: -42,
            alignSelf: 'center',
            backgroundColor: '#fff',
            paddingHorizontal: 34,
            paddingTop: 24,
            paddingBottom: 6,
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 14 }}>
            {actionButtons.map((action, index) => (
              <ActionButton
                key={index}
                label={action.label}
                iconName={action.iconName}
                onPress={() => handleActionPress(action.label)}
              />
            ))}
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#1f2937', marginBottom: 16 }}>
            Get started
          </Text>

          {getStartedItems.map((item, index) => (
            <GetStartedItem
              key={index}
              iconName={item.iconName}
              title={item.title}
              description={item.description}
              onPress={() =>
                item.title === 'Add Money'
                  ? setIsAddMoneyVisible(true)
                  : console.log(`${item.title} pressed`)
              }
            />
          ))}

          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#1f2937',
              marginTop: 32,
              marginBottom: 16,
            }}>
            Quick access
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16 }}
            style={{ marginBottom: 32 }}>
            {quickAccessItems.map((item, index) => (
              <QuickAccessButton
                key={index}
                label={item.label}
                iconName={item.iconName}
                onPress={() => console.log(`${item.label} pressed`)}
              />
            ))}
          </ScrollView>

          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#6b7280',
              marginBottom: 16,
              letterSpacing: 0.5,
            }}>
            RECENT TRANSACTIONS
          </Text>

          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
