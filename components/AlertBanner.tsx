import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CircleAlert as AlertCircle, X } from 'lucide-react-native';
import { useState } from 'react';

type AlertBannerProps = {
  message: string;
  type?: 'info' | 'warning' | 'error';
};

export default function AlertBanner({ message, type = 'info' }: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const colors = {
    info: {
      bg: '#edf5fd',
      text: '#3498db',
      icon: '#3498db'
    },
    warning: {
      bg: '#fff6e5',
      text: '#f39c12',
      icon: '#f39c12'
    },
    error: {
      bg: '#fde9e9',
      text: '#e74c3c',
      icon: '#e74c3c'
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors[type].bg }]}>
      <View style={styles.content}>
        <AlertCircle size={20} color={colors[type].icon} />
        <Text style={[styles.message, { color: colors[type].text }]}>{message}</Text>
      </View>
      <TouchableOpacity onPress={() => setIsVisible(false)}>
        <X size={20} color={colors[type].icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  message: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});