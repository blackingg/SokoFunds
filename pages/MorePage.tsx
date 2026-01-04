import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Container } from '../components/Container';
import { SolarIcon } from 'react-native-solar-icons';
import { useBankStore, BankStore } from '../store/useBankStore';
import { useAuth } from '../context/AuthContext';

const SettingsItem = ({ icon, label, subLabel, onPress, color = '#374151' }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
    }}>
    <View
      style={{
        backgroundColor: '#F3F4F6',
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
      }}>
      <SolarIcon type="bold-duotone" name={icon as any} size={22} color={color} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>{label}</Text>
      {subLabel && <Text style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>{subLabel}</Text>}
    </View>
    <SolarIcon type="bold-duotone" name="AltArrowRight" size={20} color="#D1D5DB" />
  </TouchableOpacity>
);

export const MorePage: React.FC = () => {
  const userProfile = useBankStore((state: BankStore) => state.userProfile);
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: logout, style: 'destructive' },
    ]);
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} style={{ backgroundColor: '#fff' }}>
        <View
          style={{
            padding: 24,
            paddingBottom: 32,
            alignItems: 'center',
            backgroundColor: '#F9FAFB',
          }}>
          <View style={{ position: 'relative' }}>
            <Image
              source={{ uri: userProfile.avatar }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginBottom: 16,
                borderWidth: 4,
                borderColor: '#fff',
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 20,
                right: 0,
                backgroundColor: '#007AFF',
                padding: 8,
                borderRadius: 20,
                borderWidth: 3,
                borderColor: '#fff',
              }}>
              <SolarIcon type="bold-duotone" name="Camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 24, fontWeight: '800', color: '#111827' }}>
            {userProfile.name}
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
            Account No: {userProfile.accountNumber}
          </Text>

          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: '#fff',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#374151' }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={{ padding: 24 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '800',
              color: '#9CA3AF',
              letterSpacing: 1,
              marginBottom: 8,
            }}>
            ACCOUNT
          </Text>
          <SettingsItem
            icon="User"
            label="Personal Information"
            subLabel="Name, Email, Phone number"
          />
          <SettingsItem
            icon="ShieldCheck"
            label="Account Security"
            subLabel="Password, Biometrics, Pin"
          />
          <SettingsItem icon="Bell" label="Notifications" subLabel="Transactional alerts, News" />

          <Text
            style={{
              fontSize: 14,
              fontWeight: '800',
              color: '#9CA3AF',
              letterSpacing: 1,
              marginTop: 32,
              marginBottom: 8,
            }}>
            PREFERENCES
          </Text>
          <SettingsItem icon="Moon" label="Appearance" subLabel="Light mode" />
          <SettingsItem icon="Globus" label="Language" subLabel="English (US)" />

          <Text
            style={{
              fontSize: 14,
              fontWeight: '800',
              color: '#9CA3AF',
              letterSpacing: 1,
              marginTop: 32,
              marginBottom: 8,
            }}>
            SUPPORT
          </Text>
          <SettingsItem icon="QuestionSquare" label="Help Center" />
          <SettingsItem icon="ChatDots" label="Contact Us" />

          <TouchableOpacity
            onPress={handleLogout}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              marginTop: 32,
            }}>
            <View
              style={{
                backgroundColor: '#FEE2E2',
                width: 44,
                height: 44,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16,
              }}>
              <SolarIcon type="bold-duotone" name="Logout" size={22} color="#EF4444" />
            </View>
            <Text style={{ flex: 1, fontSize: 16, fontWeight: '700', color: '#EF4444' }}>
              Logout
            </Text>
          </TouchableOpacity>

          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ fontSize: 12, color: '#9CA3AF' }}>SokoFunds v1.0.4 (Production)</Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
