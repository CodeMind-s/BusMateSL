import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { get } from "@/helpers/api";
import { TicketContext } from "@/contexts/TicketContext";

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

const BusDetailsScreen = ({ id }: { id: string | string[] }) => {
  const context = useContext(TicketContext);

  if (!context) {
    // Handle the case where the context is not available (shouldn't happen with a proper setup)
    throw new Error("TicketContext must be used within a MyProvider");
  }
  const { setDate, setGender } = context;
  const [scheduleData, setScheduleData] = useState<SchdeuleProps>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState<"Male" | "Female">();

  useEffect(() => {
    const fetchBus = async () => {
      const response = await get(`schedules/${id}`);
      setScheduleData(response.data as SchdeuleProps);
    };
    fetchBus();
  }, []);

  useEffect(() => {
    setDate(new Date().toISOString().split('T')[0]);
    // console.log(`new Date() => `, new Date());
  }, []);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
    setDate(currentDate.toISOString().split('T')[0]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Bus Details */}
      <View className="bg-white m-5 p-5 rounded-lg shadow-md">
        <Text className="text-lg font-bold">{scheduleData?.bus.busNumber}</Text>
        <Text className="my-2 text-gray-500">
          {scheduleData?.startTime} - {scheduleData?.endTime}
        </Text>
        <Text className="my-2 text-gray-500">Amenities print</Text>
        <Text className="my-2 text-gray-500">4.5 ratings</Text>

        {/* Time Information */}
        <View className="flex-row justify-between items-center my-4">
          <Text className="text-base font-bold">{scheduleData?.startTime}</Text>
          <View className="bg-white p-3 rounded-full border border-gray-300">
            <Text className="text-2xl">🚌</Text>
          </View>
          <Text className="text-base font-bold">{scheduleData?.endTime}</Text>
        </View>

        {/* Date Picker */}
        <Text className="text-sm text-gray-500 mb-2">Select Date</Text>
        <TouchableOpacity
          className="bg-gray-100 p-3 rounded-md border border-gray-300 mb-5"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className="text-base text-gray-500">
            {selectedDate.toISOString().split("T")[0]}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        {/* Gender Selection */}
        <View className="my-4">
          <Text className="text-sm text-gray-500 mb-2">Select Gender</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              className={`flex-1 p-3 rounded-md border mr-2 ${selectedGender === "Male"
                ? "bg-blue-500 border-blue-500"
                : "bg-gray-100 border-gray-300"
                }`}
              onPress={() => {
                setSelectedGender("Male");
                setGender("Male");
              }}
            >
              <Text
                className={`text-center ${selectedGender === "Male" ? "text-white" : "text-gray-500"
                  }`}
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 p-3 rounded-md border ${selectedGender === "Female"
                ? "bg-blue-500 border-blue-500"
                : "bg-gray-100 border-gray-300"
                }`}
              onPress={() => {
                setSelectedGender("Female");
                setGender("Female");
              }}
            >
              <Text
                className={`text-center ${selectedGender === "Female" ? "text-white" : "text-gray-500"
                  }`}
              >
                Female
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Price */}
        <Text className="text-blue-500 text-xl font-bold text-center my-4">
          LKR {scheduleData?.price}.00
        </Text>

        <View className="flex-row justify-between">
          <TouchableOpacity
            className="flex-1 bg-white p-3 rounded-md border border-red-500 mr-2"
            onPress={() => router.back()}
          >
            <Text className="text-center text-red-500">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-blue-500 p-3 rounded-md"
            onPress={() =>
              router.push({
                pathname: "/tickets/bus-seating/[id]",
                params: { id: scheduleData?._id ?? '' },
              })
            }
          >
            <Text className="text-center text-white">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BusDetailsScreen;
