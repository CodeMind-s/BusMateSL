import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tailwind from "tailwind-react-native-classnames";
import { router } from "expo-router";

const AnnouncementScreen = () => {
  return (
    <View style={tailwind`flex-1 bg-gray-100 px-4 py-4`}>
      {/* Header */}
      <View style={tailwind`bg-gray-900 p-4 rounded-b-2xl items-center`}>
        <Text style={tailwind`text-2xl font-bold text-white`}>Announcements</Text>
      </View>

      <ScrollView contentContainerStyle={tailwind`pt-4 pb-24`}>
        {/* Announcement Card */}
        <View style={tailwind`bg-white rounded-lg shadow-md p-4 mb-4`}>
          <View style={tailwind`flex-row items-center mb-2`}>
            <Ionicons name="bus-outline" size={24} color="blue" style={tailwind`mr-2`} />
            <Text style={tailwind`text-lg font-bold`}>Saravana Travels</Text>
          </View>
          <View style={tailwind`flex-row items-center mb-2`}>
            <Ionicons name="time-outline" size={18} color="gray" style={tailwind`mr-1`} />
            <Text style={tailwind`text-sm text-gray-600`}>6:00 AM</Text>
          </View>
          <View style={tailwind`flex-row items-center mb-2`}>
            <Ionicons name="information-circle-outline" size={18} color="gray" style={tailwind`mr-1`} />
            <Text style={tailwind`text-sm text-gray-600`}>Free WiFi | Full AC | USB Charging | Highway</Text>
          </View>
          <View style={tailwind`flex-row items-center mb-2`}>
            <Ionicons name="star-outline" size={18} color="gray" style={tailwind`mr-1`} />
            <Text style={tailwind`text-sm text-gray-600`}>4.5 ratings</Text>
          </View>

          {/* Description */}
          <View style={tailwind`mt-2`}>
            <Text style={tailwind`font-bold mb-1`}>Title</Text>
            <Text style={tailwind`text-gray-600`}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={tailwind`flex-row justify-between mt-4`}>
            <TouchableOpacity style={tailwind`border border-red-500 px-6 py-2 rounded-lg`}>
              <Text style={tailwind`text-red-500 font-bold`}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tailwind`bg-blue-500 px-6 py-2 rounded-lg`}>
              <Text style={tailwind`text-white font-bold`}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={tailwind`absolute bottom-8 right-8 bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg`}
        onPress={() => router.push("/(routes)/addAnnouncement")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default AnnouncementScreen;
