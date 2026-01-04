import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  Dimensions,
  Modal,
  TextInput,
  Keyboard,
} from 'react-native';
import { SolarIcon } from 'react-native-solar-icons';
import * as Clipboard from 'expo-clipboard';
import { useBankStore, BankStore } from '../store/useBankStore';

interface AddMoneyModalProps {
  isVisible: boolean;
  onClose: () => void;
  onNavigateToFullPage: () => void;
}

const { height } = Dimensions.get('window');

export const AddMoneyModal: React.FC<AddMoneyModalProps> = ({
  isVisible,
  onClose,
  onNavigateToFullPage,
}) => {
  const userProfile = useBankStore((state: BankStore) => state.userProfile);
  const cards = useBankStore((state: BankStore) => state.cards);
  const addMoney = useBankStore((state: BankStore) => state.addMoney);
  // const { userProfile, cards, addMoney } = useBank();
  const [amount, setAmount] = useState('');
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [isAmountPromptVisible, setIsAmountPromptVisible] = useState(false);

  const copyToClipboard = async (text: string, label: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied', `${label} copied to clipboard`);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `My Soko Bank Details:\nName: ${userProfile.name}\nAccount Number: ${userProfile.accountNumber}\nBank: Soko Funds Bank`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFromCard = (card: any) => {
    setSelectedCard(card);
    setAmount('');
    setIsAmountPromptVisible(true);
  };

  const confirmTopUp = async () => {
    Keyboard.dismiss();
    const numAmount = parseFloat(amount.replace(/,/g, ''));
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const result = await addMoney(numAmount, selectedCard?.id);
    setIsAmountPromptVisible(false);
    
    if (result.success) {
      Alert.alert('Success', `FC${numAmount.toLocaleString()} added successfully!`);
      onClose();
    } else {
      Alert.alert('Error', result.error || 'Failed to add money');
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingHorizontal: 24,
            paddingTop: 12,
            paddingBottom: 40,
            maxHeight: height * 0.8,
          }}>
          <View
            style={{
              width: 40,
              height: 4,
              // backgroundColor: '#E5E7EB',
              borderRadius: 2,
              alignSelf: 'center',
              marginBottom: 24,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}>
            <Text style={{ fontSize: 24, fontWeight: '800', color: '#111827' }}>Add Money</Text>
            <TouchableOpacity
              onPress={onClose}
              style={{ backgroundColor: '#F3F4F6', padding: 8, borderRadius: 20 }}>
              <SolarIcon type="bold-duotone" name="CloseCircle" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            {/* Account Info Card */}
            <View
              style={{
                backgroundColor: '#F9FAFB',
                borderRadius: 24,
                padding: 20,
                borderWidth: 1,
                borderColor: '#F3F4F6',
                marginBottom: 24,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 16,
                }}>
                <View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#9CA3AF',
                        fontWeight: '600',
                        marginBottom: 4,
                      }}>
                      BANK TRANSFER
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      <TouchableOpacity
                        onPress={() => copyToClipboard(userProfile.accountNumber, 'Account number')}
                        style={{ backgroundColor: '#EBF5FF', padding: 10, borderRadius: 12 }}>
                        <SolarIcon type="bold-duotone" name="Copy" size={18} color="#007AFF" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={handleShare}
                        style={{ backgroundColor: '#EBF5FF', padding: 10, borderRadius: 12 }}>
                        <SolarIcon type="bold-duotone" name="Share" size={18} color="#007AFF" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>
                    {userProfile.accountNumber}
                  </Text>
                  <Text style={{ fontSize: 14, color: '#6B7280' }}>
                    Soko Funds Bank • {userProfile.name}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 16 }}>
              Top up from cards
            </Text>

            <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 12, fontWeight: '600' }}>
              SELECT SAVED CARD
            </Text>

            {cards.map((card) => (
              <TouchableOpacity
                key={card.id}
                onPress={() => handleAddFromCard(card)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                }}>
                <View
                  style={{
                    width: 44,
                    height: 32,
                    backgroundColor: card.color,
                    borderRadius: 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 16,
                  }}>
                  <SolarIcon type="bold-duotone" name="Card" size={18} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827' }}>
                    {card.provider} {card.type}
                  </Text>
                  <Text style={{ fontSize: 13, color: '#6B7280' }}>
                    **** {card.cardNumber.slice(-4)}
                  </Text>
                </View>
                <SolarIcon type="bold-duotone" name="AltArrowRight" size={18} color="#D1D5DB" />
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => {
                onClose();
                onNavigateToFullPage();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 16,
                marginTop: 8,
                backgroundColor: '#F9FAFB',
              }}>
              <View
                style={{
                  backgroundColor: '#EBF5FF',
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 16,
                }}>
                <SolarIcon type="bold-duotone" name="Widget" size={20} color="#007AFF" />
              </View>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#007AFF' }}>
                More deposit options
              </Text>
              <View style={{ flex: 1 }} />
              <SolarIcon type="bold-duotone" name="AltArrowRight" size={18} color="#007AFF" />
            </TouchableOpacity>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isAmountPromptVisible}
        onRequestClose={() => setIsAmountPromptVisible(false)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsAmountPromptVisible(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: '#fff',
              borderRadius: 24,
              padding: 24,
              width: '100%',
              maxWidth: 340,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.2,
              shadowRadius: 20,
              elevation: 10,
            }}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <View
                style={{
                  backgroundColor: selectedCard?.color || '#007AFF',
                  width: 56,
                  height: 40,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                <SolarIcon type="bold-duotone" name="Card" size={24} color="#fff" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>
                Enter Amount
              </Text>
              <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
                Using {selectedCard?.provider} {selectedCard?.type}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F9FAFB',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 16,
                paddingHorizontal: 16,
                marginBottom: 24,
              }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827' }}>FC</Text>
              <TextInput
                autoFocus
                style={{
                  flex: 1,
                  padding: 16,
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#111827',
                }}
                placeholder="0.00"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                onPress={() => setIsAmountPromptVisible(false)}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 12,
                  backgroundColor: '#F3F4F6',
                  alignItems: 'center',
                }}>
                <Text style={{ color: '#4B5563', fontWeight: '700' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmTopUp}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 12,
                  backgroundColor: '#007AFF',
                  alignItems: 'center',
                }}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </Modal>
  );
};
