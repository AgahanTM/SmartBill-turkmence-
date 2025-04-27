import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import BillCard from '@/components/BillCard';
import { getBills } from '@/utils/mockData';
import { Filter } from 'lucide-react-native';

export default function BillsScreen() {
  const [filter, setFilter] = useState('hemmesi'); // 'all' - hemmesi, 'due' - tölenmeli, 'paid' - tölenen
  const allBills = getBills();
  
  const filteredBills = allBills.filter(bill => {
    if (filter === 'hemmesi') return true;
    if (filter === 'tölenmeli') return !bill.isPaid;
    if (filter === 'tölenen') return bill.isPaid;
    return true;
  });
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Seniň Hasaplaryň</Text> {/* "Your Bills" -> "Seniň Hasaplaryň" */}
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#2c3e50" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filterTabs}>
        <TouchableOpacity 
          style={[styles.filterTab, filter === 'hemmesi' && styles.activeFilterTab]}
          onPress={() => setFilter('hemmesi')}
        >
          <Text style={[styles.filterTabText, filter === 'hemmesi' && styles.activeFilterText]}>
            Hemmesi {/* "All" -> "Hemmesi" */}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterTab, filter === 'tölenmeli' && styles.activeFilterTab]}
          onPress={() => setFilter('tölenmeli')}
        >
          <Text style={[styles.filterTabText, filter === 'tölenmeli' && styles.activeFilterText]}>
            Tölenmeli {/* "Due" -> "Tölenmeli" */}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterTab, filter === 'tölenen' && styles.activeFilterTab]}
          onPress={() => setFilter('tölenen')}
        >
          <Text style={[styles.filterTabText, filter === 'tölenen' && styles.activeFilterText]}>
            Tölenenler {/* "Paid" -> "Tölenenler" */}
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredBills.length > 0 ? (
          filteredBills.map((bill) => (
            <BillCard 
              key={bill.id}
              bill={bill}
              onPress={() => router.push(`/bill-details/${bill.id}`)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Hasap tapylmady</Text> {/* "No bills found" -> "Hasap tapylmady" */}
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
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e5e9',
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilterTab: {
    backgroundColor: '#edf5fd',
  },
  filterTabText: {
    fontWeight: '600',
    color: '#7f8c8d',
  },
  activeFilterText: {
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
