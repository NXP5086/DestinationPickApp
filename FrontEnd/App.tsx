import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './contexts/AuthContext';
import { useEffect } from 'react';
import { View } from 'react-native';

// This is the main entry point for your app
// With Expo Router, we just need to wrap our app with the AuthProvider
export default function App() {
  return (
    <AuthProvider>
      {/* This component is actually not used for rendering UI - Expo Router takes care of that */}
      {/* It's just a container for the AuthProvider */}
      <StatusBar style="auto" />
    </AuthProvider>
  );
}