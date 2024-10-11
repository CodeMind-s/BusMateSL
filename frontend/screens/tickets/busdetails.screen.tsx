import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { get } from "@/helpers/api";
import { TicketContext } from "@/contexts/TicketContext";
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

const BusDetailsScreen = ({ id }: { id: string | string[] }) => {
  const context = useContext(TicketContext);

  if (!context) {
    throw new Error("TicketContext must be used within a MyProvider");
  }

  const { setDate, setGender } = context;
  const [scheduleData, setScheduleData] = useState<SchdeuleProps>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState<"Male" | "Female">();
  const [error, setError] = useState<string>("");

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 14);

  useEffect(() => {
    const fetchBus = async () => {
      const response = await get(`schedules/${id}`);
      setScheduleData(response.data as SchdeuleProps);
    };
    fetchBus();
  }, []);

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
    setDate(currentDate.toISOString().split("T")[0]);
  };

  const renderAmenities = (amenities: AmenitiesProps) => {
    return Object.entries(amenities)
      .filter(([key, value]) => value === true)
      .map(([key]) => key.toUpperCase())
      .join(" | ");
  };

  const handleConfirm = () => {
    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }

    if (!selectedGender) {
      setError("Please select a gender.");
      return;
    }

    setError(""); // Clear error if everything is fine
    router.push({
      pathname: "/tickets/bus-seating/[id]",
      params: { id: scheduleData?._id ?? '' },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView>
        <View className="bg-white m-5 p-5 rounded-lg shadow-md">
          <View className="flex flex-row gap-2 items-center mb-3">
            <View className="w-[35px] h-[35px] bg-primary rounded-full flex items-center z-10 justify-around">
              <Ionicons name="bus" size={18} color="white" />
            </View>
            <Text className="text-lg font-bold">
              {scheduleData?.bus.busNumber}
            </Text>
          </View>
          <View className="flex gap-y-1">
            <View className="flex flex-row items-center gap-x-1">
              <Ionicons
                name="information-circle-outline"
                size={18}
                color="gray"
              />
              <Text className="text-gray-500">
                {scheduleData?.bus.amenities
                  ? renderAmenities(scheduleData.bus.amenities)
                  : "No amenities available"}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-1">
              <Ionicons name="star-outline" size={18} color="gray" />
              <Text className="my-1 text-gray-500">5 ratings</Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center my-4">
            <View className="flex">
              <Text className="text-base text-primary font-bold">
                {scheduleData?.startTime}
              </Text>
              <Text className="text-base font-normal">
                {scheduleData?.startLocation}
              </Text>
            </View>
            <View className="w-[45px] h-[45px] bg-primary rounded-full flex items-center z-10 justify-around">
              <Ionicons name="trail-sign" size={20} color="white" />
            </View>
            <View className="flex">
              <Text className="text-base text-primary font-bold">
                {scheduleData?.endTime}
              </Text>
              <Text className="text-base font-normal text-left">
                {scheduleData?.endLocation}
              </Text>
            </View>
          </View>

          <Text className="text-sm text-gray-500 mb-2">Select Date</Text>
          <TouchableOpacity
            className="bg-gray-100 p-3 rounded-md border border-gray-300 "
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
              minimumDate={new Date()}
              maximumDate={maxDate}
              onChange={onDateChange}

            />
          )}

          <View className="mt-4">
            <Text className="text-sm text-gray-500 mb-2">Select Gender</Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className={`flex p-3 w-[50%] rounded-md border mr-2 ${selectedGender === "Male"
                  ? "bg-blue-500 border-blue-500"
                  : "bg-gray-100 border-gray-300"
                  }`}
                onPress={() => {
                  setSelectedGender("Male");
                  setGender("Male");
                }}
              >
                <View className="flex flex-row gap-1 items-center">
                  <Ionicons
                    name="male"
                    size={20}
                    color={selectedGender === "Male" ? "white" : "gray"}
                  />
                  <Text
                    className={`text-center ${selectedGender === "Male"
                      ? "text-white"
                      : "text-gray-500"
                      }`}
                  >
                    Male
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex p-3 w-[50%] rounded-md border ${selectedGender === "Female"
                  ? "bg-pink-500 border-pink-500"
                  : "bg-gray-100 border-gray-300"
                  }`}
                onPress={() => {
                  setSelectedGender("Female");
                  setGender("Female");
                }}
              >
                <View className="flex flex-row gap-1 items-center">
                  <Ionicons
                    name="female"
                    size={20}
                    color={selectedGender === "Female" ? "white" : "gray"}
                  />
                  <Text
                    className={`text-center ${selectedGender === "Female"
                      ? "text-white"
                      : "text-gray-500"
                      }`}
                  >
                    Female
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {error ? (
            <Text className="text-red-500 text-center my-3">{error}</Text>
          ) : null}

          <View className="flex flex-row my-5 justify-between items-center">
            <Text className="text-gray-500 text-base font-normal text-center mt-4">
              Ticket Price:
            </Text>
            <Text className="text-blue-500 text-3xl font-bold text-center mt-4">
              LKR {scheduleData?.price}.00
            </Text>
          </View>

          <View className="flex-row justify-between">
            <TouchableOpacity
              className="flex-1 bg-white p-3 rounded-md border border-red-500 mr-2"
              onPress={() => router.back()}
            >
              <Text className="text-center  text-red-500">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-blue-500 p-3 rounded-md"
              onPress={handleConfirm}
            >
              <Text className="text-center text-white">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusDetailsScreen;
