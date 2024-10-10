import { TicketContext } from "@/contexts/TicketContext";
import { get, post } from "@/helpers/api";
import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

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
  busNumber: string;
}

const CheckoutScreen = ({
  id,
  seat,
}: {
  id: string | string[];
  seat: string;
}) => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("TicketContext must be used within a TicketProvider");
  }
  const { date, gender } = context;

  const [scheduleData, setScheduleData] = useState<SchdeuleProps>();
  useEffect(() => {
    const fetchBus = async () => {
      const response = await get(`schedules/${id}`);
      setScheduleData(response.data as SchdeuleProps);
    };
    fetchBus();
  }, []);

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleCheckout = async () => {
    // Handle the payment logic here
    console.log("Payment details =>", {
      name,
      cardNumber,
      cvv,
      expiry,
    });

    try {
      const response = await post("booking", {
        user: "6702c409079a4411bf88958b",
        schedule: id,
        seatNumber: seat,
        gender: gender,
        bookedDate: date,
      });
      // Assert the type of booking.data
      const bookingData = response.data as { _id: string };

      // Redirect to the success screen
      router.push({
        pathname: "/tickets/confirmation/[id]",
        params: { id: bookingData._id },
      });
    } catch (error) {
      // generate toast here
      console.error("Error during booking:", error);
      // Handle error appropriately, e.g., show an alert or notification
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      {/* Trip Summary */}
      <View className="bg-white p-4 rounded-lg mb-4">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="font-semibold">{scheduleData?.bus.busNumber}</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-gray-400">{date}</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="font-bold text-lg">{scheduleData?.startTime}</Text>
            <Text className="text-gray-400">{scheduleData?.startLocation}</Text>
          </View>
          <View>
            <Text className="font-bold text-lg">{scheduleData?.endTime}</Text>
            <Text className="text-gray-400">{scheduleData?.endLocation}</Text>
          </View>
        </View>

        <View className="border-t border-gray-200 pt-4">
          <View className="flex-row justify-between">
            <Text className="font-bold text-lg">Total</Text>
            <Text className="font-bold text-lg text-blue-500">
              LKR {scheduleData?.price}.00
            </Text>
          </View>
        </View>
      </View>

      {/* Payment Method */}
      <View className="bg-white p-4 rounded-lg">
        <Text className="font-semibold mb-4">Payment method</Text>

        {/* Name on card */}
        <View className="mb-4">
          <Text className="text-gray-500">Name on card</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Olivia Rhye"
            value={name}
            onChangeText={setName}
          />
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
        </View>

        {/* CVV and Expiry */}
        <View className="flex-row justify-between">
          <View className="w-1/2 mr-2">
            <Text className="text-gray-500">CVV</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="•••"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              secureTextEntry
            />
          </View>
          <View className="w-1/2">
            <Text className="text-gray-500">Expiry</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="MM / YYYY"
              value={expiry}
              onChangeText={setExpiry}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-col gap-2 justify-between mt-6">
        <TouchableOpacity
          className="bg-blue-500 py-3 px-6 rounded-lg"
          onPress={handleCheckout}
        >
          <Text className="text-white text-center font-semibold">Pay now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-100 border border-red-400 py-3 px-6 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-red-500 text-center font-semibold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
