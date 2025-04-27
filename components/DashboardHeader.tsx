import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import { router } from 'expo-router';

type DashboardHeaderProps = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View>
          <Text style={styles.greeting}>Salam,</Text>
          <Text style={styles.username}>{user.name}</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => router.push('/notifications')}
          >
            <Bell size={20} color="#2c3e50" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e5e9',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f7f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationBadge: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e74c3c',
    right: 10,
    top: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});