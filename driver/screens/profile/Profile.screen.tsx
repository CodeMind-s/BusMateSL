import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Linking from 'expo-linking';
import { router } from "expo-router";


const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View className='flex-1 bg-gray-100'>
      <ScrollView className='p-6'>
        {/* Profile Image and Edit Icon */}
        <View className='items-center mb-6'>
          <View className='relative'>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
              className='w-28 h-28 rounded-full border-4 border-white'
            />
            <TouchableOpacity
              className='absolute bottom-0 right-0 bg-white p-1 rounded-full'
              onPress={() => router.push("/(routes)/login")}
            >
              <Ionicons name="pencil-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text className='text-lg font-bold text-black mt-4'>Happy Travel</Text>
          <Text className='text-gray-500'>happytravel@gmail.com</Text>
        </View>

        {/* Options */}
        
        <View className='mt-8'>
          
          <TouchableOpacity
          onPress={() => router.push("/(routes)/login")}
            className='flex-row items-center justify-between p-4 bg-white rounded-lg mb-2'
          >
            <View className='flex-row items-center'>
              <Ionicons name="location-outline" size={24} color="black" />
              <Text className='ml-4 font-bold text-lg'>Registration details</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => router.push("/(routes)/login")}
            className='flex-row items-center justify-between p-4 bg-white rounded-lg mb-2'
          >
            <View className='flex-row items-center'>
              <Ionicons name="calendar-outline" size={24} color="black" />
              <Text className='ml-4 font-bold text-lg'> Bank Account</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
