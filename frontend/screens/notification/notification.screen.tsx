import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { get } from '@/helpers/api';

interface BusProps {
  _id: string;
  busName: string;
  busNumber: string;
  from: string;
  to: string;
}

interface NotificationProps {
  _id: string;
  busId: BusProps;
  title: string;
  message: string;
  createdAt: string;
}

const NotificationScreen = () => {
  const [showRead, setShowRead] = useState(false);
  const [notificationsData, setNotificationsData] = useState<NotificationProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await get(`notifications`);
      setNotificationsData(response.data as NotificationProps[]);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Function to handle pull-to-refresh action
  const onRefresh = async () => {
    setRefreshing(true);  // Set the refreshing state to true
    await fetchNotifications();  // Fetch the latest notifications
    setRefreshing(false);  // Stop the refreshing spinner
  };

  const toggleReadUnread = () => {
    setShowRead(!showRead);
  };

  const deleteAllNotifications = () => {
    // Implement delete all notifications functionality here
  };

  const renderNotificationItem = ({ item }: { item: NotificationProps }) => (
    <TouchableOpacity>
      <View className="flex rounded-lg bg-gray-100 mt-5 mx-3 p-3">
        <View className="flex flex-row gap-2 items-center mb-3">
          <View className="w-[35px] h-[35px] bg-primary rounded-full flex items-center z-10 justify-around">
            <Ionicons name="bus" size={18} color="white" />
          </View>
          <Text className="font-bold text-lg text-primary mb-1">{item.busId.busName}</Text>
        </View>

        <Text className="text-primary text-lg font-semibold">{item.title}</Text>
        <Text className="text-gray-600 text- mb-4">{item.message}</Text>
        <View className="flex flex-row items-center gap-2">
          <Ionicons name="calendar" size={20} color="#888" />
          <Text className="text-gray-400 font-semibold">{new Date(item.createdAt).toLocaleString()}</Text>
        </View>
      </View>
      {/*  */}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 20, paddingHorizontal: 20 }}>
      {/* Read/Unread Toggle */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 }}>
        <TouchableOpacity onPress={() => setShowRead(false)}>
          <Text style={{ color: !showRead ? '#000' : '#888', fontWeight: !showRead ? 'bold' : 'normal' }}>Unread</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowRead(true)}>
          <Text style={{ color: showRead ? '#000' : '#888', fontWeight: showRead ? 'bold' : 'normal' }}>Read</Text>
        </TouchableOpacity>
      </View>

      {/* Notification List with pull-to-refresh */}
      <FlatList
        data={notificationsData}
        renderItem={renderNotificationItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}  // This is triggered when the user pulls down
          />
        }
      />

      {/* Delete All Button */}
      <TouchableOpacity onPress={deleteAllNotifications} style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ color: '#007bff' }}>Delete all</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationScreen;
