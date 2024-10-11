import { AuthContext } from '@/contexts/AuthContext';
import { get } from '@/helpers/api';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface BookingProps {
    _id: string;
    seatNumber: string;
    gender: string;
    bookedDate: string;
    status: string;
    amount: number;
    schedule: SchdeuleProps;
}

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
    busName: string;
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

const MyTickets = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error(
            'TicketContext or AuthContext must be used within a TicketProvider or AuthProvider'
        );
    }
    const { id: userId } = authContext;
    console.log(`userId => `, userId);
    const [bookingData, setBookingData] = useState<BookingProps[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [qrVisible, setQrVisible] = useState(false);
    const [selectedQrCode, setSelectedQrCode] = useState<string | null>(null);

    const fetchBookings = async () => {
        try {
            const response = await get(`booking/mybookings/${userId}`);
            setBookingData(response.data as BookingProps[]);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "You have not booked any tickets yet.");
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [userId]);

    // console.log(`bookingData => `, bookingData);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchBookings();
        setRefreshing(false);
    };

    const handleShowQrCode = (ticketId: string) => {
        setSelectedQrCode(ticketId);
        setQrVisible(true);
    };

    return (
        <ScrollView
            className="m-3"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {bookingData.length > 0 ? (
                bookingData.map((booking) => (
                    <View
                        key={booking._id}
                        className="bg-white p-4 rounded-lg mb-6 border border-blue-200"
                    >
                        {/* Profile Info */}
                        <View className="flex flex-row items-center justify-between mb-4">
                            <View className="flex-row gap-x-2 items-center">
                                <View className="flex flex-row gap-2 items-center mb-3">
                                    <View className="w-[35px] h-[35px] bg-primary rounded-full flex items-center z-10 justify-around">
                                        <Ionicons name="bus" size={18} color="white" />
                                    </View>
                                    <Text className="text-lg font-bold">
                                        {booking?.schedule?.bus?.busName}
                                    </Text>
                                </View>
                            </View>
                            <View className="flex gap-y-1">
                                <View className="flex-row items-center gap-x-1">
                                    <Ionicons name="calendar" size={15} color="gray" />
                                    <Text className='text-gray-600'>{new Date(booking.bookedDate).toLocaleDateString()}</Text>
                                </View>
                                <View className="flex-row items-center gap-x-1">
                                    <View
                                        className={`w-3 h-3 rounded-full 
            ${booking.status === 'Pending' ? 'bg-orange-400'
                                                : booking.status === 'Completed' ? 'bg-green-400'
                                                    : booking.status === 'Cancelled' ? 'bg-red-500'
                                                        : 'bg-gray-400'}`}
                                    ></View>
                                    <Text
                                        className={`font-bold 
            ${booking.status === 'Pending' ? 'text-orange-400'
                                                : booking.status === 'Completed' ? 'text-green-400'
                                                    : booking.status === 'Cancelled' ? 'text-red-500'
                                                        : 'text-gray-400'}`}
                                    >
                                        {booking.status}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Travel Info */}
                        <View className="border-t border-gray-200 pt-4">
                            <View className="flex-row justify-between mb-4">
                                <View className="flex">
                                    <View>
                                        <Text className="text-gray-400">Ticket No</Text>
                                        <Text className="font-bold text-blue-500">{booking._id}</Text>
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

                            <View className="flex-row justify-between items-center mb-4 border-t border-gray-200 pt-3">
                                <View className="flex">
                                    <Text className="text-base text-primary font-bold">
                                        {booking.schedule?.startTime}
                                    </Text>
                                    <Text className="text-base font-normal">
                                        {booking.schedule?.startLocation}
                                    </Text>
                                </View>
                                <View className="w-[45px] h-[45px] bg-primary rounded-full flex items-center z-10 justify-around">
                                    <Ionicons name="trail-sign" size={20} color="white" />
                                </View>
                                <View className="flex">
                                    <Text className="text-base text-primary font-bold">
                                        {booking.schedule?.endTime}
                                    </Text>
                                    <Text className="text-base font-normal text-left">
                                        {booking.schedule?.endLocation}
                                    </Text>
                                </View>
                            </View>

                            <View className="flex-row justify-between border-t border-gray-200 pt-4">
                                <Text className="text-green-500 font-bold uppercase">Paid</Text>
                                <Text className="font-bold text-blue-500 text-2xl">
                                    LKR {booking.amount}.00
                                </Text>
                            </View>
                        </View>

                        {/* Show QR Code Button */}
                        {booking.status !== 'Completed' && booking.status !== 'Cancelled' && (
                            <TouchableOpacity
                                className="bg-blue-500 py-3 rounded-lg my-2"
                                onPress={() => handleShowQrCode(booking._id)} // trigger modal
                            >
                                <Text className="text-white text-center font-semibold">
                                    Show QR Code
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))
            ) : (
                <Text>No bookings found.</Text>
            )}

            {/* QR Code Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={qrVisible}
                onRequestClose={() => setQrVisible(false)} // Close modal on back press
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: 300, backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text style={{ textAlign: 'center', marginBottom: 20, fontSize: 18, fontWeight: 'bold' }}>
                            Ticket QR Code
                        </Text>
                        {selectedQrCode && (
                            <QRCode value={selectedQrCode} size={200} />
                        )}
                        <Pressable
                            className='bg-primary'
                            style={{ marginTop: 20, padding: 10, borderRadius: 5 }}
                            onPress={() => setQrVisible(false)} // Close modal
                        >
                            <Text className='text-white text-center'>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default MyTickets;
