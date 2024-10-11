import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Linking from 'expo-linking';
import { router } from "expo-router";
import { get, post } from "@/helpers/api";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

interface BusProps {
  _id: string;
  busName: string;
  email: string;
  busNumber: string;
}


const ProfileScreen = () => {
  const [currentBus, setCurrentBus] = useState<BusProps>();

  useEffect(() => {
    const fetchBus = async () => {
        try {
            const response = await get(`buses/profile`);
            setCurrentBus(response.data as BusProps);
        } catch (error) {
            console.error("Error fetching bus profile:", error);
        }
      };
      fetchBus();
  }, []);


  const logoutHandler = async () => {
    try {
        const response = await post(`buses/logout`, {}); 
        if (response.status === 200) {
          Alert.alert("Success", "Logout successfully.");
            router.push("/(routes)/login");
        } else {
            console.error("Logout failed: unexpected response", response);
        }
    } catch (error) {
        console.error("Error during logout:", error);
    }
};

  return (
    <View className='flex-1 bg-swhite'>
      {/* <View> */}
        {/* Profile Image and Edit Icon */}
        <View className='items-center -mt-6 bg-Secondary rounded-b-[20px] py-6'>
          <View className='relative'>
            <Image
              source={{ uri: "https://t4.ftcdn.net/jpg/02/18/58/51/360_F_218585163_hKijGOfFIkC3Fuo9JgX2sVGv69UKoXmM.jpg" }}
              className='w-28 h-28 rounded-full border-4 border-white'
            />
          </View>
          <Text className='text-2xl font-bold text-white mt-4'>{currentBus?.busName}</Text>
          <Text className='text-gray-500'>{currentBus?.email}</Text>
        </View>
        <View className=" px-3 mt-4">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/schedule")}
            className='flex-row items-center justify-between p-4 rounded-lg border-b-2 border-[#A1A1A1]/50'
          >
            <View className='flex-row items-center'>
              <Ionicons name="calendar-outline" size={24} color="black" />
              <Text className='ml-4 font-semibold text-base'>Your Schedules</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => router.push("/(routes)/editBusProfile")}
            className='flex-row items-center justify-between p-4 rounded-lg border-b-2 border-[#A1A1A1]/50'
          >
            <View className='flex-row items-center'>
              <FontAwesome name="edit" size={24} color="black" />
              <Text className='ml-4 font-semibold text-base'>Edit Bus Details</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logoutHandler}
            className='flex-row items-center justify-between p-4 rounded-lg mb-2'
          >
            <View className='flex-row items-center'>
              <MaterialIcons name="logout" size={24} color="black" />
              <Text className='ml-4 font-semibold text-base'> Log Out</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </TouchableOpacity>
        </View>
      {/* </> */}
    </View>
  );
};

export default ProfileScreen;
