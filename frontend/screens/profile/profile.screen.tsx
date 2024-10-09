import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import tailwind from "tailwind-react-native-classnames";

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={tailwind`flex-1 bg-gray-100`}>
      <ScrollView style={tailwind`flex-1 p-4`}>
        {/* Profile Image */}
        <View style={tailwind`flex items-center mb-4`}>
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/women/44.jpg",
            }}
            style={tailwind`w-24 h-24 rounded-full mb-2`}
          />
          <Text style={tailwind`text-lg font-bold`}>Randini Maliksha</Text>
          <Text style={tailwind`text-gray-500`}>randi@gmail.com</Text>
        </View>

        {/* Options */}
        <View style={tailwind`mt-8`}>
          <TouchableOpacity
            style={tailwind`flex-row items-center justify-between p-4 bg-white rounded-lg mb-2`}
          >
            <View style={tailwind`flex-row items-center`}>
              <Ionicons name="location-outline" size={24} color="black" />
              <Text style={tailwind`ml-4 text-lg`}>My Locations</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tailwind`flex-row items-center justify-between p-4 bg-white rounded-lg mb-2`}
          >
            <View style={tailwind`flex-row items-center`}>
              <Ionicons name="calendar-outline" size={24} color="black" />
              <Text style={tailwind`ml-4 text-lg`}>Booking History</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tailwind`flex-row items-center justify-between p-4 bg-white rounded-lg mb-2`}
          >
            <View style={tailwind`flex-row items-center`}>
              <Ionicons name="settings-outline" size={24} color="black" />
              <Text style={tailwind`ml-4 text-lg`}>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tailwind`flex-row items-center justify-between p-4 bg-white rounded-lg mb-2`}
          >
            <View style={tailwind`flex-row items-center`}>
              <Ionicons name="exit-outline" size={24} color="black" />
              <Text style={tailwind`ml-4 text-lg`}>Sign Out</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
