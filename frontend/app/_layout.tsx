import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, Keyboard, StyleSheet } from 'react-native';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import Onboarding from './(routes)/onboarding';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SearchProvider } from '@/contexts/SearchContext';
import { TicketProvider } from '@/contexts/TicketContext';

interface CustomHeaderProps {
  onBack: () => void;
  title: string; // Title prop to customize header text
}

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);


  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const prepareApp = async () => {
      // Simulate a task (e.g., loading resources)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating a loading task

      // Once the task is done, hide the splash screen
      SplashScreen.hideAsync();
      setAppIsReady(true);
    };

    prepareApp();
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setOnboardingComplete(true); // Set onboarding complete state
  };

  if (!appIsReady) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <TicketProvider>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(routes)/schedules/index"
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Bus Schedules" />,
          }}
        />
        <Stack.Screen
          name="(routes)/highway_schedules/index"
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Highway Schedules" />,
          }}
        />
        <Stack.Screen
          name="(routes)/intercity_schedules/index"
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Intercity Schedules" />,
          }}
        />
        <Stack.Screen
          name="(routes)/privatebus_schedules/index"
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Private Bus Schedules" />,
          }}
        />
        <Stack.Screen
          name="(routes)/sltb_schedules/index"
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="SLTB Schedules" />,
          }}
        />
        <Stack.Screen
          name="(routes)/highway_schedules_details/index"
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Highway Schedule Details" />,
          }}
        />
        <Stack.Screen
          name="(routes)/sltb_schedules_details/index"
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="SLTB Schedule Details" />,
          }}
        />
        <Stack.Screen
          name="(routes)/intercity_schedules_details/index"
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Intercity Schedule Details" />,
          }}
        />
        <Stack.Screen
          name="(routes)/privatebus_schedules_details/index"
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Private Bus Schedule Details" />,
          }}
        />
        <Stack.Screen
          name="(routes)/tickets/ticket/index"
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Book Ticket" />,
          }}
        />
        <Stack.Screen
          name="(routes)/tickets/bus-details/[id]"
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Bus Details" />,
          }}
        />
        <Stack.Screen
          name="(routes)/tickets/bus-seating/[id]"
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Bus Seat Selection" />,
          }}
        />
        <Stack.Screen
          name="(routes)/tickets/checkout/[id]/[seat]"
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Checkout" />,
          }}
        />
        <Stack.Screen
          name="(routes)/tickets/confirmation/[id]"
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Ticket Details" />,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </TicketProvider>
  );
};


const CustomHeader: React.FC<CustomHeaderProps> = ({ onBack, title }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={onBack} style={styles.backButton}>
      <Ionicons name="arrow-back-circle-outline" size={28} color="white" />
    </TouchableOpacity>
    {/* Apply the title prop to the header text */}
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#23252E',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 45
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    top: 10,
  },
});

export default RootLayout;
