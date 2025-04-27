import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter } from 'lucide-react-native';
import TransactionCard from '@/components/TransactionCard';
import { getTransactionHistory } from '@/utils/mockData';

// Transaction görnüşi
interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: string;
}

export default function HistoryScreen() {
  const [month, setMonth] = useState<string>('Ählisi');
  const transactions: Transaction[] = getTransactionHistory();

  const months = [
    'Ählisi', 'Ýan', 'Few', 'Mar', 'Apr', 'Maý', 'Iýun',
    'Iýul', 'Awg', 'Sep', 'Okt', 'Noý', 'Dek'
  ];

  const filteredTransactions = month === 'Ählisi'
    ? transactions
    : transactions.filter(transaction => {
        const transactionMonth = new Date(transaction.date).toLocaleString('default', { month: 'short' });
        return transactionMonth === month;
      });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      
      {/* Başlyk */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Töleg taryhy</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#2c3e50" />
        </TouchableOpacity>
      </View>

      {/* Aýlar saýlawy */}
      <View style={styles.monthSelectorWrapper}>
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

      {/* Tölegler sanawy */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
            <Text style={styles.emptyStateText}>Maglumat tapylmady</Text>
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
  monthSelectorWrapper: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e5e9',
    paddingVertical: 8,
  },
  monthSelector: {
    paddingHorizontal: 8,
  },
  monthItem: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginHorizontal: 4,
    backgroundColor: '#f0f2f5',
  },
  selectedMonth: {
    backgroundColor: '#d6eaff',
  },
  monthText: {
    fontSize: 14,
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
    paddingBottom: 32,
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
