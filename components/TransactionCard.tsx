import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Transaction } from '@/utils/mockData';
import { CreditCard, Download } from 'lucide-react-native';

type TransactionCardProps = {
  transaction: Transaction;
  isLast?: boolean;
};

export default function TransactionCard({ transaction, isLast = false }: TransactionCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });
  };
  
  return (
    <View style={[
      styles.container, 
      isLast && styles.lastContainer
    ]}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formatDate(transaction.date)}</Text>
      </View>
      
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <CreditCard size={20} color="#ffffff" />
        </View>
        
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle}>{transaction.description}</Text>
          <Text style={styles.transactionId}>Amal ID: {transaction.id.substring(0, 8)}</Text>
        </View>
        
        <View style={styles.rightContainer}>
          <Text style={styles.amount}>-{transaction.amount.toFixed(2)} TMT</Text>
          <TouchableOpacity style={styles.receiptButton}>
            <Download size={14} color="#3498db" />
            <Text style={styles.receiptText}>Reçedi al</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  lastContainer: {
    marginBottom: 0,
  },
  dateContainer: {
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  transactionId: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 4,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  receiptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#edf5fd',
  },
  receiptText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3498db',
    marginLeft: 4,
  },
});
