import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';

export default function RecoveryScreen() {
  const router = useRouter();
  const { requestRecovery, resetPassword } = useAuth();
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequestRecovery = async () => {
    if (!email.trim()) {
      Alert.alert('Помилка', 'Введіть email');
      return;
    }
    setLoading(true);
    try {
      await requestRecovery(email.trim());
      Alert.alert(
        'Перевірте пошту',
        'Якщо акаунт існує, інструкції для відновлення паролю надіслано на вашу пошту. Введіть токен з листа нижче.',
        [{ text: 'OK', onPress: () => setStep('reset') }]
      );
    } catch (e: any) {
      Alert.alert('Помилка', e.message || 'Не вдалося відправити запит');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!token.trim() || !newPassword.trim()) {
      Alert.alert('Помилка', 'Заповніть усі поля');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Помилка', 'Пароль має бути не менше 6 символів');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Помилка', 'Паролі не збігаються');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(token.trim(), newPassword);
      Alert.alert('Успішно', 'Пароль змінено! Увійдіть з новим паролем.', [
        { text: 'OK', onPress: () => router.replace('/(auth)/login') },
      ]);
    } catch (e: any) {
      Alert.alert('Помилка', e.message || 'Не вдалося змінити пароль');
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
            <Text style={styles.title}>
              {step === 'email' ? 'Відновлення паролю' : 'Новий пароль'}
            </Text>
            <Text style={styles.subtitle}>
              {step === 'email'
                ? 'Введіть email для відновлення'
                : 'Введіть токен та новий пароль'}
            </Text>
          </View>

          {step === 'email' ? (
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

              <TouchableOpacity
                onPress={handleRequestRecovery}
                disabled={loading}
                style={styles.primaryBtn}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.primaryBtnText}>Відправити інструкції</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.label}>Токен відновлення</Text>
              <View style={styles.inputRow}>
                <Ionicons name="key-outline" size={20} color="#4A5568" />
                <TextInput
                  style={styles.input}
                  placeholder="Вставте токен з листа"
                  placeholderTextColor="#A0AEC0"
                  value={token}
                  onChangeText={setToken}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <Text style={styles.label}>Новий пароль</Text>
              <View style={styles.inputRow}>
                <Ionicons name="lock-closed-outline" size={20} color="#4A5568" />
                <TextInput
                  style={styles.input}
                  placeholder="Мінімум 6 символів"
                  placeholderTextColor="#A0AEC0"
                  value={newPassword}
                  onChangeText={setNewPassword}
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
                onPress={handleResetPassword}
                disabled={loading}
                style={styles.primaryBtn}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.primaryBtnText}>Змінити пароль</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setStep('email')} style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnText}>Надіслати токен повторно</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Пам'ятаєте пароль? </Text>
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
  primaryBtn: {
    backgroundColor: '#005BBB', borderRadius: 16, paddingVertical: 16,
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  primaryBtnText: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  secondaryBtn: { alignItems: 'center', marginTop: 12 },
  secondaryBtnText: { color: '#005BBB', fontSize: 14, fontWeight: '600' },
  bottomRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', paddingTop: 32 },
  bottomText: { color: '#4A5568', fontSize: 14 },
  bottomLink: { color: '#005BBB', fontSize: 14, fontWeight: '700' },
});
