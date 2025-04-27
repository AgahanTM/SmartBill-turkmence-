import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '@/utils/mockData';
import { CircleCheck as CheckCircle2 } from 'lucide-react-native';

type RecentTransactionCardProps = {
  transaction: Transaction;
};

export default function RecentTransactionCard({ transaction }: RecentTransactionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <CheckCircle2 size={20} color="#2ecc71" />
      </View>
      
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>{transaction.description}</Text>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
      </View>
      
      <Text style={styles.amount}>-TMT {transaction.amount.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
    backgroundColor: '#e6f9f1',
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
  transactionDate: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
  },
});