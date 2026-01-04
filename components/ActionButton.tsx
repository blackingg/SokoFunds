import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SolarIcon } from 'react-native-solar-icons';

type Props = {
  label: string;
  iconName: string;
  onPress?: () => void;
};

export const ActionButton: React.FC<Props> = ({ label, iconName, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
      }}>
      <SolarIcon type="bold-duotone" name={iconName as any} size={28} color="#007AFF" />
    </View>
    <Text style={{ fontSize: 14, fontWeight: '600', color: '#1f2937' }}>{label}</Text>
  </TouchableOpacity>
);
