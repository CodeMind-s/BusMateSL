import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScheduleListCardComponent from '../../components/scheduleListCardComponent/scheduleListCardComponent';
import { router } from 'expo-router';

const DriverDashboardScreen = () => {
    const [greeting, setGreeting] = useState("Good Morning");

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
                source={{ uri: 'https://as1.ftcdn.net/v2/jpg/03/28/19/46/1000_F_328194664_RKSHvMLgHphnD1nwQYb4QKcNeEApJmqa.jpg' }} 
                style={{ width: 50, height: 50 }} 
                className="rounded-full mr-3"
                />
            <View>
                <Text className=" text-[16px] " style={{ fontWeight: "900" }}>{greeting}</Text>
                <Text className=" text-[20px] font-extrabold text-primary " style={{ fontWeight: "900" }}>
                    Saravana Travels
                </Text>
            </View>
      </View>

      <TouchableOpacity className=' w-full py-5 bg-primary rounded-xl mt-6'>
        <Text className=' text-center text-[20px] font-semibold text-white'>Switch On Location</Text>
      </TouchableOpacity>

      <TouchableOpacity className=' w-full py-5 bg-primary rounded-xl mt-6'>
        <Text className=' text-center text-[20px] font-semibold text-white'>Scan Ticket</Text>
      </TouchableOpacity>

      <View className=' flex flex-row justify-between items-center'>
        <TouchableOpacity className=' w-[47%] py-5 bg-primary rounded-xl mt-6'>
            <Text className=' text-center text-[18px] font-semibold text-white'>Booked Seats</Text>
        </TouchableOpacity>
        <TouchableOpacity className=' w-[47%] py-5 bg-primary rounded-xl mt-6'>
            <Text className=' text-center text-[18px] font-semibold text-white'>Announcement</Text>
        </TouchableOpacity>
      </View>

      <Text className=' mt-4 font-semibold text-lg'>Next Journey</Text>
      <TouchableOpacity onPress={() => router.push("(tabs)/schedule")}>
        <ScheduleListCardComponent from='Kaduwela' to='Kollupitiya'/>
      </TouchableOpacity>

      <View className=' mt-6 bg-gray-200 rounded-xl p-3'>
        <Text className=' text-[#5e5e5e] text-base'>Monthly Earning so far, </Text>
        <Text className=' text-2xl font-bold text-primary mt-1'>Rs. 15,000.00 </Text>
        <View className=' flex flex-row justify-end mt-4'>
            <TouchableOpacity onPress={() => router.push("(routes)/earning")} className=' bg-primary rounded-lg py-2 px-5 w-[50%]'><Text className=' text-center text-white text-lg font-semibold'>View More</Text></TouchableOpacity>
        </View>
      </View>
    
      
    </View>
  )
}

export default DriverDashboardScreen