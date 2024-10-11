import { AuthContext } from "@/contexts/AuthContext";
import { TicketContext } from "@/contexts/TicketContext";
import { get, post } from "@/helpers/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import * as Notifications from "expo-notifications"; // Import expo-notifications
interface ScheduleProps {
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
  busName: string;
  busNumber: string;
}

// Configure the notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const CheckoutScreen = ({
  id,
  seat,
}: {
  id: string | string[];
  seat: string;
}) => {
  const context = useContext(TicketContext);
  const authContext = useContext(AuthContext);
  if (!context || !authContext) {
    throw new Error(
      "TicketContext or AuthContext must be used within a TicketProvider or AuthProvider"
    );
  }
  const { date, gender } = context;
  const { id: userId } = authContext;

  const [scheduleData, setScheduleData] = useState<ScheduleProps>();
  useEffect(() => {
    const fetchBus = async () => {
      const response = await get(`schedules/${id}`);
      setScheduleData(response.data as ScheduleProps);
    };
    fetchBus();
  }, [id]);

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    cardNumber: "",
    cvv: "",
    expiry: "",
  });

  // Request permissions for notifications
  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission not granted', 'Enable notifications to receive alerts.');
    }
  };

  // Function to show a local notification
  const showNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Booking Confirmed 📅",
        body: "Your booking has been successfully confirmed!",
      },
      trigger: { seconds: 1 }, // Show notification after 1 second
    });
  };

  const handleCheckout = async () => {
    setErrors({
      name: "",
      cardNumber: "",
      cvv: "",
      expiry: "",
    });

    let hasError = false;

    if (!name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Name is required" }));
      hasError = true;
    }
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cardNumber: "Card number must be 16 digits",
      }));
      hasError = true;
    }
    if (!cvv || !/^\d{3}$/.test(cvv)) {
      setErrors((prevErrors) => ({ ...prevErrors, cvv: "CVV must be 3 digits" }));
      hasError = true;
    }
    if (!expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expiry: "Expiry must be in MM/YY format",
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await post("booking", {
        user: userId,
        schedule: id,
        seatNumber: seat,
        gender: gender,
        bookedDate: date,
      });
      // console.log("Booking response =>", response);

      const bookingData = response.data as { _id: string };

      // Request notification permissions
      await requestPermissions();
      const { status } = await Notifications.getPermissionsAsync();
      if (status === 'granted') {
        // Show notification on successful booking
        showNotification();
      }

      // Redirect to the success screen
      router.push({
        pathname: "/tickets/confirmation/[id]",
        params: { id: bookingData._id },
      });
    } catch (error) {
      console.error("Error during booking:", error);
      Alert.alert("Booking Failed", "An error occurred during booking. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView className="flex-1 bg-gray-100 p-4">
          {/* Trip Summary */}
          <View className="bg-white p-4 rounded-lg mb-4">
            <View className="flex flex-row border-b pb-3 gap-2 border-gray-200 items-center">
              <Ionicons name="ticket-outline" size={20} color="gray" />
              <Text className="text-xl font-semibold text-gray-700 ">
                Trip Summary
              </Text>
            </View>
            <View className="flex-row justify-between items-center mt-3">
              <View className="flex flex-row gap-2 items-center mb-3">
                <View className="w-[35px] h-[35px] bg-primary rounded-full flex items-center z-10 justify-around">
                  <Ionicons name="bus" size={18} color="white" />
                </View>
                <Text className="text-lg font-bold">
                  {scheduleData?.bus.busName}
                </Text>
              </View>
              <View className="flex-row items-center gap-x-1">
                <Ionicons name="calendar" size={15} color="gray" />
                <Text className="text-gray-400 font-bold">{date}</Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center mb-4">
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

            <View className="border-t border-gray-200 pt-4">
              <View className="flex-row justify-between">
                <Text className="font-medium text-lg">Total</Text>
                <Text className="font-bold text-xl text-blue-500">
                  LKR {scheduleData?.price}.00
                </Text>
              </View>
            </View>
          </View>

          {/* Payment Method */}
          <View className="bg-white p-4 mb-4 rounded-lg">
            <Text className="font-semibold text-xl mb-1">Payment method</Text>
            <Text className="font- text-md mb-3 text-gray-400">
              Enter your card details
            </Text>

            {/* Name on card */}
            <View className="mb-4">
              <Text className="text-gray-500">Name on card</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
              {errors.name ? (
                <Text className="text-red-500 mt-1">{errors.name}</Text>
              ) : null}
            </View>

            {/* Card Number */}
            <View className="mb-4">
              <Text className="text-gray-500">Card number</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2 mt-1"
                placeholder="1234 1234 1234 1234"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
              />
              {errors.cardNumber ? (
                <Text className="text-red-500 mt-1">{errors.cardNumber}</Text>
              ) : null}
            </View>

            {/* CVV and Expiry */}
            <View className="flex-row justify-between">
              <View className="w-[48%]">
                <Text className="text-gray-500">CVV</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="•••"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  secureTextEntry
                />
                {errors.cvv ? (
                  <Text className="text-red-500 mt-1">{errors.cvv}</Text>
                ) : null}
              </View>
              <View className="w-[48%]">
                <Text className="text-gray-500">Expiry</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="MM/YY"
                  value={expiry}
                  onChangeText={setExpiry}
                />
                {errors.expiry ? (
                  <Text className="text-red-500 mt-1">{errors.expiry}</Text>
                ) : null}
              </View>
            </View>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity
            className="bg-primary p-2.5 mb-5 rounded-lg"
            onPress={handleCheckout}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Confirm Payment
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CheckoutScreen;
