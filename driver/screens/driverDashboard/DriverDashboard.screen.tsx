import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScheduleListCardComponent from '../../components/scheduleListCardComponent/scheduleListCardComponent';
import { router } from 'expo-router';
import { get } from '@/helpers/api';


interface BusProps {
  _id: string;
  busName: string;
  email: string;
  busNumber: string;
}

const DriverDashboardScreen = () => {
    const [greeting, setGreeting] = useState("Good Morning");
    const [currentBus, setCurrentBus] = useState<BusProps>();

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

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return (
    <View className=' p-5'>
        <View className="flex flex-row">
            <Image 
                source={{ uri: 'https://t4.ftcdn.net/jpg/02/18/58/51/360_F_218585163_hKijGOfFIkC3Fuo9JgX2sVGv69UKoXmM.jpg' }} 
                style={{ width: 50, height: 50 }} 
                className="rounded-full mr-3"
                />
            <View>
                <Text className=" text-[16px] " style={{ fontWeight: "900" }}>{greeting}</Text>
                <Text className=" text-[20px] font-extrabold text-primary " style={{ fontWeight: "900" }}>
                    {currentBus?.busName}
                </Text>
            </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/(tabs)/track-bus")}
        className=" w-full py-5 bg-primary rounded-xl mt-6"
      >
        <Text className=" text-center text-[20px] font-semibold text-white">
          Switch On Location
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className=" w-full py-5 bg-primary rounded-xl mt-6">
        <Text className=" text-center text-[20px] font-semibold text-white">
          Scan Ticket
        </Text>
      </TouchableOpacity>

      <View className=" flex flex-row justify-between items-center">
        <TouchableOpacity className=" w-[47%] py-5 bg-primary rounded-xl mt-6">
          <Text className=" text-center text-[18px] font-semibold text-white">
            Booked Seats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(routes)/announcement")}
          className=" w-[47%] py-5 bg-primary rounded-xl mt-6"
        >
          <Text className=" text-center text-[18px] font-semibold text-white">
            Announcement
          </Text>
        </TouchableOpacity>
      </View>

      <Text className=" mt-4 font-semibold text-lg">Next Journey</Text>
      <TouchableOpacity onPress={() => router.push("/(tabs)/schedule")}>
        <ScheduleListCardComponent
          id="6702d5d22f5aa58766a5fa1c"
          startTime="9.00AM"
          endTime="10.00AM"
          status="Complete"
          from="Kurunegala"
          to="Colombo"
        />
      </TouchableOpacity>

      <View className=" mt-6 bg-gray-200 rounded-xl p-3">
        <Text className=" text-[#5e5e5e] text-base">
          Monthly Earning so far,{" "}
        </Text>
        <Text className=" text-2xl font-bold text-primary mt-1">
          Rs. 15,000.00{" "}
        </Text>
        <View className=" flex flex-row justify-end mt-4">
          <TouchableOpacity
            onPress={() => router.push("/(routes)/earning")}
            className=" bg-primary rounded-lg py-2 px-5 w-[50%]"
          >
            <Text className=" text-center text-white text-lg font-semibold">
              View More
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DriverDashboardScreen;
