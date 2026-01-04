import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Transaction } from '../types/types';

type Props = { transaction: Transaction };

export const TransactionItem: React.FC<Props> = ({ transaction }) => (
  <TouchableOpacity
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
    }}>
    <View
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#1f2937',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ fontSize: 10, color: '#fff', fontWeight: '600' }}>{transaction.logo}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 4 }}>
        {transaction.name}
      </Text>
      <Text style={{ fontSize: 13, color: '#9ca3af' }}>{transaction.time}</Text>
    </View>
    <Text
      style={{
        fontSize: 16,
        fontWeight: '600',
        color: transaction.amount.startsWith('-') ? '#1f2937' : '#10b981',
      }}>
      {transaction.amount}
    </Text>
  </TouchableOpacity>
);
