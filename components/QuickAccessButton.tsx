import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { SolarIcon } from 'react-native-solar-icons';

type Props = {
  label: string;
  iconName: string;
  onPress?: () => void;
};

export const QuickAccessButton: React.FC<Props> = ({ label, iconName, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f9fafb',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 20,
    }}>
    <SolarIcon type="bold-duotone" name={iconName as any} size={18} color="#1f2937" />
    <Text style={{ fontSize: 14, fontWeight: '500', color: '#1f2937' }}>{label}</Text>
  </TouchableOpacity>
);
