import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Помилка', 'Заповніть усі поля');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
      router.replace('/(tabs)');
    } catch (e: any) {
      Alert.alert('Помилка входу', e.message || 'Невірний email або пароль');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    Alert.alert(
      'Google OAuth',
      'Для входу через Google потрібно налаштувати GOOGLE_CLIENT_ID у backend .env файлі та встановити expo-auth-session.'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#0A1128" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.logo}>🌊 ODESA WAVE</Text>
            <Text style={styles.title}>Вхід</Text>
            <Text style={styles.subtitle}>Увійдіть до свого акаунту</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputRow}>
              <Ionicons name="mail-outline" size={20} color="#4A5568" />
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor="#A0AEC0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <Text style={styles.label}>Пароль</Text>
            <View style={styles.inputRow}>
              <Ionicons name="lock-closed-outline" size={20} color="#4A5568" />
              <TextInput
                style={styles.input}
                placeholder="Ваш пароль"
                placeholderTextColor="#A0AEC0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#4A5568" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => router.push('/(auth)/recovery')} style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Забули пароль?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              style={styles.loginBtn}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.loginBtnText}>Увійти</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>або</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity onPress={handleGoogleLogin} style={styles.googleBtn} activeOpacity={0.8}>
              <Ionicons name="logo-google" size={22} color="#DB4437" />
              <Text style={styles.googleBtnText}>Увійти через Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Немає акаунту? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={styles.bottomLink}>Зареєструватися</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F5F8' },
  scrollContent: { padding: 24, flexGrow: 1 },
  backBtn: { marginBottom: 16 },
  header: { marginBottom: 32 },
  logo: { fontSize: 20, fontWeight: '800', color: '#005BBB', letterSpacing: 2, marginBottom: 16 },
  title: { fontSize: 32, fontWeight: '800', color: '#0A1128' },
  subtitle: { fontSize: 15, color: '#4A5568', marginTop: 4 },
  form: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: '#4A5568', marginBottom: 4 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#FFF', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(0,91,187,0.12)',
    paddingHorizontal: 16, paddingVertical: 12, marginBottom: 12,
  },
  input: { flex: 1, fontSize: 15, color: '#0A1128' },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 16 },
  forgotText: { color: '#005BBB', fontSize: 13, fontWeight: '600' },
  loginBtn: {
    backgroundColor: '#005BBB', borderRadius: 16, paddingVertical: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  loginBtnText: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(0,91,187,0.12)' },
  dividerText: { color: '#4A5568', fontSize: 13 },
  googleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: '#FFF', borderRadius: 16, paddingVertical: 14, borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)',
  },
  googleBtnText: { color: '#0A1128', fontSize: 15, fontWeight: '600' },
  bottomRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', paddingTop: 32 },
  bottomText: { color: '#4A5568', fontSize: 14 },
  bottomLink: { color: '#005BBB', fontSize: 14, fontWeight: '700' },
});
