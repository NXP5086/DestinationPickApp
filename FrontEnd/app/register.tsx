import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../utils/api';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('couple'); // default role
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    // Validate inputs
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      Alert.alert('Success', `Welcome ${res.data.user.name}`, [
        { text: 'OK', onPress: () => router.replace('/login') }
      ]);
    } catch (err: any) {
      Alert.alert('Registration Failed', err.response?.data?.message || 'Please try again with different credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>
      <TextInput 
        placeholder="Name" 
        value={name} 
        onChangeText={setName} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput 
        placeholder="Password" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Role (admin or couple)" 
        value={role} 
        onChangeText={setRole} 
        style={styles.input} 
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{marginVertical: 12}} />
      ) : (
        <Button title="Register" onPress={handleRegister} />
      )}
      <Text onPress={() => router.push('/login')} style={styles.link}>
        Already have an account? Log in
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderBottomWidth: 1, marginBottom: 12, padding: 8 },
  link: { color: 'blue', marginTop: 12 },
});