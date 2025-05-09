import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../../src/context/auth';
import { Redirect } from 'expo-router';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  
  // If no user is logged in, redirect to login
  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to DestinationPick</Text>
        <Text style={styles.welcomeText}>Hello, {user.name || user.email}!</Text>
        <Text style={styles.description}>
          This is your destination management dashboard. More features coming soon!
        </Text>
        
        <TouchableOpacity 
          style={styles.signOutButton} 
          onPress={signOut}
        >
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4c669f',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
  },
  signOutButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  signOutButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
