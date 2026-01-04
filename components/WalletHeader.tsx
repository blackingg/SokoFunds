import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SolarIcon } from 'react-native-solar-icons';
import * as Clipboard from 'expo-clipboard';
import { useBankStore, BankStore } from '../store/useBankStore';

interface WalletHeaderProps {
  lastUpdated?: string;
}

export const WalletHeader: React.FC<WalletHeaderProps> = ({ lastUpdated = '2 mins ago' }) => {
  const userProfile = useBankStore((state: BankStore) => state.userProfile);
  const rawBalance = useBankStore((state: BankStore) => state.walletBalance);
  const balance = rawBalance.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(userProfile.accountNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 700);
  };

  return (
    <View className="bg-[#007AFF] px-6 pb-8 pt-4">
      <View className="mb-8 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Image
            className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white/20"
            source={{ uri: userProfile.avatar }}
          />
          <View>
            <Text className="text-sm text-white/80">Hi {userProfile.name.split(' ')[0]}</Text>
            <View className="flex-row items-center">
              <Text className="text-xs font-semibold text-white/90">
                Soko Bank • {userProfile.accountNumber}
              </Text>
              <TouchableOpacity onPress={copyToClipboard} className="ml-2">
                <SolarIcon
                  type={isCopied ? 'bold' : 'bold-duotone'}
                  name="Copy"
                  size={14}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="flex-row items-center gap-4">
          <TouchableOpacity>
            <SolarIcon type="bold-duotone" name="Bell" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text className="mb-2 text-sm text-white/80">Available Balance</Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-5xl font-bold tracking-tight text-white">
            {isBalanceVisible ? balance : '••••••'}
          </Text>
          <TouchableOpacity onPress={() => setIsBalanceVisible(!isBalanceVisible)}>
            <SolarIcon name={isBalanceVisible ? 'Eye' : 'EyeClosed'} size={29} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="mt-2 text-xs text-white/60">Last updated {lastUpdated}</Text>
      </View>
    </View>
  );
};
