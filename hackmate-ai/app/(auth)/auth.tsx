import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleBiometric = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) return;

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
    });

    if (result.success) {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <View style={styles.logoBox}>
        <Ionicons name="flash" size={26} color="#22d3ee" />
      </View>

      <Text style={styles.title}>HackMate AI</Text>
      <Text style={styles.subtitle}>
        Find your dream team, faster.
      </Text>

      {/* CARD */}
      <View style={styles.card}>

        {/* TOGGLE */}
        <View style={styles.toggle}>
          <TouchableOpacity
            style={isLogin ? styles.activeTab : styles.tab}
            onPress={() => setIsLogin(true)}
          >
            <Text style={isLogin ? styles.activeText : styles.text}>
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={!isLogin ? styles.activeTab : styles.tab}
            onPress={() => setIsLogin(false)}
          >
            <Text style={!isLogin ? styles.activeText : styles.text}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* INPUTS */}
        {!isLogin && (
          <View style={styles.input}>
            <Ionicons name="person-outline" size={18} color="#64748b" />
            <TextInput placeholder="Full Name" style={styles.inputText} placeholderTextColor="#64748b" />
          </View>
        )}

        <View style={styles.input}>
          <Ionicons name="mail-outline" size={18} color="#64748b" />
          <TextInput placeholder="Email" style={styles.inputText} placeholderTextColor="#64748b" />
        </View>

        <View style={styles.input}>
          <Ionicons name="lock-closed-outline" size={18} color="#64748b" />
          <TextInput placeholder="Password" secureTextEntry style={styles.inputText} placeholderTextColor="#64748b" />
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/(tabs)/home')}
        >
          <Text style={styles.buttonText}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        {/* BIOMETRIC */}
        <TouchableOpacity style={styles.bioBtn} onPress={handleBiometric}>
          <Ionicons name="finger-print" size={22} color="#22d3ee" />
          <Text style={styles.bioText}>Use Biometrics</Text>
        </TouchableOpacity>

        {/* GUEST */}
        <TouchableOpacity onPress={() => router.replace('/(tabs)/home')}>
          <Text style={styles.guest}>Continue as guest →</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  logoBox: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },

  subtitle: {
    color: '#64748b',
    marginBottom: 30,
  },

  card: {
    width: '100%',
    backgroundColor: '#0f172a',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
  },

  toggle: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  activeTab: {
    flex: 1,
    padding: 10,
    backgroundColor: '#0ea5e9',
    borderRadius: 10,
    alignItems: 'center',
  },

  text: {
    color: '#64748b',
  },

  activeText: {
    color: '#020617',
    fontWeight: '600',
  },

  input: {
    flexDirection: 'row',
    backgroundColor: '#020617',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },

  inputText: {
    marginLeft: 10,
    color: '#fff',
    flex: 1,
  },

  button: {
    backgroundColor: '#0ea5e9',
    padding: 16,
    borderRadius: 14,
    marginTop: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#020617',
    fontWeight: '700',
  },

  bioBtn: {
    marginTop: 15,
    alignItems: 'center',
  },

  bioText: {
    color: '#22d3ee',
    marginTop: 4,
  },

  guest: {
    textAlign: 'center',
    marginTop: 15,
    color: '#64748b',
  },
});