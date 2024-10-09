import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, Keyboard, StyleSheet} from 'react-native';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import Onboarding from './(routes)/onboarding';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SearchProvider } from '@/contexts/SearchContext';

interface CustomHeaderProps {
  onBack: () => void;
  title: string; // Title prop to customize header text
}

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true); // Control splash screen visibility
  const [onboardingComplete, setOnboardingComplete] = useState(false); // Track onboarding completion
  const [isDriver, setIsDriver] = useState(false); // Track onboarding completion

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

  if (isDriver == true){
    return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(drivertabs)" options={{ headerShown: false }} />
      </Stack>
    );

  }
  else{
    return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(routes)" options={{ headerShown: false }} /> */}

        {/* <Stack.Screen 
          name="(routes)/schedules/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Bus Schedules" />,
          }} 
        />
        <Stack.Screen 
          name="(routes)/highway_schedules/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Highway Schedules"/>,
          }} 
        />
        <Stack.Screen 
          name="(routes)/intercity_schedules/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Intercity Schedules"/>,
          }} 
        />
        <Stack.Screen 
          name="(routes)/privatebus_schedules/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Private Bus Schedules"/>,
          }} 
        />
        <Stack.Screen 
          name="(routes)/sltb_schedules/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="SLTB Schedules"/>,
          }} 
        />
        <Stack.Screen 
          name="(routes)/user_selection/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="user_selection"/>,
          }} 
        /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
    );

  }

  
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
