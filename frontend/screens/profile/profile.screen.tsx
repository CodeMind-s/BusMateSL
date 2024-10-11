import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import tailwind from "tailwind-react-native-classnames";
import * as Linking from 'expo-linking';
import { router } from "expo-router";
import { AuthContext } from "@/contexts/AuthContext";
import { get } from "@/helpers/api";


const ProfileScreen = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      'TicketContext or AuthContext must be used within a TicketProvider or AuthProvider'
    );
  }
  const { userEmail, name } = authContext;
  const navigation = useNavigation();

  const handleLogout = () => {
    // Show a confirmation alert before logging out
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          // Reset the context values to null
          if (authContext) {
            authContext.setId(undefined);
            authContext.setName(undefined);
            authContext.setUserEmail(undefined);
            authContext.setToken(undefined);
          }
          // Optionally, navigate back to the login screen or any other screen
          // For example, using react-navigation
          // navigation.navigate("Login");
        },
      },
    ]);
  };

  return (
    <View style={tailwind`flex-1 bg-gray-100`}>
      <ScrollView contentContainerStyle={tailwind`p-6`}>
        {/* Profile Image and Edit Icon */}
        <View style={tailwind`items-center mb-6`}>
          <View style={tailwind`relative`}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/34.jpg" }}
              style={tailwind`w-28 h-28 rounded-full border-4 border-white`}
            />
            <TouchableOpacity
              style={tailwind`absolute bottom-0 right-0 bg-white p-1 rounded-full`}
              onPress={() => router.push("/(routes)/editProfile")}
            >
              <Ionicons name="pencil-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={tailwind`text-lg font-bold text-black mt-4`}>{name}</Text>
          <Text style={tailwind`text-gray-500`}>{userEmail}</Text>
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
            onPress={() => router.push("/(routes)/login")}
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
