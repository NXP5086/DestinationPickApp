import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock users for demonstration
  const mockUsers = [
    { id: '1', email: 'user@example.com', password: 'password123', name: 'Test User' },
    { id: '2', email: 'admin@example.com', password: 'admin123', name: 'Admin User' }
  ];

  const handleLogin = () => {
    setLoading(true);
    setError('');
    
    // Simulate API delay
    setTimeout(() => {
      const foundUser = mockUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (foundUser) {
        setIsLoggedIn(true);
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  // If logged in, show home screen
  if (isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.homeContent}>
          <Text style={styles.title}>Welcome to DestinationPick</Text>
          <Text style={styles.description}>You are now logged in!</Text>
          
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={() => setIsLoggedIn(false)}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Login screen
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={styles.cardContainer}>
        <Text style={styles.title}>DestinationPick</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.helpText}>
          Demo accounts: {"\n"}
          user@example.com / password123 {"\n"}
          admin@example.com / admin123
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4c669f',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#4c669f',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
  },
  helpText: {
    marginTop: 24,
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
});
