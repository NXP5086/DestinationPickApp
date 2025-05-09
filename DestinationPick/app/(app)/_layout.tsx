import { Stack } from 'expo-router';
import React from 'react';
import { useAuth } from '../../src/context/auth';
import { Redirect } from 'expo-router';

export default function AppLayout() {
  const { user } = useAuth();

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
