import { TicketContext } from "@/contexts/TicketContext";
import { get } from "@/helpers/api";
import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

interface SeatProps {
  seatNumber: string;
  isBooked: boolean;
  gender: "Male" | "Female";
}

const BusSeatsScreen = ({ id }: { id: string | string[] }) => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("TicketContext must be used within a TicketProvider");
  }

  const { date } = context;
  // console.log(`date => `, date);

  const [seatData, setSeatData] = useState<SeatProps[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeatData = async () => {
      const response = await get(`schedules/seats/${id}/${date}`);
      setSeatData(response.data as SeatProps[]);
    };
    fetchSeatData();
  }, [id]);

  const getSeatStyle = (item: {
    seatNumber: string;
    gender: string | null;
  }) => {
    if (selectedSeat === item.seatNumber) {
      return "bg-green-500 text-white"; // Color for selected seat
    }

    if (item.gender === "Male") {
      return "bg-blue-500 text-white";
    }

    if (item.gender === "Female") {
      return "bg-pink-500 text-white";
    }

    return "bg-white border border-gray-300";
  };

  const handleSeatPress = (seatNumber: string) => {
    console.log("seatNumber =>", seatNumber);
    setSelectedSeat(seatNumber); // Update selected seat
  };

  const renderSeat = ({
    item,
  }: {
    item: { seatNumber: string; isBooked: boolean; gender: string | null };
  }) => (
    <TouchableOpacity
      className={`w-14 h-14 flex items-center justify-center m-2 rounded-lg ${getSeatStyle(
        item
      )}`}
      disabled={item.isBooked}
      onPress={() => handleSeatPress(item.seatNumber)}
    >
      <Text className="font-bold text-center">{item.seatNumber}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      {/* Legend */}
      <Text className="text-gray-500 font-medium mb-5 text-lg">Select your seat below:</Text>
      <View className="flex-row justify-around gap-5 items-center mb-4">
        <View className="flex-row items-center">
          <View className="w-4 h-4 rounded-full border border-gray-500 mr-2" />
          <Text className="text-gray-500">Available</Text>
        </View>
        <View className="flex flex-row px-1 py-1 gap-x-2 bg-slate-300 rounded-md">
          <View className="flex-row items-center">
            <View className="w-4 h-4 bg-blue-500 rounded-full mr-1" />
            <Text className="text-blue-500">Male</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-4 h-4 bg-pink-500 rounded-full mr-1" />
            <Text className="text-pink-500">Female</Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <View className="w-4 h-4 bg-green-500 rounded-full mr-1" />
          <Text className="text-green-500">Selected</Text>
        </View>
      </View>

      {/* Bus Front View */}
      <View className="flex-row justify-center items-center mb-4">
        <View className="px-4 py-2 bg-gray-400 rounded-md flex flex-row  items-center justify-center">
          <Text className="text-white font-bold">Bus Front</Text>
          {/* <Text className="text-white font-bold">⬆️</Text> */}
        </View>
      </View>

      {/* Seats Layout */}
      <FlatList
        data={seatData}
        renderItem={renderSeat}
        keyExtractor={(item, index) => index.toString()}
        numColumns={5} // Number of columns in the grid
        contentContainerStyle={{ alignItems: "center" }}
      />

      {/* Checkout Button */}
      <TouchableOpacity
        className="bg-blue-500 py-3 mt-4 mx-4 rounded-lg"
        onPress={() =>
          router.push({
            pathname: "/tickets/checkout/[id]/[seat]",
            params: { id: id as string, seat: selectedSeat ?? "" }, // Pass selected seat to the checkout
          })
        }
      >
        <Text className="text-white text-center text-lg font-bold">
          Checkout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BusSeatsScreen;
