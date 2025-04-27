import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { getBillById } from '@/utils/mockData';
import { ArrowLeft, Calendar, FileText, CircleAlert as AlertCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import PaymentSuccessModal from '@/components/PaymentSuccessModal';

export default function BillDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [bill, setBill] = useState(getBillById(id as string));
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transaction, setTransaction] = useState<any>(null);
  
  const handlePayBill = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    
    setIsPaymentProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsPaymentProcessing(false);
      setBill({
        ...bill,
        isPaid: true,
        status: 'tolenen',
      });
      
      // Create transaction record
      const newTransaction = {
        id: `txn-${Date.now()}`,
        description: `${bill.utility} Tolemek`,
        amount: bill.amount,
        date: new Date().toISOString(),
        paymentMethod: 'kredit kart',
      };
      setTransaction(newTransaction);
      setShowSuccessModal(true);
    }, 2000);
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hasap maglumatlary</Text>
        <View style={styles.backButton} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {showSuccessModal ? (
          <View style={styles.paymentSuccessCard}>
            <Text style={styles.paymentSuccessTitle}>Islem basaryly!</Text>
            <Text style={styles.paymentSuccessText}>
              Sagbolun!
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.billHeader}>
              <View style={[styles.utilityIcon, { backgroundColor: bill.iconBgColor }]}>
                <Text style={styles.utilityIconText}>{bill.utility.charAt(0)}</Text>
              </View>
              <View style={styles.billHeaderInfo}>
                <Text style={styles.billTitle}>{bill.utility}</Text>
                <Text style={styles.billAccount}>Akkaunt: {bill.accountNumber}</Text>
              </View>
              <View style={[styles.statusBadge, bill.isPaid ? styles.paidBadge : styles.dueBadge]}>
                <Text style={bill.isPaid ? styles.paidBadgeText : styles.dueBadgeText}>
                  {bill.status}
                </Text>
              </View>
            </View>
            
            <View style={styles.amountCard}>
              <Text style={styles.amountLabel}>Berilmeli mukdar</Text>
              <Text style={styles.amountValue}>TMT {bill.amount.toFixed(2)}</Text>
              <View style={styles.dateRow}>
                <Calendar size={16} color="#7f8c8d" />
                <Text style={styles.dueDate}>Berilmeli {bill.dueDate}</Text>
              </View>
            </View>
            
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <FileText size={18} color="#3498db" />
                <Text style={styles.sectionTitle}>Hasap gysgaça mazmuny</Text>
              </View>
              
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Öňki</Text>
                <Text style={styles.summaryValue}>TMT 0.00</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Häzirki tölegler</Text>
                <Text style={styles.summaryValue}>TMT {bill.amount.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Salgytlar we ýygymlar</Text>
                <Text style={styles.summaryValue}>TMT 0.00</Text>
              </View>
              <View style={[styles.summaryItem, styles.totalItem]}>
                <Text style={styles.totalLabel}>Jemi mukdar</Text>
                <Text style={styles.totalValue}>TMT {bill.amount.toFixed(2)}</Text>
              </View>
            </View>
            
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <AlertCircle size={18} color="#3498db" />
                <Text style={styles.sectionTitle}>Möhüm maglumat</Text>
              </View>
              
              <Text style={styles.infoText}>
              Bu, esasy köçäniň 123-nji jaýynda hyzmatyňyz üçin {bill.utility.toLowerCase ()} tölegidir. 
              Hasaplaşyk möhleti {bill.billingPeriod}.
              </Text>
            </View>
            
            <View style={styles.paymentMethods}>
              <Text style={styles.paymentMethodsTitle}>Töleg usullary</Text>
              <View style={styles.paymentMethodsGrid}>
                <TouchableOpacity style={[styles.paymentMethod, styles.selectedPaymentMethod]}>
                  <Text style={styles.paymentMethodText}>Kredit kart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMethod}>
                  <Text style={styles.paymentMethodText}>Bank hasaby</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMethod}>
                  <Text style={styles.paymentMethodText}>Apple Pay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentMethod}>
                  <Text style={styles.paymentMethodText}>Google Pay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      
      {!bill.isPaid && !showSuccessModal && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.payButton}
            onPress={handlePayBill}
            disabled={isPaymentProcessing}
          >
            <Text style={styles.payButtonText}>
              {isPaymentProcessing ? 'Işlenilyar ...' : `Töle TMT ${bill.amount.toFixed(2)}`}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {transaction && (
        <PaymentSuccessModal
          visible={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            router.back();
          }}
          transaction={transaction}
        />
      )}
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
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },
  backButton: {
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
  scrollContent: {
    padding: 16,
  },
  billHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  utilityIconText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  billHeaderInfo: {
    flex: 1,
    marginLeft: 16,
  },
  billTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },
  billAccount: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  dueBadge: {
    backgroundColor: '#fff6e5',
  },
  paidBadge: {
    backgroundColor: '#e6f9f1',
  },
  dueBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#f39c12',
  },
  paidBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2ecc71',
  },
  amountCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  amountValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2c3e50',
    marginVertical: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: 14,
    color: '#7f8c8d',
    marginLeft: 6,
  },
  section: {
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginLeft: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  totalItem: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
  },
  paymentMethods: {
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
  paymentMethodsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 16,
  },
  paymentMethodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  paymentMethod: {
    width: '48%',
    backgroundColor: '#f5f7f9',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedPaymentMethod: {
    backgroundColor: '#3498db',
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  payButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  paymentSuccessCard: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  paymentSuccessTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  paymentSuccessText: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});
