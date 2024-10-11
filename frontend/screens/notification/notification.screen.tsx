import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { get } from '@/helpers/api';

interface BusProps {
  _id: string;
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
    <TouchableOpacity style={{ flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
        <Ionicons name="bus" size={24} color="#007bff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.busId.busNumber} - {item.busId.from} to {item.busId.to}</Text>
        <Text>{item.message}</Text>
        <Text style={{ color: '#888' }}>{new Date(item.createdAt).toLocaleString()}</Text>
      </View>
      {/* <Ionicons name="chevron-forward" size={24} color="#888" /> */}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 20 }}>
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
