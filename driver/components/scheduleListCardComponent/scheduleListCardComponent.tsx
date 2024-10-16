import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { get, put } from '@/helpers/api';
import { router } from "expo-router";

// Define the props interface
interface ScheduleListCardComponentProps {
  id: string; // Schedule ID should be required
  from: string;
  to: string;
  startTime: string;
  endTime: string;
  status: string; // Make status required
  btn: boolean;
}

// Define the functional component
const ScheduleListCardComponent: React.FC<ScheduleListCardComponentProps> = ({
  id,
  from,
  to,
  startTime,
  endTime,
  status,
  btn
}) => {
  // Function to update schedule status
  const onUpdateStatus = async (newStatus: string) => {
    try {
      const response = await put(`schedules/${id}`, {
        status: newStatus,
      });

      // Check for success
      if (response.status !== 200) {
        throw new Error("Failed to update schedule status");
      }

      console.log("Schedule updated:", response.data);
      Alert.alert("Success", `Schedule marked as ${newStatus}!`);

    } catch (error) {
      console.error("Error updating schedule status:", error);
      Alert.alert("Error", "Failed to update schedule status.");
    }
  };

  // Function to handle marking as complete
  const handleMarkAsInprogress = () => {
    onUpdateStatus("InProgress");
    router.push("/(tabs)/track-bus");
  };

  const handleMarkAsComplete = () => {
    onUpdateStatus("Complete");
  };

  return (
    <View className="py-3 mt-4 border border-gray-300 w-full rounded-2xl flex justify-around items-center">
      <View className="flex flex-row justify-center items-center">
        <View className="w-1/3 flex justify-center items-center">
          <Text className="font-semibold text-base">{startTime}</Text>
          <Text className="text-sm text-[#A1A1A1]">{from}</Text>
        </View>
        <View className="w-1/3 h-[2px] bg-tertiary flex justify-center items-center relative">
          <View className="w-[45px] h-[45px] bg-primary rounded-full flex items-center z-10 justify-around">
            <Ionicons name="bus" size={21} color="white" />
          </View>
          <View className="absolute top-1/2 left-0 h-[3px] w-full bg-gray-300"></View>
          <View className="absolute -top-[0.8px] rounded-full left-0 h-[6px] aspect-square bg-gray-300"></View>
          <View className="absolute -top-[0.8px] rounded-full right-0 h-[6px] aspect-square bg-gray-300"></View>
        </View>
        <View className="w-1/3 flex justify-center items-center">
          <Text className="font-semibold text-base">{endTime}</Text>
          <Text className="text-sm text-[#A1A1A1]">{to}</Text>
        </View>
      </View>
      {btn == true && status === "InComplete" && (
        <View className="mt-3">
          <TouchableOpacity
            className="w-full flex justify-center items-center border-green-500 border rounded-lg"
            onPress={handleMarkAsInprogress}
          >
            <Text className="text-sm font-semibold py-2 px-6 text-green-500">
              Start Route
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {btn == true && status === "InProgress" && (
        <View className="mt-3">
          <TouchableOpacity
            className="w-full flex justify-center items-center border-orange-500 border rounded-lg"
            onPress={handleMarkAsComplete}
          >
            <Text className="text-sm font-semibold py-2 px-6 text-orange-500">
              Mark as Complete
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ScheduleListCardComponent;
