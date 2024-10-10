import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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
}

const TicketConfirmationScreen = ({ id }: { id: string | string[] }) => {
  console.log("booking id", id);
  const [bookingData, setBookingData] = useState<BookingProps>();

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
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      {/* Ticket Information */}
      <View className="bg-white p-4 rounded-lg mb-6 border border-blue-200">
        {/* Profile Info */}
        <View className="flex-row items-center mb-4">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/47.jpg" }}
            className="w-12 h-12 rounded-full mr-4"
          />
          <View>
            <Text className="font-bold text-lg">{bookingData?.user.name}</Text>
            <Text className="text-gray-500">{bookingData?.user.email}</Text>
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
              <Text className="font-bold text-blue-500">
                {bookingData?.seatNumber}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between mb-4">
            <View>
              <Text className="font-bold text-lg">
                {bookingData?.schedule.startTime}
              </Text>
              <Text className="text-gray-400">
                {bookingData?.schedule.startLocation}
              </Text>
            </View>
            <View>
              <Text className="font-bold text-lg">
                {bookingData?.schedule.endTime}
              </Text>
              <Text className="text-gray-400">
                {bookingData?.schedule.endLocation}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between border-t border-gray-200 pt-4">
            <Text className="text-green-500 font-bold">Paid</Text>
            <Text className="font-bold text-blue-500 text-lg">
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
          Download Ticket
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/tickets")}>
        <Text className="text-blue-500 text-center">Book another ticket</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TicketConfirmationScreen;
