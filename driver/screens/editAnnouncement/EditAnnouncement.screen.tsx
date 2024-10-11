import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { get, put } from "@/helpers/api";  // Assuming you have a `put` helper for updates
import { useLocalSearchParams, useRouter } from "expo-router";  // Import useSearchParams

interface BusProps {
    _id: string;
    busName: string;
    email: string;
    busNumber: string;
}

interface AnnouncementProps {
    _id: string;  // Include the announcement ID
    title: string;
    message: string;
}

const EditAnnouncementScreen = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [currentBus, setCurrentBus] = useState<BusProps>();
    const [announcementId, setAnnouncementId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);  // Optional: To show loading state during publish
    const router = useRouter();
    const { id } = useLocalSearchParams();  // Get the announcement ID from the search parameters

    useEffect(() => {
        const fetchBus = async () => {
            try {
                const response = await get(`buses/profile`);
                setCurrentBus(response.data as BusProps);
            } catch (error) {
                console.error("Error fetching bus profile:", error);
            }
        };

        const fetchAnnouncement = async (id: string) => {
            try {
                const response = await get(`/notifications/${id}`);  // Fetch the announcement data by ID
                const announcementData = response.data as AnnouncementProps;
                setTitle(announcementData.title);
                setMessage(announcementData.message);
                setAnnouncementId(id);
            } catch (error) {
                console.error("Error fetching announcement:", error);
                Alert.alert("Error", "Failed to fetch announcement data.");
            }
        };

        fetchBus();

        // Check if id exists before fetching the announcement
        if (id) {
            fetchAnnouncement(id as string);
        }
    }, [id]);  // Run effect when `id` changes

    const handleUpdate = async () => {
        if (!title || !message) {
            Alert.alert("Validation Error", "Title and message are required.");
            return;
        }

        if (!announcementId) {
            Alert.alert("Error", "Announcement information not found.");
            return;
        }

        const announcementData = {
            title,
            message,
        };

        setIsLoading(true);  // Set loading state to true before making the API call

        try {
            await put(`/notifications/${announcementId}`, announcementData);  // Update the announcement
            Alert.alert("Success", "Announcement updated successfully.");
            router.push('/(routes)/announcement');  // Redirect to the announcement screen after publishing
        } catch (error) {
            console.error("Error updating announcement:", error);
            Alert.alert("Error", "Failed to update the announcement.");
        } finally {
            setIsLoading(false);  // Turn off loading state after API call completes
        }
    };

    return (
        <View className='flex-1 bg-gray-100 px-4 py-4'>
            <ScrollView className='pt-4 pb-24'>
                <Text className='text-lg font-bold mb-4'>Edit Announcement</Text>

                {/* Announcement Preview */}
                <View className='bg-white rounded-lg shadow-md p-4 mb-6'>
                    <View className='flex-row items-center mb-2 gap-2'>
                        <Ionicons name="bus-outline" size={24} color="blue" className='mr-2' />
                        <Text className='text-lg font-bold'>{currentBus?.busName || "Bus Name"}</Text>
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

                {/* Update Button */}
                <TouchableOpacity
                    style={{
                        backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 40, alignSelf: 'flex-end', width: '50%',
                    }}
                    onPress={handleUpdate}
                    disabled={isLoading}  // Disable the button while loading
                >
                    <Text className='text-center text-white font-bold'>{isLoading ? "Updating..." : "Update"}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default EditAnnouncementScreen;
