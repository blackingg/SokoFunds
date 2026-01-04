import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SolarIcon } from 'react-native-solar-icons';

type Props = {
  iconName: string;
  title: string;
  description: string;
  onPress?: () => void;
};

export const GetStartedItem: React.FC<Props> = ({ iconName, title, description, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
    }}>
    <View
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f3f4f6',
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SolarIcon type="bold-duotone" name={iconName as any} size={24} color="#007AFF" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 4 }}>
        {title}
      </Text>
      <Text style={{ fontSize: 14, color: '#9ca3af' }}>{description}</Text>
    </View>
    <SolarIcon type="bold-duotone" name="AltArrowRight" size={20} color="#9ca3af" />
  </TouchableOpacity>
);
