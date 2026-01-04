import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SolarIcon } from 'react-native-solar-icons';
import { useBankStore, BankStore } from '../store/useBankStore';
import { useNavigation } from '@react-navigation/native';
import { BankSelectModal } from '../components/BankSelectModal';

export const SendPage: React.FC = () => {
  const balance = useBankStore((state: BankStore) => state.walletBalance);
  const sendMoney = useBankStore((state: BankStore) => state.sendMoney);
  const navigation = useNavigation();

  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState('');
  const [isBankModalVisible, setIsBankModalVisible] = useState(false);
  const [resolvedName, setResolvedName] = useState('');
  const [isResolving, setIsResolving] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const resolutionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (accountNumber.length === 10 && bank) {
      resolveAccountName();
    } else {
      setResolvedName('');
      if (resolutionTimeoutRef.current) {
        clearTimeout(resolutionTimeoutRef.current);
        resolutionTimeoutRef.current = null;
      }
    }

    return () => {
      if (resolutionTimeoutRef.current) {
        clearTimeout(resolutionTimeoutRef.current);
      }
    };
  }, [accountNumber, bank]);

  const resolveAccountName = () => {
    if (resolutionTimeoutRef.current) {
      clearTimeout(resolutionTimeoutRef.current);
    }

    setIsResolving(true);
    setResolvedName('');

    resolutionTimeoutRef.current = setTimeout(() => {
      // In production, replace with actual API call
      setResolvedName('ADEYEMI OLUWASEUN MARK');
      setIsResolving(false);
      resolutionTimeoutRef.current = null;
    }, 1500);
  };

  const handleSend = async () => {
    if (isSending) {
      return;
    }

    Keyboard.dismiss();

    const numAmount = parseFloat(amount.replace(/,/g, ''));

    if (!accountNumber || accountNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit account number');
      return;
    }

    if (!bank) {
      Alert.alert('Error', 'Please select a bank');
      return;
    }

    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (numAmount > balance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }

    if (isResolving) {
      Alert.alert('Please Wait', 'Account name is being verified...');
      return;
    }

    if (!resolvedName) {
      Alert.alert('Error', 'Unable to verify account name. Please try again.');
      return;
    }

    Alert.alert(
      'Confirm Transfer',
      `Send FC${numAmount.toLocaleString()} to ${resolvedName} (${bank})?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            setIsSending(true);

            try {
              const result = await sendMoney(resolvedName, numAmount, bank);

              if (result.success) {
                Alert.alert(
                  'Success',
                  `Successfully sent FC${numAmount.toLocaleString()} to ${resolvedName}`,
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        setAmount('');
                        setAccountNumber('');
                        setBank('');
                        setResolvedName('');
                        navigation.goBack();
                      },
                    },
                  ]
                );
              } else {
                Alert.alert(
                  'Transaction Failed',
                  result.error || 'Unable to complete transfer. Please try again.',
                  [
                    {
                      text: 'OK',
                      onPress: () => setIsSending(false),
                    },
                  ]
                );
              }
            } catch (error) {
              Alert.alert('Error', 'An unexpected error occurred. Please try again.', [
                {
                  text: 'OK',
                  onPress: () => setIsSending(false),
                },
              ]);
            }
          },
        },
      ]
    );
  };

  const isButtonDisabled =
    isSending || isResolving || !resolvedName || !amount || !accountNumber || !bank;

  return (
    <SafeAreaView
      edges={['top', 'left', 'right', 'bottom']}
      style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} disabled={isSending}>
          <SolarIcon type="bold-duotone" name="AltArrowLeft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={{ marginLeft: 16, fontSize: 20, fontWeight: '700' }}>Send Money</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 100 }}>
        <View
          style={{
            marginBottom: 24,
            borderRadius: 16,
            backgroundColor: 'rgba(235, 245, 255, 0.5)',
            padding: 20,
          }}>
          <Text style={{ marginBottom: 4, fontSize: 14, fontWeight: '500', color: '#6B7280' }}>
            Available Balance
          </Text>
          <Text style={{ fontSize: 24, fontWeight: '800', color: '#007AFF' }}>
            FC{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600', color: '#374151' }}>
            Account Number
          </Text>
          <TextInput
            style={{
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              backgroundColor: '#F9FAFB',
              padding: 16,
              fontSize: 16,
            }}
            placeholder="0123456789"
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="numeric"
            maxLength={10}
            editable={!isSending}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600', color: '#374151' }}>
            Select Bank
          </Text>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setIsBankModalVisible(true);
            }}
            disabled={isSending}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              backgroundColor: '#F9FAFB',
              padding: 16,
              opacity: isSending ? 0.6 : 1,
            }}>
            <View
              style={{
                marginRight: 12,
                height: 32,
                width: 32,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                backgroundColor: '#EBF5FF',
              }}>
              <SolarIcon type="bold-duotone" name="Library" size={18} color="#007AFF" />
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: bank ? '600' : '400',
                color: bank ? '#111827' : '#9CA3AF',
              }}>
              {bank || 'Choose beneficiary bank'}
            </Text>
            <SolarIcon type="bold-duotone" name="AltArrowDown" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {(isResolving || resolvedName) && (
          <View
            style={{
              marginBottom: 24,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#F3F4F6',
              backgroundColor: '#F9FAFB',
              padding: 16,
            }}>
            <View
              style={{
                marginRight: 12,
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}>
              <SolarIcon type="bold-duotone" name="User" size={20} color="#007AFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  marginBottom: 4,
                  fontSize: 12,
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  color: '#9CA3AF',
                }}>
                Name
              </Text>
              {isResolving ? (
                <ActivityIndicator size="small" color="#007AFF" />
              ) : (
                <Text style={{ fontSize: 14, fontWeight: '800', color: '#111827' }}>
                  {resolvedName}
                </Text>
              )}
            </View>
          </View>
        )}

        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 8, fontSize: 16, fontWeight: '600', color: '#374151' }}>
            Amount
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              backgroundColor: '#F9FAFB',
              paddingHorizontal: 16,
              opacity: isSending ? 0.6 : 1,
            }}>
            <Text style={{ marginRight: 8, fontSize: 18, fontWeight: '700', color: '#374151' }}>
              FC
            </Text>
            <TextInput
              style={{
                flex: 1,
                paddingVertical: 16,
                fontSize: 18,
                fontWeight: '700',
                color: '#111827',
              }}
              placeholder="0.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              editable={!isSending}
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          backgroundColor: '#fff',
          padding: 24,
        }}>
        <TouchableOpacity
          onPress={handleSend}
          disabled={isButtonDisabled}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 16,
            paddingVertical: 16,
            backgroundColor: isButtonDisabled ? '#E5E7EB' : '#007AFF',
            shadowColor: isButtonDisabled ? 'transparent' : '#007AFF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: isButtonDisabled ? 0 : 4,
          }}>
          {isSending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}>Confirm Transfer</Text>
          )}
        </TouchableOpacity>
      </View>

      <BankSelectModal
        isVisible={isBankModalVisible}
        onClose={() => setIsBankModalVisible(false)}
        onSelect={setBank}
        selectedBank={bank}
      />
    </SafeAreaView>
  );
};
