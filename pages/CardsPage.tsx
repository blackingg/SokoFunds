import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Container } from '../components/Container';
import { SolarIcon } from 'react-native-solar-icons';
import { useBankStore, BankStore } from '../store/useBankStore';

const { width } = Dimensions.get('window');

const CreditCard = ({ card, onToggleFreeze }: { card: any; onToggleFreeze: () => void }) => (
  <View
    style={{
      width: width - 48,
      height: 200,
      backgroundColor: card.color,
      borderRadius: 20,
      padding: 24,
      marginBottom: 20,
      position: 'relative',
      overflow: 'hidden',
      opacity: card.isFrozen ? 0.7 : 1,
    }}>
    <View
      style={{
        position: 'absolute',
        right: -20,
        bottom: -20,
        width: 100,
        height: 100,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 50,
      }}
    />
    <View
      style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <View>
        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600' }}>
          {card.type.toUpperCase()}
        </Text>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>{card.provider}</Text>
      </View>
      <SolarIcon type="bold-duotone" name="Card" size={32} color="rgba(255,255,255,0.9)" />
    </View>

    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 22, letterSpacing: 4, fontWeight: '600' }}>
        {card.cardNumber}
      </Text>
    </View>

    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <View>
        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10 }}>EXPIRY</Text>
        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>{card.expiryDate}</Text>
      </View>
      <View>
        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10 }}>CVV</Text>
        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>***</Text>
      </View>
      <TouchableOpacity
        onPress={onToggleFreeze}
        style={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 12,
        }}>
        <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>
          {card.isFrozen ? 'UNFREEZE' : 'FREEZE'}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export const CardsPage: React.FC = () => {
  const cards = useBankStore((state: BankStore) => state.cards);
  const toggleCardFreeze = useBankStore((state: BankStore) => state.toggleCardFreeze);
  // const { cards, toggleCardFreeze } = useBank();

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 24 }} style={{ backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 24 }}>
          My Cards
        </Text>

        {cards.map((card) => (
          <CreditCard key={card.id} card={card} onToggleFreeze={() => toggleCardFreeze(card.id)} />
        ))}

        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderColor: '#E5E7EB',
            borderStyle: 'dashed',
            borderRadius: 20,
            padding: 32,
            alignItems: 'center',
            marginTop: 8,
          }}>
          <View
            style={{
              backgroundColor: '#F3F4F6',
              width: 48,
              height: 48,
              borderRadius: 24,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 12,
            }}>
            <SolarIcon type="bold-duotone" name="AddCircle" size={24} color="#6B7280" />
          </View>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#374151' }}>Create New Card</Text>
          <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
            Get a virtual or physical card instantly
          </Text>
        </TouchableOpacity>

        <View style={{ marginTop: 40 }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 16 }}>
            Security Settings
          </Text>
          {[
            { icon: 'LockPassword', label: 'Reset Pin' },
            { icon: 'EyeClosed', label: 'Hide Card Details' },
            { icon: 'ShieldCheck', label: 'Online Transactions' },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#F3F4F6',
              }}>
              <View
                style={{
                  backgroundColor: '#EBF5FF',
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 16,
                }}>
                <SolarIcon type="bold-duotone" name={item.icon as any} size={20} color="#007AFF" />
              </View>
              <Text style={{ flex: 1, fontSize: 16, fontWeight: '600', color: '#374151' }}>
                {item.label}
              </Text>
              <SolarIcon type="bold-duotone" name="AltArrowRight" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
};
