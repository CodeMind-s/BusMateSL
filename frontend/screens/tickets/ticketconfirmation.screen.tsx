import { router } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { get } from "@/helpers/api";
import { Ionicons } from "@expo/vector-icons";
import { TicketContext } from "@/contexts/TicketContext";

interface BookingProps {
  _id: string;
  seatNumber: string;
  schedule: {
    startLocation: string;
    startTime: string;
    endLocation: string;
    endTime: string;
  };
  user: {
    name: string;
    email: string;
  };
  amount: number;
  status: string;
}

const TicketConfirmationScreen = ({ id }: { id: string | string[] }) => {
  // console.log("booking id", id);
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error(
      "TicketContext or AuthContext must be used within a TicketProvider or AuthProvider"
    );
  }
  const { date, gender } = context;
  const [bookingData, setBookingData] = useState<BookingProps>();
  // console.log(`bookingData => `, bookingData);
  useEffect(() => {
    const fetchBookingData = async () => {
      const response = await get(`booking/${id}`);
      setBookingData(response.data as BookingProps);
    };
    fetchBookingData();
  }, []);

  const qrCodeRef = useRef<any>(null);
  const downloadQRCode = async () => {
    // Get the QR code as a base64 image
    if (!qrCodeRef.current) return;
    qrCodeRef.current.toDataURL(async (dataURL: string) => {
      const base64Code = dataURL;
      const filename = FileSystem.documentDirectory + "qrcode_ticket.png";

      // Write the base64 image to a file
      try {
        await FileSystem.writeAsStringAsync(filename, base64Code, {
          encoding: FileSystem.EncodingType.Base64,
        });
        Alert.alert("Success", "QR Code saved successfully!");

        // Optionally share the QR code
        await Sharing.shareAsync(filename);
      } catch (error) {
        Alert.alert("Error", "Failed to save the QR code");
        console.error(error);
      }
    });
  };
  return (
    <SafeAreaView className="flex bg-gray-100 p-4">
      {/* Ticket Information */}
      <View className="bg-white p-4 rounded-lg mb-6 border border-blue-200">
        {/* Profile Info */}
        <View className="flex flex-row items-center justify-between mb-4">
          <View className="flex-row gap-x-2 items-center">
            <View className="w-[35px] h-[35px] bg-primary rounded-full flex items-center z-10 justify-around">
              <Ionicons name="person" size={18} color="white" />
            </View>
            <View>
              <Text className="font-bold text-lg text-primary">{bookingData?.user.name}</Text>
              <Text className="text-gray-500">{bookingData?.user.email}</Text>
            </View>
          </View>
          <View className="flex gap-y-1">
            <View className="flex-row items-center gap-x-1">
              <Ionicons name="calendar" size={15} color="gray" />
              <Text className="text-gray-400 font-bold">{date}</Text>
            </View>
            <View className="flex-row items-center gap-x-1">
              <View
                className={`w-3 h-3 rounded-full ${bookingData?.status === "Pending" ? "bg-orange-400" : "bg-green-400"
                  }`}
              ></View>
              <Text
                className={`font-bold ${bookingData?.status === "Pending" ? "text-orange-400" : "text-green-400"
                  }`}
              >
                {bookingData?.status}
              </Text>
            </View>
          </View>
        </View>

        {/* Travel Info */}
        <View className="border-t border-gray-200 pt-4">
          <View className="flex-row justify-between mb-4">
            <View>
              <Text className="text-gray-400">Ticket No</Text>
              <Text className="font-bold text-blue-500">
                {bookingData?._id}
              </Text>
            </View>
            <View>
              <Text className="text-gray-400">Seat No</Text>
              <Text className="font-bold text-3xl text-primary">
                {bookingData?.seatNumber}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center mb-4  border-t border-gray-200 pt-3">
            <View className="flex">
              <Text className="text-base text-primary font-bold">
                {bookingData?.schedule.startTime}
              </Text>
              <Text className="text-base font-normal">
                {bookingData?.schedule.startLocation}
              </Text>
            </View>
            <View className="w-[45px] h-[45px] bg-primary rounded-full flex items-center z-10 justify-around">
              <Ionicons name="trail-sign" size={20} color="white" />
            </View>
            <View className="flex">
              <Text className="text-base text-primary font-bold">
                {bookingData?.schedule.endTime}
              </Text>
              <Text className="text-base font-normal text-left">
                {bookingData?.schedule.endLocation}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between border-t border-gray-200 pt-4">
            <Text className="text-green-500 font-bold uppercase">Paid</Text>
            <Text className="font-bold text-blue-500 text-2xl">
              LKR {bookingData?.amount}.00
            </Text>
          </View>
        </View>
      </View>

      {/* QR Code */}
      <View className="items-center mb-6">
        <QRCode
          value={id as string}
          size={180}
          getRef={(c) => (qrCodeRef.current = c)}
        />
      </View>

      {/* Buttons */}
      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-lg mb-4"
        onPress={downloadQRCode}
      >
        <Text className="text-white text-center font-semibold">
          Download Ticket QR Code
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/tickets")}>
        <Text className="text-gray-500 text-center">Go to my tickets</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TicketConfirmationScreen;
