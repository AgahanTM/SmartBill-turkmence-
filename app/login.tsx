import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/context/AuthContext';
import * as Haptics from 'expo-haptics';

export default function Login() {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    // Web däl platformalarda haptic bildiriş beriň
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setIsLoading(true);
    
    // API jaňyny simulýasiýa ediň
    setTimeout(() => {
      signIn();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=400' }} 
              style={styles.logo}
            />
            <Text style={styles.logoText}>SmartBill</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.heading}>Hoş geldiniz</Text>
            <Text style={styles.subHeading}>
              Ýerleşim we utilities sanawlaryny dolandyrmak üçin giriň
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-poçta</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="E-poçtanyzy giriziň"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Parol</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Parolyňyzy giriziň"
                secureTextEntry
              />
            </View>
            
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Paroly ýatdan çykardyňyzmy?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.signInButton}
              onPress={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.signInButtonText}>Girmek</Text>
              )}
            </TouchableOpacity>
            
            <View style={styles.demoNote}>
              <Text style={styles.demoNoteText}>
                Bu demo programmasydyr. Girip bolmak üçin önceden doldurylan maglumatlary ulanyň.
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fa',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3498db',
    marginTop: 12,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f7f9',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2c3e50',
    borderWidth: 1,
    borderColor: '#e0e5e9',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: '#3498db',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  demoNote: {
    marginTop: 24,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  demoNoteText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});
