import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Container } from '../components/Container';
import { SolarIcon } from 'react-native-solar-icons';
import { useBankStore, BankStore } from '../store/useBankStore';

export const InvestPage: React.FC = () => {
  const investments = useBankStore((state: BankStore) => state.investments);
  const opportunities = useBankStore((state: BankStore) => state.opportunities);
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 24 }} style={{ backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 24 }}>
          Investments
        </Text>

        <View
          style={{ backgroundColor: '#059669', borderRadius: 24, padding: 28, marginBottom: 32 }}>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '600' }}>
            Portfolio Value
          </Text>
          <Text style={{ color: '#fff', fontSize: 32, fontWeight: '800', marginVertical: 8 }}>
            FC{totalInvested.toLocaleString()}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SolarIcon type="bold-duotone" name="GraphUp" size={16} color="#4ADE80" />
            <Text style={{ color: '#4ADE80', fontWeight: '700', marginLeft: 4 }}>
              +18.4% this year
            </Text>
          </View>
        </View>

        <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 16 }}>
          My Portfolio
        </Text>
        {investments.map((inv) => (
          <View
            key={inv.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F9FAFB',
              borderRadius: 16,
              padding: 16,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: '#F3F4F6',
            }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: '#ECFDF5',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16,
              }}>
              <SolarIcon type="bold-duotone" name={inv.iconName as any} size={24} color="#059669" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>{inv.name}</Text>
              <Text style={{ fontSize: 13, color: '#6B7280' }}>{inv.category}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>
                FC{inv.amount.toLocaleString()}
              </Text>
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#059669' }}>
                {inv.returns}
              </Text>
            </View>
          </View>
        ))}

        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: '#111827',
            marginTop: 32,
            marginBottom: 16,
          }}>
          Opportunities
        </Text>
        {opportunities.map((opp, i) => (
          <TouchableOpacity
            key={i}
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 18,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>{opp.name}</Text>
              <View
                style={{
                  backgroundColor: '#F3F4F6',
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 6,
                }}>
                <Text style={{ fontSize: 11, fontWeight: '600', color: '#6B7280' }}>
                  {opp.risk}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 14, color: '#6B7280' }}>Expected Return</Text>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#007AFF' }}>
                {opp.returns}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Container>
  );
};
