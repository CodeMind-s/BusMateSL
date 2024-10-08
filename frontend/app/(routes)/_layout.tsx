import { View, Text, TouchableOpacity, Keyboard, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SearchProvider } from '@/contexts/SearchContext';
import { router, Stack } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CustomHeaderProps {
  onBack: () => void;
  title: string; // Title prop to customize header text
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ onBack, title }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={onBack} style={styles.backButton}>
      <Ionicons name="arrow-back-circle-outline" size={28} color="white" />
    </TouchableOpacity>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const RouteScreenLayout = () => {
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

  return (
    <SearchProvider>
      <Stack screenOptions={{ animation: 'none' }}>
        <Stack.Screen 
          name="schedules/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Bus Schedules" />,
          }} 
        />
        <Stack.Screen 
          name="highway_schedules/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Highway Schedules"/>,
          }} 
        />
        <Stack.Screen 
          name="intercity_schedules/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Intercity Schedules"/>,
          }} 
        />
        <Stack.Screen 
          name="privatebus_schedules/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Private Bus Schedules"/>,
          }} 
        />
        <Stack.Screen 
          name="sltb_schedules/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="SLTB Schedules"/>,
          }} 
        />
        <Stack.Screen 
          name="user_selection/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="user_selection"/>,
          }} 
        />
      </Stack>
    </SearchProvider>
  );
};

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

export default RouteScreenLayout;