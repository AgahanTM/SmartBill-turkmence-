import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTransactionHistory } from '@/utils/mockData';
import TransactionCard from '@/components/TransactionCard';
import { Filter } from 'lucide-react-native';

export default function HistoryScreen() {
  const [month, setMonth] = useState('Hemmesi');
  const transactions = getTransactionHistory();
  
  const months = ['Hemmesi', 'Ýan', 'Few', 'Mart', 'Aprel', 'Maý', 'Iýun', 'Iýul', 'Awg', 'Sent', 'Okt', 'Noý', 'Dek'];
  
  // Filter transactions by month if a specific month is selected
  const filteredTransactions = month === 'Hemmesi' 
    ? transactions 
    : transactions.filter(transaction => {
        const transactionMonth = new Date(transaction.date).toLocaleString('default', { month: 'short' });
        return transactionMonth === month;
      });
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Töleg taryhy</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#2c3e50" />
        </TouchableOpacity>
      </View>
      
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
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTransactions.length > 0 ? (
          <>
            {filteredTransactions.map((transaction, index) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                isLast={index === filteredTransactions.length - 1}
              />
            ))}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Geleşik tapylmady</Text>
          </View>
        )}
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
  monthSelector: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e5e9',
  },
  monthItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 8,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
});