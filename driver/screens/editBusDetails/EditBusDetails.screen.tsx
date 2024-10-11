import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { get, put } from '@/helpers/api';
import { router } from 'expo-router';

interface BusProps {
    _id: string;
    driverNumber: string;
    conductorNumber: string;
    busNumber: string;
    busName: string;
    routeNumber: number;
    estimatedTime: string;
    type: string;
    from: string;
    to: string;
    email: string;
    phoneNumber: string;
    seatCount: number;
}

const EditBusDetailsScreen = () => {
    const [currentBus, setCurrentBus] = useState<BusProps | undefined>(undefined);
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [routeNumber, setRouteNumber] = useState<number | undefined>(undefined);
    const [estimatedTime, setEstimatedTime] = useState<string>('');


    useEffect(() => {
        const fetchBus = async () => {
            try {
                const response = await get(`buses/profile`);
                const responseData = response.data as BusProps;
                setCurrentBus(responseData);
                setFrom(responseData.from);
                setTo(responseData.to);
                setContact(responseData.phoneNumber);
                setRouteNumber(responseData.routeNumber);
                setEstimatedTime(responseData.estimatedTime);
            } catch (error) {
                console.error("Error fetching bus profile:", error);
            }
          };
          fetchBus();
      }, []);

    const updateHandler = async () => {
        try {
            const response = await put(`buses/profile`, {
                from,
                to,
                phoneNumber: contact,
                routeNumber,
                estimatedTime
            });
            router.push("/(tabs)/profile");
            console.log("Bus details updated", response);
        } catch (error) {
            console.error("Error updating bus details:", error);
        }
    };

    return (
        <View className='px-4 py-3 bg-swhite'>
            <View className='mt-2'>
                <View className='flex flex-row justify-start items-center'>
                    <Image
                        source={{ uri: "https://t4.ftcdn.net/jpg/02/18/58/51/360_F_218585163_hKijGOfFIkC3Fuo9JgX2sVGv69UKoXmM.jpg" }}
                        className='w-[80px] h-[80px] rounded-full'
                    />
                    <View className='ml-3'>
                        <Text className='text-primary text-[24px] font-bold'>{currentBus?.busName}</Text>
                        <Text className='text-[#7a7979] text-sm'>{currentBus?.email}</Text>
                        <Text className='text-[#7a7979] text-sm'>{currentBus?.busNumber}</Text>
                    </View>
                </View>
            </View>

            <View className='flex flex-row justify-between mt-4'>
                <View className='w-full'>
                    <Text className='mb-1 text-[#656565]'>Driver Reg No:</Text>
                    <TextInput value={currentBus?.driverNumber} editable={false} className='bg-primary/10 border-2 rounded-lg px-2 py-2 border-[#A1A1A1]/50 text-[#656565]'></TextInput>
                </View>
            </View>
            <View className='flex flex-row justify-between mt-4'>
                <View className='w-full'>
                    <Text className='mb-1 text-[#656565]'>Conductor Reg No:</Text>
                    <TextInput value={currentBus?.conductorNumber} editable={false} className='bg-primary/10 border-2 rounded-lg px-2 py-2 border-[#A1A1A1]/50 text-[#656565]'></TextInput>
                </View>
            </View>

            <View className='flex flex-row justify-between mt-4'>
                <View className='w-[47%]'>
                    <Text className='mb-1 text-[#656565]'>From</Text>
                    <TextInput
                        value={from}
                        onChangeText={setFrom}
                        className='border-2 rounded-lg px-2 py-2 border-[#A1A1A1]/70'
                    />
                </View>
                <View className='w-[47%]'>
                    <Text className='mb-1 text-[#656565]'>To</Text>
                    <TextInput
                        value={to}
                        onChangeText={setTo}
                        className='border-2 rounded-lg px-2 py-2 border-[#A1A1A1]/70'
                    />
                </View>
            </View>

            <View className='flex flex-row justify-between mt-4'>
                <View className='w-[47%]'>
                    <Text className='mb-1 text-[#656565]'>Route Number</Text>
                    <TextInput
                        value={routeNumber !== undefined ? routeNumber.toString() : ''}
                        onChangeText={(value) => setRouteNumber(parseInt(value))}
                        keyboardType='numeric'
                        className='border-2 rounded-lg px-2 py-2 border-[#A1A1A1]/70'
                    />
                </View>
                <View className='w-[47%]'>
                    <Text className='mb-1 text-[#656565]'>Estimated Time</Text>
                    <TextInput
                        value={estimatedTime}
                        onChangeText={setEstimatedTime}
                        className='border-2 rounded-lg px-2 py-2 border-[#A1A1A1]/70'
                    />
                </View>
            </View>

            <View className='flex flex-row justify-between mt-4'>
                <View className='w-full'>
                    <Text className='mb-1 text-[#656565]'>Contact Number</Text>
                    <TextInput
                        value={contact}
                        onChangeText={setContact}
                        keyboardType='phone-pad'
                        className='border-2 rounded-lg px-2 py-2 border-[#A1A1A1]/70'
                    />
                </View>
            </View>

            <TouchableOpacity onPress={updateHandler} className='bg-primary rounded-xl mt-14'>
                <Text className='py-3 text-center text-lg font-semibold text-white'>Update Details</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditBusDetailsScreen;
