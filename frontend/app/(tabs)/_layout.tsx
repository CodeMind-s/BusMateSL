import { View, Text, TouchableOpacity, Keyboard  } from 'react-native'
import { router, Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';

const TabLayout = () => {
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
    <Tabs screenOptions={{
        headerStyle: {
            backgroundColor: "#23252E", 
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            height: 100
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
            color: "white",
            fontSize: 20,
            fontWeight: 200,
        },
        tabBarActiveTintColor: "#3B6DE7",
        tabBarInactiveTintColor: "#23252E",
        tabBarStyle:{
            backgroundColor: "#FFFFFF",
            justifyContent: "center",
            display: isKeyboardVisible ? 'none' : 'flex',
        },
        tabBarIconStyle:{
            marginTop: 5,
            marginBottom: 3
        },
        tabBarLabelStyle:{
            marginTop: -3,
            marginBottom: 5,
        },
        headerLeft: ()=><TouchableOpacity onPress={()=> router.back()} className=' ml-5'><Ionicons name="arrow-back-circle-outline" size={28} color="white" /></TouchableOpacity>
    }}
    >

    <Tabs.Screen
      name="index"
      options={{
        title: 'Bus Mate SL',
        tabBarLabel: "Home",
        tabBarIcon: ({color,size})=><Ionicons name="home" size={size} color={color} />
      }}
    />

    <Tabs.Screen
      name="track-bus/index"
      options={{
        title: 'Track Details',
        tabBarLabel: "Track Bus",
        headerRight: ()=><TouchableOpacity className=' mr-5'><Ionicons name="search" size={28} color="white" /></TouchableOpacity>,
        tabBarIcon: ({color,size})=><Ionicons name="location-sharp" size={size} color={color} />
      }}
    />

    <Tabs.Screen
      name="tickets/index"
      options={{
        title: 'Tickets',
        tabBarLabel: "Tikets",
        tabBarIcon: ({color,size})=><Ionicons name="ticket" size={size} color={color} />
      }}
    />

    <Tabs.Screen
      name="notification/index"
      options={{
        title: 'Notifications',
        tabBarLabel: "Notification",
        tabBarIcon: ({color,size})=><Ionicons name="notifications-sharp" size={size} color={color} />   
      }}
    />

    <Tabs.Screen
      name="profile/index"
      options={{
        title: 'Profile',
        tabBarLabel: "Profile",
        tabBarIcon: ({color,size})=><Ionicons name="person" size={size} color={color} />
        
      }}
    />
  </Tabs>
  )
}

export default TabLayout