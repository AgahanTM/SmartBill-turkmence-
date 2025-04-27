import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bill } from '@/utils/mockData';

type UpcomingBillCardProps = {
  bill: Bill;
  onPress: () => void;
};

export default function UpcomingBillCard({ bill, onPress }: UpcomingBillCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <View style={[styles.utilityIcon, { backgroundColor: bill.iconBgColor }]}>
        <Text style={styles.utilityIconText}>{bill.utility.charAt(0)}</Text>
      </View>
      
      <View style={styles.billInfo}>
        <Text style={styles.utilityName}>{bill.utility}</Text>
        <Text style={styles.billPeriod}>{bill.billingPeriod}</Text>
      </View>
      
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{bill.amount.toFixed(2)} TMT</Text>
        <Text style={styles.dueDate}>Ödenmeli: {bill.dueDate}</Text>
      </View>
    </TouchableOpacity>
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
  utilityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  utilityIconText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  billInfo: {
    flex: 1,
    marginLeft: 12,
  },
  utilityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  billPeriod: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 4,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3498db',
  },
  dueDate: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
});
