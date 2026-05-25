import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Помилка', 'Заповніть усі поля');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Помилка', 'Пароль має бути не менше 6 символів');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Помилка', 'Паролі не збігаються');
      return;
    }
    setLoading(true);
    try {
      await register(email.trim(), password, name.trim());
      router.replace('/(tabs)');
    } catch (e: any) {
      Alert.alert('Помилка реєстрації', e.message || 'Не вдалося створити акаунт');
    } finally {
      setLoading(false);
    }
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
            <Text style={styles.title}>Реєстрація</Text>
            <Text style={styles.subtitle}>Створіть новий акаунт</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Ім'я</Text>
            <View style={styles.inputRow}>
              <Ionicons name="person-outline" size={20} color="#4A5568" />
              <TextInput
                style={styles.input}
                placeholder="Ваше ім'я"
                placeholderTextColor="#A0AEC0"
                value={name}
                onChangeText={setName}
                autoCorrect={false}
              />
            </View>

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
                placeholder="Мінімум 6 символів"
                placeholderTextColor="#A0AEC0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#4A5568" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Підтвердіть пароль</Text>
            <View style={styles.inputRow}>
              <Ionicons name="lock-closed-outline" size={20} color="#4A5568" />
              <TextInput
                style={styles.input}
                placeholder="Повторіть пароль"
                placeholderTextColor="#A0AEC0"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
              />
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
              style={styles.registerBtn}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.registerBtnText}>Зареєструватися</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Вже є акаунт? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.bottomLink}>Увійти</Text>
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
  registerBtn: {
    backgroundColor: '#005BBB', borderRadius: 16, paddingVertical: 16,
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  registerBtnText: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  bottomRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', paddingTop: 32 },
  bottomText: { color: '#4A5568', fontSize: 14 },
  bottomLink: { color: '#005BBB', fontSize: 14, fontWeight: '700' },
});
