import React from 'react';
import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SolarIcon } from 'react-native-solar-icons';
import { AppProvider } from './provider/AppProvider';
import { HomePage } from './pages/HomePage';
import { SendPage } from './pages/SendPage';
import { InvestPage } from './pages/InvestPage';
import { CardsPage } from './pages/CardsPage';
import { MorePage } from './pages/MorePage';
import { AddMoneyPage } from './pages/AddMoneyPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          if (route.name === 'Home') iconName = 'Home2';
          else if (route.name === 'Send') iconName = 'SendSquare';
          else if (route.name === 'Invest') iconName = 'Chart';
          else if (route.name === 'Cards') iconName = 'Card';
          else if (route.name === 'More') iconName = 'Widget';

          return <SolarIcon type="bold-duotone" name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          height: 90,
          paddingTop: 10,
          paddingBottom: 20,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Send" component={SendPage} />
      <Tab.Screen name="Invest" component={InvestPage} />
      <Tab.Screen name="Cards" component={CardsPage} />
      <Tab.Screen name="More" component={MorePage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="AddMoney" component={AddMoneyPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}
