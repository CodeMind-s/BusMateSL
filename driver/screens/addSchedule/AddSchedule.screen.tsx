import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import BusDetailsCard from "@/components/busDetailsCard/BusDetailsCard";
import { router } from "expo-router";
import { get, post } from "@/helpers/api";

interface BusProps {
  _id: string;
  to: string;
  from: string;
}

const AddScheduleScreen = () => {
  const [currentBus, setCurrentBus] = useState<BusProps>();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    startTime: "",
    endTime: "",
    date: "",
  });

  const allLocations = [currentBus?.from, currentBus?.to]; // all possible locations
  const times = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
  ]; // corrected AM/PM typo

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const response = await get(`buses/profile`);
        setCurrentBus(response.data as BusProps);
      } catch (error) {
        console.error("Error fetching bus profile:", error);
      }
    };
    fetchBus();
  }, []);

  const handleSelect = (value: string) => {
    if (selectedField === "from") {
      // When selecting a new start location, also change the end location if it matches
      setFormData((prevData) => ({
        ...prevData,
        from: value,
        to: prevData.to === value ? "" : prevData.to, // Clear 'to' if it matches the new 'from'
      }));
    } else if (selectedField === "to") {
      // When selecting a new end location, also change the start location if it matches
      setFormData((prevData) => ({
        ...prevData,
        to: value,
        from: prevData.from === value ? "" : prevData.from, // Clear 'from' if it matches the new 'to'
      }));
    } else {
      // Just set the time
      setFormData({ ...formData, [selectedField]: value });
    }
    setModalVisible(false);
  };

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);

    // Format the date properly to avoid time zone issues
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

    setFormData({ ...formData, date: formattedDate });
  };

  const handleSubmit = async () => {
    // Prepare data to send to the backend
    const scheduleData = {
      // bus: "6702d5d22f5aa58766a5fa1c", // Bus ID
      startLocation: formData.from,
      startTime: formData.startTime,
      endLocation: formData.to,
      endTime: formData.endTime,
      price: 1100, // Price
      date: formData.date, // Price
      status: "InComplete",
    };

    try {
      // Make POST request to create the schedule
      const response = await post(`schedules`, scheduleData);

      // Handle successful response
      Alert.alert("Success", "Schedule created successfully!");
      console.log("Schedule created:", response.data);
      // Optionally reset form after success
      setFormData({
        from: "",
        to: "",
        startTime: "",
        endTime: "",
        date: "",
      });
      router.push("/(tabs)/schedule");
    } catch (error) {
      // Handle error response
      Alert.alert("Error", "Failed to create schedule. Please try again.");
      console.error("Error creating schedule:", error);
    }
  };

  // Filter locations based on the selected start location
  const availableEndLocations = formData.from
    ? allLocations.filter((location) => location !== formData.from)
    : allLocations;

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="bg-swhite h-full">
        <View className="mt-5 flex justify-center px-5">
          <Text className="text-[21px] font-bold">Add New Schedule</Text>
        </View>
        <View className="mx-5 mb-5">
          <BusDetailsCard />
        </View>
        <View className="px-6 ">
          <Text className="text-[18px] my-2 font-semibold">From</Text>
          <View className="flex-row space-x-3 mb-2">
            <TouchableOpacity
              onPress={() => {
                setSelectedField("from");
                setModalVisible(true);
              }}
              className="flex-1 border border-gray-300 rounded h-12 justify-center px-2"
            >
              <Text>{formData.from || "Select Start Location"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedField("startTime");
                setModalVisible(true);
              }}
              className="flex-1 border border-gray-300 rounded h-12 justify-center px-2"
            >
              <Text>{formData.startTime || "Select Start Time"}</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-[18px] my-2 font-semibold">To</Text>
          <View className="flex-row space-x-3 mb-2">
            <TouchableOpacity
              onPress={() => {
                setSelectedField("to");
                setModalVisible(true);
              }}
              className="flex-1 border border-gray-300 rounded h-12 justify-center px-2"
              disabled={!formData.from} // Disable if no start location selected
            >
              <Text>{formData.to || "Select End Location"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedField("endTime");
                setModalVisible(true);
              }}
              className="flex-1 border border-gray-300 rounded h-12 justify-center px-2"
            >
              <Text>{formData.endTime || "Select End Time"}</Text>
            </TouchableOpacity>
          </View>

          {/* Date Input */}
          <Text className="text-[18px] my-2 font-semibold">Date</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="border border-gray-300 rounded h-12 justify-center px-2 mb-2"
          >
            <Text>{formData.date || "Select Date"}</Text>
          </TouchableOpacity>

          {/* DateTimePicker */}
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <View className="relative w-full h-full my-4">
            <TouchableOpacity
              onPress={handleSubmit} // Call handleSubmit on press
              className="absolute right-0 top-0 w-[40%] h-10 flex justify-center items-center bg-primary rounded-lg"
            >
              <Text className="text-white text-[18px]">Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal for dropdown */}
        {/* Modal for dropdown */}
        <Modal visible={modalVisible} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View className="bg-white w-4/5 rounded-lg p-5 max-h-50">
              <FlatList
                data={
                  selectedField === "from"
                    ? allLocations
                    : selectedField === "to"
                    ? availableEndLocations
                    : times // Use times for startTime and endTime
                }
                keyExtractor={(item, index) => (item ? item : index.toString())} // Use index as fallback if item is undefined
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item ?? "")} // Provide a fallback value if item is undefined
                    className="py-2"
                  >
                    <Text className="text-lg">{item}</Text>
                  </TouchableOpacity>
                )}
              />

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="mt-4 p-2 bg-red-500 rounded"
              >
                <Text className="text-center text-white">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
};

export default AddScheduleScreen;
