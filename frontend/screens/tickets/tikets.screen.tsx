import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { get, post } from "@/helpers/api";
import { Ionicons } from "@expo/vector-icons";

interface SchdeuleProps {
  _id: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  price: number;
  bus: BusProps;
}

interface BusProps {
  _id: string;
  name: string;
  busNumber: string;
  rating: number;
  amenities: AmenitiesProps;
}

interface AmenitiesProps {
  freewifi: boolean;
  AC: boolean;
  usbCharging: boolean;
  tv: boolean;
  water: boolean;
  cctv: boolean;
  gps: boolean;
}

const TicketsScreen = () => {
  const [scheduleData, setScheduleData] = useState<SchdeuleProps[]>([]);
  useEffect(() => {
    const fetchBuses = async () => {
      const response = await post("schedules/location", {
        startLocation: "Jaffna",
        endLocation: "Colombo",
      });
      setScheduleData(response.data as SchdeuleProps[]);
    };
    fetchBuses();
  }, []);

  // Helper function to format the amenities
  const renderAmenities = (amenities: AmenitiesProps) => {
    return Object.entries(amenities)
      .filter(([key, value]) => value === true) // Only show the amenities that are available
      .map(([key]) => key.toUpperCase()) // Capitalize the first letter of the key
      .join(" | "); // Join them with a comma for better readability
  };

  return (
    <View>
      {/* Search Inputs */}
      <View className="-mt-5 p-5 h-[] w-full pt-2 bg-Secondary rounded-b-3xl flex">
        <View className="flex flex-row justify-center">
          <View className="w-full flex my-4">
            <TextInput
              // value={from}
              // onChangeText={(text) => setFrom(text)}
              placeholder="Departure Point"
              className="h-12 bg-white rounded-lg px-4 mb-4"
            />

            <TextInput
              // value={to}
              // onChangeText={(text) => setTo(text)}
              placeholder="Destination Point"
              className="h-12 bg-white rounded-lg px-4"
            />
          </View>
        </View>
      </View>

      {/* Recommended Buses */}
      <Text className="text-lg font-bold m-5" > Recommended Buses</Text >
      <ScrollView>
        {scheduleData.map((schedule, index) => (
          <View key={index} className="bg-gray-200 mx-5 mb-4 p-5 rounded-lg">
            <View className="flex-row justify-between items-center mb-3">
              <View className="flex flex-row gap-2 items-center">
                <View className="w-[35px] h-[35px] bg-primary rounded-full flex items-center z-10 justify-around">
                  <Ionicons name="bus" size={18} color="white" />
                </View>
                <Text className="text-xl font-semibold">
                  {schedule.bus.busNumber}
                </Text>
              </View>
              <Text className="text-2xl font-extrabold text-primary">
                LKR {schedule.price}.00
              </Text>
            </View>
            <View className="flex gap-y-1">
              <View className="flex flex-row items-center gap-x-1">
                <Ionicons name="time" size={18} color="gray" />
                <Text className="my-1 text-gray-500">
                  {schedule.startTime} - {schedule.endTime}
                </Text>
              </View>
              <View className="flex flex-row items-center gap-x-1">
                <Ionicons name="information-circle-outline" size={18} color="gray" />
                <Text className="text-gray-500">{renderAmenities(schedule.bus.amenities)}</Text>
              </View>
              <View className="flex flex-row items-center gap-x-1">
                <Ionicons name="star-outline" size={18} color="gray" />
                <Text className="my-1 text-gray-500">5 ratings</Text>
              </View>
            </View>
            <TouchableOpacity
              className="bg-primary p-3 rounded-md mt-2"
              onPress={() =>
                router.push({
                  pathname: "/tickets/bus-details/[id]",
                  params: { id: schedule._id },
                })
              }
            >
              <Text className="text-white text-center font-semibold">Choose Bus</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TicketsScreen;
