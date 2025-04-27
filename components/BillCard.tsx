import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bill } from '@/utils/mockData';

type BillCardProps = {
  bill: Bill;
  onPress: () => void;
};

export default function BillCard({ bill, onPress }: BillCardProps) {
  const isOverdue = !bill.isPaid && new Date(bill.dueDate) < new Date();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <View style={[styles.utilityIcon, { backgroundColor: bill.iconBgColor }]}>
        <Text style={styles.utilityIconText}>{bill.utility.charAt(0)}</Text>
      </View>
      
      <View style={styles.billInfo}>
        <View style={styles.billHeader}>
          <Text style={styles.utilityName}>{bill.utility}</Text>
          <View style={[
            styles.statusBadge, 
            bill.isPaid ? styles.paidBadge : isOverdue ? styles.overdueBadge : styles.dueBadge
          ]}>
            <Text style={[
              styles.statusText,
              bill.isPaid ? styles.paidText : isOverdue ? styles.overdueText : styles.dueText
            ]}>
              {bill.isPaid ? 'tölenen' : isOverdue ? 'geçmiş' : 'tölenmeli'}
            </Text>
          </View>
        </View>
        
        <Text style={styles.billId}>Bill #{bill.id.substring(0, 8)}</Text>
        
        <View style={styles.billFooter}>
          <Text style={styles.amount}>TMT {bill.amount.toFixed(2)}</Text>
          <Text style={styles.dueDate}>{bill.isPaid ? 'Tölenen wagty' : 'Bermeli wagty'}: {bill.dueDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  utilityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  utilityIconText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  billInfo: {
    flex: 1,
  },
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  utilityName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  dueBadge: {
    backgroundColor: '#fff6e5',
  },
  paidBadge: {
    backgroundColor: '#e6f9f1',
  },
  overdueBadge: {
    backgroundColor: '#fde9e9',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dueText: {
    color: '#f39c12',
  },
  paidText: {
    color: '#2ecc71',
  },
  overdueText: {
    color: '#e74c3c',
  },
  billId: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  billFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3498db',
  },
  dueDate: {
    fontSize: 13,
    color: '#7f8c8d',
  },
});