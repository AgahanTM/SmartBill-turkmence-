import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { User, Bell, CreditCard, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [toggleStates, setToggleStates] = useState({
    push: true,
    email: false,
    sms: true,
    autopay: true,
    '2fa': false,
  });
  
  const handleToggle = (id: string) => {
    setToggleStates(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof toggleStates]
    }));
  };
  
  const menuItems = [
    {
      id: 'account',
      title: 'Hasap sazlamalary',
      icon: <User size={20} color="#3498db" />,
      items: [
        { id: 'personal', title: 'Şahsy maglumatlar' },
        { id: 'payment', title: 'Töleg usullary' },
        { id: 'address', title: 'Hesap salgasy' },
      ]
    },
    {
      id: 'notifications',
      title: 'Bildirişler',
      icon: <Bell size={20} color="#3498db" />,
      items: [
        { id: 'push', title: 'Push bildirişleri', isToggle: true },
        { id: 'email', title: 'Email bildirişleri', isToggle: true },
        { id: 'sms', title: 'SMS bildirişleri', isToggle: true },
      ]
    },
    {
      id: 'payment',
      title: 'Töleg tercihler',
      icon: <CreditCard size={20} color="#3498db" />,
      items: [
        { id: 'autopay', title: 'Avtomat töleg', isToggle: true },
        { id: 'reminder', title: 'Töleg hatyratlary' },
      ]
    },
    {
      id: 'security',
      title: 'Howpsuzlyk',
      icon: <Shield size={20} color="#3498db" />,
      items: [
        { id: 'password', title: 'Paroly üýtgetmek' },
        { id: '2fa', title: 'Iki faktorly authentifikasiýa', isToggle: true },
      ]
    },
    {
      id: 'help',
      title: 'Ýardam & Goldaw',
      icon: <HelpCircle size={20} color="#3498db" />,
      items: [
        { id: 'faq', title: 'Tez-tez berilýän soraglar' },
        { id: 'contact', title: 'Goldaw bilen habarlaş' },
      ]
    },
  ];
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <Image 
            source={{ uri:'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=400' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Üýtgetmek</Text>
          </TouchableOpacity>
        </View>
        
        {menuItems.map((section) => (
          <View key={section.id} style={styles.menuSection}>
            <View style={styles.menuSectionHeader}>
              {section.icon}
              <Text style={styles.menuSectionTitle}>{section.title}</Text>
            </View>
            
            {section.items.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.menuItem}
                onPress={() => item.isToggle ? handleToggle(item.id) : {}}
              >
                <Text style={styles.menuItemText}>{item.title}</Text>
                {item.isToggle ? (
                  <Switch 
                    value={toggleStates[item.id as keyof typeof toggleStates]} 
                    onValueChange={() => handleToggle(item.id)}
                    trackColor={{ false: '#e0e5e9', true: '#3498db' }}
                    thumbColor="#ffffff"
                  />
                ) : (
                  <ChevronRight size={20} color="#95a5a6" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={signOut}
        >
          <LogOut size={20} color="#e74c3c" />
          <Text style={styles.logoutText}>Çykmak</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fa',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e5e9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },
  profileEmail: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#edf5fd',
  },
  editButtonText: {
    color: '#3498db',
    fontWeight: '600',
    fontSize: 14,
  },
  menuSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginLeft: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 15,
    color: '#34495e',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e74c3c',
    marginLeft: 8,
  },
});
