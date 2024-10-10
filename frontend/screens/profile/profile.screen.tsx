import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import tailwind from "tailwind-react-native-classnames";
import * as Linking from 'expo-linking';
import { router } from "expo-router";


const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View className='flex-1 bg-swhite'>
      <ScrollView className="  -mt-5">
        {/* Profile Image and Edit Icon */}
        <View className='items-center py-6 mb-6 bg-Secondary rounded-b-[20px] '>
          <View className='relative'>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
              className='w-28 h-28 rounded-full border-4 border-white'
            />
            <TouchableOpacity
              className='absolute bottom-0 right-0 bg-white p-1 rounded-full'
              onPress={() => router.push("/(routes)/editProfile")}
            >
              <Ionicons name="pencil-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text className='text-lg font-bold text-white mt-4'>Randini Maliksha</Text>
          <Text className='text-[#A1A1A1]'>randi@gmail.com</Text>
        </View>

        {/* Options */}
        
        <View className=' px-2'>
          
          <TouchableOpacity
            className='flex-row items-center justify-between p-4 bg-swhite border-[#A1A1A1]/50 border-b-2 rounded-lg'
          >
            <View className='flex-row items-center'>
              <Ionicons name="location-outline" size={24} color="black" />
              <Text className='ml-4 font-bold text-base'>My Locations</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            className='flex-row items-center justify-between p-4 bg-swhite rounded-lg border-[#A1A1A1]/50 border-b-2'
          >
            <View className='flex-row items-center'>
              <Ionicons name="calendar-outline" size={24} color="black" />
              <Text className='ml-4 font-bold text-base'>Booking History</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(routes)/editProfile")}
            className='flex-row items-center justify-between p-4 bg-swhite rounded-lg border-[#A1A1A1]/50 border-b-2'
          >
            <View className='flex-row items-center'>
              <Ionicons name="settings-outline" size={24} color="black" />
              <Text className='ml-4 font-bold text-base'>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(routes)/login")}
            className='flex-row items-center justify-between p-4 bg-swhite rounded-lg border-[#A1A1A1]/50 border-b-2'
          >
            <View className='flex-row items-center'>
              <Ionicons name="exit-outline" size={24} color="black" />
              <Text className='ml-4 font-bold text-base'>Sign Out</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
