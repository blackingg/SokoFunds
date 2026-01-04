import React from 'react';
import { Container } from 'components/Container';
import { View, Text, ScrollView } from 'react-native';

export const OnboardingPage: React.FC = () => {
  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#407BFF]">
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-center text-gray-600">Onboarding</Text>
        </View>
      </ScrollView>
    </Container>
  );
};
