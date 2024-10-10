import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { get } from '@/helpers/api';

// interface BusProps {
//   _id: string;
// }

interface BookingProps {
  _id: string;
  user: UserProps;
  schedule: string;
  seatNumber: string;
  gender: string;
  bookedDate: string;
  amount: number;
  status: string;
}

interface UserProps {
  name: string;
  email: string;
}

const BookingScreen = () => {
  // const [currentBus, setCurrentBus] = useState<BusProps | null>(null);
  const [bookings, setBookings] = useState<BookingProps[]>([]);

  // useEffect(() => {
  //   const fetchBus = async () => {
  //     try {
  //       const response = await get(`buses/profile`);
  //       setCurrentBus(response.data as BusProps);
  //     } catch (error) {
  //       console.error("Error fetching bus profile:", error);
  //     }
  //   };
  //   fetchBus();
  // }, []);

  useEffect(() => {
    const fetchBookings = async () => { 
      try {
        const response = await get(`booking/bus`);
        setBookings(response.data as BookingProps[]); 
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings(); 
  }, []); 

  return (
    <View className='flex-1 justify-center items-center bg-swhite'>
      {bookings.length > 0 ? (
        bookings.map(booking => ( 
          <View key={booking._id}>
            <Text>{booking.bookedDate}</Text>
          </View>
        ))
      ) : (
        <Text>No bookings available</Text> 
      )}
    </View>
  );
};

export default BookingScreen;
