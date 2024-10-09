import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import tailwind from "tailwind-react-native-classnames";

const notificationsData = [
  {
    id: "1",
    type: "unread",
    busNumber: "BEL2247-Kaduwela-Galle",
    description: "Delayed 1h due to service",
    time: "1 min ago",
    tickets: 2,
  },
  {
    id: "2",
    type: "unread",
    busNumber: "BBC1218-Kaduwela-Mathara",
    description: "Cancelled 11.00 a.m trip",
    time: "38 min ago",
    tickets: 1,
  },
  {
    id: "3",
    type: "read",
    busNumber: "ABC0011-Kaduwela-Kiribathgoda",
    description: "Accidented",
    time: "Yesterday",
    tickets: 3,
  },
  {
    id: "4",
    type: "read",
    busNumber: "BEL2247-Kaduwela-Galle",
    description: "Delayed 1h due to service",
    time: "1 min ago",
    tickets: 2,
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState("unread"); // 'read' or 'unread'

  const filteredNotifications = notificationsData.filter(
    (notification) => notification.type === filter
  );

  return (
    <View style={tailwind`flex-1 bg-gray-100`}>
      {/* Read/Unread Filter */}
      <View style={tailwind`flex-row justify-around bg-gray-200 py-3`}>
        <TouchableOpacity onPress={() => setFilter("read")}>
          <Text
            style={tailwind`text-base ${
              filter === "read" ? "text-blue-600" : "text-black"
            }`}
          >
            Read
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter("unread")}>
          <Text
            style={tailwind`text-base ${
              filter === "unread" ? "text-black" : "text-gray-500"
            }`}
          >
            Unread
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={tailwind`flex-row justify-between items-center p-4 border-b border-gray-200`}
          >
            <View style={tailwind`flex-row items-center`}>
              <Ionicons name="bus" size={24} color="blue" />
              <View style={tailwind`ml-4`}>
                <Text style={tailwind`text-lg font-semibold`}>
                  {item.busNumber}
                </Text>
                <Text style={tailwind`text-sm text-gray-500`}>
                  {item.description}
                </Text>
                <Text style={tailwind`text-xs text-gray-400`}>{item.time}</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Delete All Button */}
      <TouchableOpacity
        style={tailwind`mt-4 p-4 bg-red-500 rounded-lg mx-4`}
        onPress={() => {
          // Add delete all functionality here
          alert("All notifications deleted");
        }}
      >
        <Text style={tailwind`text-white text-center`}>Delete all</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationScreen;
