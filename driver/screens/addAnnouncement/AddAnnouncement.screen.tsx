import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const AddAnnouncementScreen = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <View className='flex-1 bg-gray-100 px-4 py-4'>
      {/* Header */}
      <View className='bg-gray-900 p-4 rounded-b-2xl items-center'>
        <Text className='text-2xl font-bold text-white'>Announcements</Text>
      </View>

      <ScrollView className='pt-4 pb-24'>
        <Text className='text-lg font-bold mb-4'>Add new announcement</Text>

        {/* Announcement Preview */}
        <View className='bg-white rounded-lg shadow-md p-4 mb-6'>
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
          <View className='flex-row items-center'>
            <Ionicons name="star-outline" size={18} color="gray" className='mr-1' />
            <Text className='text-sm text-gray-600'>4.5 ratings</Text>
          </View>
        </View>

        {/* Title Input */}
        <Text className='font-bold text-gray-700 mb-1'>Title</Text>
        <TextInput
          className='border p-2 rounded-lg border-gray-300 mb-4'
          placeholder="Your title"
          value={title}
          onChangeText={setTitle}
        />

        {/* Message Input */}
        <Text className='font-bold text-gray-700 mb-1'>Message</Text>
        <TextInput
          className='border p-2 rounded-lg border-gray-300 mb-4 h-32'
          placeholder="Description"
          value={message}
          onChangeText={setMessage}
          multiline
        />

        {/* Publish Button */}
        <TouchableOpacity
            style={{backgroundColor: '#007BFF',padding: 15,borderRadius: 8,alignItems: 'center',marginTop: 40,alignSelf: 'flex-end',width: '50%', // Set the width to 50% or any appropriate width
          }}
          onPress={() => {
            // Handle publish action here
          }}
        >
          <Text className='text-center text-white font-bold'>Publish</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddAnnouncementScreen;
