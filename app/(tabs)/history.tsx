import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTransactionHistory } from '@/utils/mockData';
import TransactionCard from '@/components/TransactionCard';
import UsageGraph from '@/components/UsageGraph';
import { Filter } from 'lucide-react-native';

export default function HistoryScreen() {
  const [month, setMonth] = useState('Hemmesi');
  const transactions = getTransactionHistory();
  
  const months = ['Hemmesi', 'Ýan', 'Few', 'Mart', 'Aprel', 'Maý', 'Iýun', 'Iýul', 'Awgust', 'Sentýabr', 'Oktyabr', 'Noýabr', 'Dekabr'];
  
  // Seçilen aýa görä işlemleri filtreläň
  const filteredTransactions = month === 'Hemmesi' 
    ? transactions 
    : transactions.filter(transaction => {
        const transactionMonth = new Date(transaction.date).toLocaleString('default', { month: 'short' });
        return transactionMonth === month;
      });

  // Grafika üçin ulanylan maglumatlar
  const usageData = {
    labels: ['Ýan', 'Few', 'Mart', 'Aprel', 'Maý', 'Iýun'],
    values: [120, 145, 132, 158, 142, 138],
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Töleg Taryhy</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#2c3e50" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Grafigi Bölümi */}
        <View style={styles.graphSection}>
          <UsageGraph 
            data={usageData}
            title="Aýlyk Ulanyş Grafigi"
            color="#3498db"
          />
        </View>

        {/* Işlemler Bölümi */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Işlemler</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.monthSelector}
            >
              {months.map((m) => (
                <TouchableOpacity 
                  key={m}
                  style={[styles.monthItem, month === m && styles.selectedMonth]}
                  onPress={() => setMonth(m)}
                >
                  <Text style={[styles.monthText, month === m && styles.selectedMonthText]}>
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.transactionsList}>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  isLast={index === filteredTransactions.length - 1}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>Işlem tapylmady</Text>
              </View>
            )}
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f7f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  graphSection: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e5e9',
  },
  transactionsSection: {
    flex: 1,
    backgroundColor: '#f5f8fa',
  },
  sectionHeader: {
    backgroundColor: '#ffffff',
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e5e9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginLeft: 16,
    marginBottom: 12,
  },
  monthSelector: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  monthItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#f5f7f9',
  },
  selectedMonth: {
    backgroundColor: '#edf5fd',
  },
  monthText: {
    fontWeight: '600',
    color: '#7f8c8d',
  },
  selectedMonthText: {
    color: '#3498db',
  },
  transactionsList: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
});
