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
    <View style={tailwind`flex-1 bg-gray-100`}>
      <ScrollView contentContainerStyle={tailwind`p-6`}>
        {/* Profile Image and Edit Icon */}
        <View style={tailwind`items-center mb-6`}>
          <View style={tailwind`relative`}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
              style={tailwind`w-28 h-28 rounded-full border-4 border-white`}
            />
            <TouchableOpacity
              style={tailwind`absolute bottom-0 right-0 bg-white p-1 rounded-full`}
              onPress={() => router.push("/(routes)/editProfile")}
            >
              <Ionicons name="pencil-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={tailwind`text-lg font-bold text-black mt-4`}>Randini Maliksha</Text>
          <Text style={tailwind`text-gray-500`}>randi@gmail.com</Text>
        </View>

        {/* Options */}
        
        <View style={tailwind`mt-8`}>
          
          <TouchableOpacity
          onPress={() => router.push("/(routes)/login")}
            style={tailwind`flex-row items-center justify-between p-4 bg-white rounded-lg mb-2`}
          >
            <View style={tailwind`flex-row items-center`}>
              <Ionicons name="location-outline" size={24} color="black" />
              <Text style={tailwind`ml-4 font-bold text-lg text-base`}>My Locations</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => router.push("/(routes)/highway_schedules")}
            style={tailwind`flex-row items-center justify-between p-4 bg-white rounded-lg mb-2`}
          >
            <View style={tailwind`flex-row items-center`}>
              <Ionicons name="calendar-outline" size={24} color="black" />
              <Text style={tailwind`ml-4 font-bold text-lg text-base`}>Booking History</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => router.push("/(routes)/highway_schedules")}
            style={tailwind`flex-row items-center justify-between p-4 bg-white rounded-lg mb-2`}
          >
            <View style={tailwind`flex-row items-center`}>
              <Ionicons name="settings-outline" size={24} color="black" />
              <Text style={tailwind`ml-4 font-bold text-lg text-base`}>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => router.push("/(routes)/highway_schedules")}
            style={tailwind`flex-row items-center justify-between p-4 bg-white rounded-lg mb-2`}
          >
            <View style={tailwind`flex-row items-center`}>
              <Ionicons name="exit-outline" size={24} color="black" />
              <Text style={tailwind`ml-4 font-bold text-lg text-base`}>Sign Out</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
