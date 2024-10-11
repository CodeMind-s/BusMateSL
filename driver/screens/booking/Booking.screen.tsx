import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { get } from '@/helpers/api';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface BookingProps {
  _id: string;
  user: UserProps;
  schedule: string;
  seatNumber: string;
  gender: string;
  bookedDate: string;
  amount: number;
  isPaid: boolean;
  status: string;
}

interface UserProps {
  name: string;
  contact: string;
}

const BookingScreen = () => {
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  const [refreshing, setRefreshing] = useState(false); // New state for refreshing

  const fetchBookings = async () => {
    try {
      const response = await get(`booking/bus`);
      setBookings(response.data as BookingProps[]);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Function to handle the refresh action
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBookings();
    setRefreshing(false);
  };

  // Function for handling cancel button click
  const handleCancel = (bookingId: string) => {
    console.log(`Cancel booking ID: ${bookingId}`);
    // Add logic for canceling booking
  };

  // Function for handling confirm button click
  const handleConfirm = (bookingId: string) => {
    console.log(`Confirm booking ID: ${bookingId}`);
    // Add logic for confirming booking
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className='mb-2'
    >
      {bookings.length > 0 ? (
        bookings.map(booking => (
          <View key={booking._id} className='mt-4 mx-4 p-3 bg-white border rounded-lg border-blue-200'>
            <View className='flex flex-row justify-between mb-2'>
              <View className="flex-row gap-x-2 items-center">
                <View className="flex flex-row gap-2 items-center mb-2">
                  <View className="w-[35px] h-[35px] bg-primary rounded-full flex items-center z-10 justify-around">
                    <Ionicons name="person" size={18} color="white" />
                  </View>
                  <View className="flex ">
                    <Text className="text-lg font-bold">
                      {booking?.user?.name}
                    </Text>
                    <Text className="text-sm font-medium text-gray-400">
                      {booking?.user?.contact}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex gap-y-1">
                <View className="flex-row items-center gap-x-1">
                  <Ionicons name="calendar" size={15} color="gray" />
                  <Text className='text-gray-600 text-xs'>{new Date(booking.bookedDate).toLocaleDateString()}</Text>
                </View>
                <View className="flex-row items-center gap-x-1">
                  <View
                    className={`w-3 h-3 rounded-full 
            ${booking.status === 'Pending' ? 'bg-orange-400'
                        : booking.status === 'Completed' ? 'bg-green-400'
                          : booking.status === 'Cancelled' ? 'bg-red-400'
                            : 'bg-gray-400'}`}
                  ></View>
                  <Text
                    className={`font-bold 
            ${booking.status === 'Pending' ? 'text-orange-400'
                        : booking.status === 'Completed' ? 'text-green-400'
                          : booking.status === 'Cancelled' ? 'text-red-400'
                            : 'text-gray-400'}`}
                  >
                    {booking.status}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-row justify-between items-start mb-4 border-t border-gray-200 pt-4 ">
              <View className="flex">
                <View>
                  <Text className="text-gray-400">Ticket No</Text>
                  <Text className="font-bold text-md text-blue-500">{booking._id}</Text>
                </View>
                <View className='flex flex-row mt-1'>
                  <Text className="text-gray-400">Gender: </Text>
                  <Text className={`font-bold text-md ${booking.gender === 'Female' ? 'text-pink-500' : 'text-blue-500'}`}>
                    {booking.gender}
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-gray-400">Seat No</Text>
                <Text className="font-bold text-3xl text-primary">
                  {booking.seatNumber}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between border-t border-gray-200 pt-2">
              <Text className="text-green-500 font-bold uppercase">Paid</Text>
              <Text className="font-bold text-blue-500 text-2xl">
                LKR {booking.amount}.00
              </Text>
            </View>
          </View>
        ))
      ) : (
        <Text>No bookings available</Text>
      )}
    </ScrollView>
  );
};

export default BookingScreen;
