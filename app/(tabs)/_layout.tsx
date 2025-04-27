import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Chrome as Home, CreditCard, History as ClockHistory, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3498db', // işjeň tab üçin reňk
        tabBarInactiveTintColor: '#95a5a6', // işjeň däl tab üçin reňk
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false, // sahypanyň ýokarky başlygynyň görkezilmezligi
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Baş sahypa', // "Home" -> "Baş sahypa"
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bills"
        options={{
          title: 'Hasaplar', // "Bills" -> "Hasaplar"
          tabBarIcon: ({ color, size }) => <CreditCard size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Geçmiş', // "History" -> "Geçmiş"
          tabBarIcon: ({ color, size }) => <ClockHistory size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil', // "Profile" -> "Profil"
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff', // Tab paneliniň fon reňki
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 60,
    paddingBottom: 6,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
});
