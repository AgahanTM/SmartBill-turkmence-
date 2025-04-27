import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import DashboardHeader from '@/components/DashboardHeader';
import UpcomingBillCard from '@/components/UpcomingBillCard';
import QuickActionButton from '@/components/QuickActionButton';
import RecentTransactionCard from '@/components/RecentTransactionCard';
import AlertBanner from '@/components/AlertBanner';
import { getBills, getRecentTransactions } from '@/utils/mockData';
import { Bell, CreditCard, History, Settings } from 'lucide-react-native';

export default function HomeScreen() {
  const { user } = useAuth();
  const upcomingBills = getBills().filter(bill => !bill.isPaid).slice(0, 2);
  const recentTransactions = getRecentTransactions().slice(0, 3);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <DashboardHeader user={user} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AlertBanner 
          message="Siziň elektrik tölegiňiz 3 günüň içinde ödenmeli " 
          type="warning"
        />
        
        {/* Hasap Summary (Güneş Energiýasy) */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Jemi Töleg</Text>
          <Text style={styles.summaryAmount}>TMT 284.55</Text>
          <Text style={styles.summarySubtext}>3 utility tölegleriniň jemi</Text>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('/bills')}
          >
            <Text style={styles.viewAllButtonText}>Bütin Tölegleri Görüp Bilmek</Text>
          </TouchableOpacity>
        </View>
        
        {/* Täze Amallar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Täze Amallar</Text>
          <View style={styles.quickActions}>
            <QuickActionButton 
              icon={<CreditCard size={24} color="#3498db" />}
              label="Tölegleri Töhmet"
              onPress={() => router.push('/bills')}
            />
            <QuickActionButton 
              icon={<History size={24} color="#3498db" />}
              label="Taryh"
              onPress={() => router.push('/history')}
            />
            <QuickActionButton 
              icon={<Bell size={24} color="#3498db" />}
              label="Habarlar"
              onPress={() => router.push('/notifications')}
            />
            <QuickActionButton 
              icon={<Settings size={24} color="#3498db" />}
              label="Saýlawlar"
              onPress={() => router.push('/profile')}
            />
          </View>
        </View>
        
        {/* Geljekdäki Tölegler */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Geljekdäki Tölegler</Text>
            <TouchableOpacity onPress={() => router.push('/bills')}>
              <Text style={styles.seeAllText}>Bütin Tölegleri Gör</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingBills.map((bill) => (
            <UpcomingBillCard 
              key={bill.id}
              bill={bill}
              onPress={() => router.push(`/bill-details/${bill.id}`)}
            />
          ))}
        </View>
        
        {/* Täze Amallar */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Täze Amallar</Text>
            <TouchableOpacity onPress={() => router.push('/history')}>
              <Text style={styles.seeAllText}>Bütin Täze Amallary Gör</Text>
            </TouchableOpacity>
          </View>
          
          {recentTransactions.map((transaction) => (
            <RecentTransactionCard 
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#f39c12', // Güneş Energiýasy reňki (altyn we narpyz reňkini ýatda saklamak üçin)
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  summaryTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '500',
  },
  summaryAmount: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '700',
    marginVertical: 8,
  },
  summarySubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  viewAllButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  viewAllButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },
  seeAllText: {
    color: '#f39c12', // Güneş enerjisi temasyndaky reňk
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
