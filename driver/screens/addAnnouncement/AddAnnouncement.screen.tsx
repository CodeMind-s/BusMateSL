import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tailwind from "tailwind-react-native-classnames";

const AddAnnouncementScreen = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <View style={tailwind`flex-1 bg-gray-100 px-4 py-4`}>
      {/* Header */}
      <View style={tailwind`bg-gray-900 p-4 rounded-b-2xl items-center`}>
        <Text style={tailwind`text-2xl font-bold text-white`}>Announcements</Text>
      </View>

      <ScrollView contentContainerStyle={tailwind`pt-4 pb-24`}>
        <Text style={tailwind`text-lg font-bold mb-4`}>Add new announcement</Text>

        {/* Announcement Preview */}
        <View style={tailwind`bg-white rounded-lg shadow-md p-4 mb-6`}>
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
          <View style={tailwind`flex-row items-center`}>
            <Ionicons name="star-outline" size={18} color="gray" style={tailwind`mr-1`} />
            <Text style={tailwind`text-sm text-gray-600`}>4.5 ratings</Text>
          </View>
        </View>

        {/* Title Input */}
        <Text style={tailwind`font-bold text-gray-700 mb-1`}>Title</Text>
        <TextInput
          style={tailwind`border p-2 rounded-lg border-gray-300 mb-4`}
          placeholder="Your title"
          value={title}
          onChangeText={setTitle}
        />

        {/* Message Input */}
        <Text style={tailwind`font-bold text-gray-700 mb-1`}>Message</Text>
        <TextInput
          style={tailwind`border p-2 rounded-lg border-gray-300 mb-4 h-32`}
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
          <Text style={tailwind`text-center text-white font-bold`}>Publish</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddAnnouncementScreen;
