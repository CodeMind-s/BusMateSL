import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

const AnnouncementScreen = () => {
  return (
    <View className='flex-1 bg-gray-100 px-4 py-4'>
      {/* Header */}
      <View className='bg-gray-900 p-4 rounded-b-2xl items-center'>
        <Text className='text-2xl font-bold text-white'>Announcements</Text>
      </View>

      <ScrollView className='pt-4 pb-24'>
        {/* Announcement Card */}
        <View className='bg-white rounded-lg shadow-md p-4 mb-4'>
          <View className='flex-row items-center mb-2'>
            <Ionicons name="bus-outline" size={24} color="blue" className='mr-2' />
            <Text className='text-lg font-bold'>Saravana Travels</Text>
          </View>
          <View className='flex-row items-center mb-2'>
            <Ionicons name="time-outline" size={18} color="gray" className='mr-1' />
            <Text className='text-sm text-gray-600'>6:00 AM</Text>
          </View>
          <View className='flex-row items-center mb-2'>
            <Ionicons name="information-circle-outline" size={18} color="gray" className='mr-1' />
            <Text className='text-sm text-gray-600'>Free WiFi | Full AC | USB Charging | Highway</Text>
          </View>
          <View className='flex-row items-center mb-2'>
            <Ionicons name="star-outline" size={18} color="gray" className='mr-1' />
            <Text className='text-sm text-gray-600'>4.5 ratings</Text>
          </View>

          {/* Description */}
          <View className='mt-2'>
            <Text className='font-bold mb-1'>Title</Text>
            <Text className='text-gray-600'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </Text>
          </View>

          {/* Action Buttons */}
          <View className='flex-row justify-between mt-4'>
            <TouchableOpacity className='border border-red-500 px-6 py-2 rounded-lg'>
              <Text className='text-red-500 font-bold'>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity className='bg-blue-500 px-6 py-2 rounded-lg'>
              <Text className='text-white font-bold'>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className='absolute bottom-8 right-8 bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg'
        onPress={() => router.push("/(routes)/addAnnouncement")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default AnnouncementScreen;
