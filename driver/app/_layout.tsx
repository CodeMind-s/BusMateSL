import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, Keyboard, StyleSheet} from 'react-native';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CustomHeaderProps {
  onBack: () => void;
  title: string;
}

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
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
      <Stack screenOptions={{headerShown: true}}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="(routes)/earning/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Earning Summary"/>,
          }} 
        />
        <Stack.Screen 
          name="(routes)/addSchedule/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Add New Schedule"/>,
          }} 
        />
        <Stack.Screen 
          name="(routes)/addAnnouncement/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Create Announcement"/>,
          }} 
        />
        <Stack.Screen 
          name="(routes)/announcement/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Announcements"/>,
          }} 
        />
        <Stack.Screen 
          name="(routes)/forgotPassword/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Forgot Password"/>,
          }} 
        />
        <Stack.Screen 
          name="(routes)/login/index" 
          options={{
            header: () => <CustomHeader onBack={() => null} title="Login"/>,
          }} 
        />
        <Stack.Screen 
          name="(routes)/register/index" 
          options={{
            header: () => <CustomHeader onBack={() => null} title="Register"/>,
          }} 
        />
        <Stack.Screen 
          name="(routes)/editBusProfile/index" 
          options={{
            header: () => <CustomHeader onBack={() => router.back()} title="Edit Bus Details"/>,
          }} 
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    );
};


const CustomHeader: React.FC<CustomHeaderProps> = ({ onBack, title }) => (
  <View style={styles.headerContainer}>
     {title !== "Login" && title !== "Register" && title !== "Ticket Details" && (
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
      <Ionicons name="arrow-back-circle-outline" size={28} color="white" />
    </TouchableOpacity>
     )}

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
