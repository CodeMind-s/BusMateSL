import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { get, del } from "@/helpers/api"; // Import the delete function

interface BusProps {
  _id: string;
  busName: string;
  email: string;
  busNumber: string;
}

interface AnnouncementProps {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
}

const AnnouncementScreen = () => {
  const [currentBus, setCurrentBus] = useState<BusProps>();
  const [announcements, setAnnouncements] = useState<AnnouncementProps[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const response = await get(`buses/profile`);
        const busData = response.data as BusProps;
        setCurrentBus(busData);
        // Fetch announcements after getting the bus info
        await fetchAnnouncements(busData._id);
      } catch (error) {
        console.error("Error fetching bus profile:", error);
        Alert.alert("Error", "Failed to fetch bus profile.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    const fetchAnnouncements = async (busId: string) => {
      try {
        const response = await get(`/notifications/bus-notification/${busId}`);
        setAnnouncements(response.data as AnnouncementProps[]);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        Alert.alert("Error", "Failed to fetch announcements.");
      }
    };

    fetchBus();
  }, []);

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US");
  };

  // Function to handle deletion of an announcement
  const handleDelete = async (announcementId: string) => {
    console.log(`announcementId => `, announcementId);
    Alert.alert(
      "Delete Announcement",
      "Are you sure you want to delete this announcement?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await del(`/notifications/${announcementId}`); // Call the delete endpoint
              setAnnouncements((prev) => prev.filter((ann) => ann._id !== announcementId)); // Update state to remove the deleted announcement
              Alert.alert("Success", "Announcement deleted successfully.");
            } catch (error) {
              console.error("Error deleting announcement:", error);
              Alert.alert("Error", "Failed to delete announcement.");
            }
          },
        },
      ]
    );
  };

  return (
    <View className='flex-1 bg-gray-100 px-4 py-4'>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
        <ScrollView className='pt-4 pb-24'>
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <View key={announcement._id} className='bg-white rounded-lg shadow-md p-4 mb-4'>
                <View className='flex-row items-center gap-2 mb-2'>
                  <Ionicons name="calendar" size={20} color="gray" className='mr-2' />
                  <Text className='text-md text-gray-500 font-bold'>{formatDate(announcement.createdAt)}</Text>
                </View>

                {/* Description */}
                <View className='mt-2'>
                  <Text className='font-bold mb-1 text-primary text-lg'>{announcement.title}</Text>
                  <Text className='text-gray-600'>{announcement.message}</Text>
                </View>

                {/* Action Buttons */}
                <View className='flex-row justify-between mt-4'>
                  <TouchableOpacity
                    className='border border-red-500 px-6 py-2 rounded-lg'
                    onPress={() => handleDelete(announcement._id)} // Call handleDelete with announcement ID
                  >
                    <Text className='text-red-500 font-bold'>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className='bg-blue-500 px-6 py-2 rounded-lg'
                    onPress={() => router.push(`/editAnnouncement?id=${announcement._id}`)} // Navigate to the edit screen with the announcement ID
                  >
                    <Text className='text-white font-bold'>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View className='bg-white rounded-lg shadow-md p-4 mb-4'>
              <Text className='text-gray-600'>No announcements available.</Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        className='absolute bottom-8 right-8 bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg'
        onPress={() => router.push("/(routes)/addAnnouncement")}
        accessibilityLabel="Add Announcement"
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default AnnouncementScreen;
