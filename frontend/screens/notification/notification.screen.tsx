import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const notificationsData = [
  { id: '1', route: 'BEL2247-Kaduwela-Galle', message: 'Delayed 1h due to service', time: '1 min ago', read: false },
  { id: '2', route: 'BBC1218-Kaduwela-Mathara', message: 'Cancelled 11.00 a.m trip', time: '38 min ago', read: false },
  { id: '3', route: 'ABC0011-Kaduwela-Kiribathgoda', message: 'Accidented', time: 'Yesterday', read: true },
  { id: '4', route: 'BEL2247-Kaduwela-Galle', message: 'Delayed 1h due to service', time: '1 min ago', read: true },
];

const NotificationScreen = () => {
  const [showRead, setShowRead] = useState(false);

  const toggleReadUnread = () => {
    setShowRead(!showRead);
  };

  const deleteAllNotifications = () => {
    // Implement delete all notifications functionality here
  };

  const renderNotificationItem = ({ item }: { item: { id: string; route: string; message: string; time: string; read: boolean } }) => (
    <TouchableOpacity style={{ flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
        <Ionicons name="bus" size={24} color="#007bff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.route}</Text>
        <Text>{item.message}</Text>
        <Text style={{ color: '#888' }}>{item.time}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#888" />
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

      {/* Notification List */}
      <FlatList
        data={notificationsData.filter(notification => notification.read === showRead)}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
      />

      {/* Delete All Button */}
      <TouchableOpacity onPress={deleteAllNotifications} style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ color: '#007bff' }}>Delete all</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationScreen;
