import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { get, post } from "@/helpers/api";  // Assuming you have a `post` helper like `get`
import { router } from "expo-router";

interface BusProps {
  _id: string;
  busName: string;
  email: string;
  busNumber: string;
}

const AddAnnouncementScreen = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [currentBus, setCurrentBus] = useState<BusProps>();
  const [isLoading, setIsLoading] = useState(false);  // Optional: To show loading state during publish

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

  const handlePublish = async () => {
    if (!title || !message) {
      Alert.alert("Validation Error", "Title and message are required.");
      return;
    }

    if (!currentBus?._id) {
      Alert.alert("Error", "Bus information not found.");
      return;
    }

    const announcementData = {
      busId: currentBus._id,  // Using the bus ID from the fetched bus profile
      title,
      message,
    };

    setIsLoading(true);  // Set loading state to true before making the API call

    try {
      const response = await post(`/notifications`, announcementData);
      Alert.alert("Success", "Announcement published successfully.");
      setTitle("");
      setMessage("");
      router.push('/(routes)/announcement');  // Redirect to the announcement screen after publishing
    } catch (error) {
      console.error("Error publishing announcement:", error);
      Alert.alert("Error", "Failed to publish the announcement.");
    } finally {
      setIsLoading(false);  // Turn off loading state after API call completes
    }
  };

  return (
    <View className='flex-1 bg-gray-100 px-4 py-4'>
      <ScrollView className='pt-4 pb-24'>
        <Text className='text-lg font-bold mb-4'>Add new announcement</Text>

        {/* Announcement Preview */}
        <View className='bg-white rounded-lg shadow-md p-4 mb-6'>
          <View className='flex-row items-center mb-2 gap-2'>
            <Ionicons name="bus-outline" size={24} color="blue" className='mr-2' />
            <Text className='text-lg font-bold'>{currentBus?.busName || "Bus Name"}</Text>
          </View>
          {/* <View className='flex-row items-center mb-2'>
            <Ionicons name="time-outline" size={18} color="gray" className='mr-1' />
            <Text className='text-sm text-gray-600'>6:00 AM</Text>
          </View> */}
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
          style={{
            backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 40, alignSelf: 'flex-end', width: '50%',
          }}
          onPress={handlePublish}
          disabled={isLoading}  // Disable the button while loading
        >
          <Text className='text-center text-white font-bold'>{isLoading ? "Publishing..." : "Publish"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddAnnouncementScreen;
