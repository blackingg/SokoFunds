import { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, TextInput, Dimensions } from 'react-native';
import { SolarIcon } from 'react-native-solar-icons';

const { height } = Dimensions.get('window');

interface Bank {
  name: string;
  slug: string;
}

const NIGERIAN_BANKS: Bank[] = [
  { name: 'Access Bank', slug: 'access-bank' },
  { name: 'Carbon', slug: 'carbon' },
  { name: 'Ecobank Nigeria', slug: 'ecobank-nigeria' },
  { name: 'Fidelity Bank', slug: 'fidelity-bank' },
  { name: 'First Bank of Nigeria', slug: 'first-bank-of-nigeria' },
  { name: 'First City Monument Bank', slug: 'first-city-monument-bank' },
  { name: 'Guaranty Trust Bank', slug: 'guaranty-trust-bank' },
  { name: 'Heritage Bank', slug: 'heritage-bank' },
  { name: 'Jaiz Bank', slug: 'jaiz-bank' },
  { name: 'Keystone Bank', slug: 'keystone-bank' },
  { name: 'Kuda Bank', slug: 'kuda-bank' },
  { name: 'Moniepoint MFB', slug: 'moniepoint-mfb' },
  { name: 'OPay Digital Services', slug: 'opay' },
  { name: 'PalmPay', slug: 'palmpay' },
  { name: 'Polaris Bank', slug: 'polaris-bank' },
  { name: 'Providus Bank', slug: 'providus-bank' },
  { name: 'Stanbic IBTC Bank', slug: 'stanbic-ibtc-bank' },
  { name: 'Standard Chartered Bank', slug: 'standard-chartered-bank' },
  { name: 'Sterling Bank', slug: 'sterling-bank' },
  { name: 'Suntrust Bank', slug: 'suntrust-bank' },
  { name: 'Union Bank of Nigeria', slug: 'union-bank-of-nigeria' },
  { name: 'United Bank For Africa', slug: 'united-bank-for-africa' },
  { name: 'Unity Bank', slug: 'unity-bank' },
  { name: 'Wema Bank', slug: 'wema-bank' },
  { name: 'Zenith Bank', slug: 'zenith-bank' },
];

interface BankSelectModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (bankName: string) => void;
  selectedBank: string;
}

export const BankSelectModal: React.FC<BankSelectModalProps> = ({
  isVisible,
  onClose,
  onSelect,
  selectedBank,
}) => {
  const [search, setSearch] = useState('');

  const filteredBanks = NIGERIAN_BANKS.filter((bank) =>
    bank.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 justify-end bg-black/50">
        <TouchableOpacity
          activeOpacity={1}
          style={{ height: height * 0.7 }}
          className="rounded-t-[32px] bg-white px-6 pt-3">
          <View className="mb-6 h-1 w-10 self-center rounded-full bg-gray-200" />

          <View className="mb-5 flex-row items-center justify-between">
            <Text className="text-[22px] font-extrabold text-gray-900">Select Bank</Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <SolarIcon type="bold-duotone" name="CloseCircle" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View className="mb-5 flex-row items-center rounded-2xl bg-gray-100 px-4">
            <SolarIcon type="bold-duotone" name="Magnifer" size={20} color="#9CA3AF" />
            <TextInput
              className="ml-2.5 flex-1 py-3.5 text-base text-gray-900"
              placeholder="Search bank name..."
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <FlatList
            data={filteredBanks}
            keyExtractor={(item) => item.slug}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item.name);
                  onClose();
                }}
                className={`flex-row items-center border-b border-gray-100 py-4 ${
                  selectedBank === item.name ? '-mx-6 bg-[#F0F7FF] px-6' : ''
                }`}>
                <View className="mr-4 h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
                  <SolarIcon
                    type="bold-duotone"
                    name="Library"
                    size={20}
                    color={selectedBank === item.name ? '#007AFF' : '#6B7280'}
                  />
                </View>
                <Text
                  className={`flex-1 text-base font-semibold ${
                    selectedBank === item.name ? 'font-bold text-[#007AFF]' : 'text-gray-700'
                  }`}>
                  {item.name}
                </Text>
                {selectedBank === item.name && (
                  <SolarIcon type="bold-duotone" name="CheckCircle" size={20} color="#007AFF" />
                )}
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
