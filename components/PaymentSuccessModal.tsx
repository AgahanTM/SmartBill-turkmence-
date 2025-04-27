import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { CircleCheck as CheckCircle2, Download } from 'lucide-react-native';
import { Transaction } from '@/utils/mockData';
import { downloadReceipt } from '@/utils/receiptGenerator';
import { Platform } from 'react-native';

type PaymentSuccessModalProps = {
  visible: boolean;
  onClose: () => void;
  transaction: Transaction;
};

export default function PaymentSuccessModal({ visible, onClose, transaction }: PaymentSuccessModalProps) {
  const handleDownload = () => {
    if (Platform.OS === 'web') {
      downloadReceipt(transaction);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <CheckCircle2 size={48} color="#2ecc71" />
          </View>
          
          <Text style={styles.title}>Töleg üstünlikli!</Text>
          <Text style={styles.message}>
            {transaction.amount.toFixed(2)} TMT tölegiňiz üstünlikli geçirilipdir.
          </Text>
          
          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Amal ID:</Text>
              <Text style={styles.detailValue}>{transaction.id}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Sene:</Text>
              <Text style={styles.detailValue}>
                {new Date(transaction.date).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Töleg usuly:</Text>
              <Text style={styles.detailValue}>{transaction.paymentMethod}</Text>
            </View>
          </View>

          {Platform.OS === 'web' && (
            <TouchableOpacity 
              style={styles.downloadButton}
              onPress={handleDownload}
            >
              <Download size={20} color="#ffffff" />
              <Text style={styles.downloadText}>Çekim reçedesini ýükle</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e6f9f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 24,
  },
  details: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  downloadButton: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  downloadText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  closeText: {
    color: '#7f8c8d',
    fontSize: 16,
    fontWeight: '600',
  },
});
