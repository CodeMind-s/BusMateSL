import { View, Text, Image, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScheduleListCardComponent from '../../components/scheduleListCardComponent/scheduleListCardComponent';
import { Link, router } from 'expo-router';
import { get } from '@/helpers/api';
import { useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';


interface BusProps {
  _id: string;
  busName: string;
  email: string;
  busNumber: string;
}
interface Schedule {
  _id: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  date: Date;
  status: string; // Could be "InComplete", "InProgress", or "Complete"
}


const DriverDashboardScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);
    const [greeting, setGreeting] = useState("Good Morning");
    const [currentBus, setCurrentBus] = useState<BusProps>();
    const [schedules, setSchedules] = useState<Schedule[]>([]);
  
// Function to check if two dates are the same (ignoring the time)
const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

    // Fetch schedules from the server
    const fetchSchedules = async () => {
      try {
        // const busId = "6702d5d22f5aa58766a5fa1c";
        const response = await get(
          `schedules/bus`
        );
        const responseData = response.data as Schedule[];
        // console.log('response',responseData);
  
        // Get today's date
        const today = new Date();
        // Convert the received date strings to Date objects and filter schedules for today
        const updatedSchedules = responseData
          .map((schedule: any) => ({
            ...schedule,
            date: new Date(schedule.date), 
           
          }))
          .filter((schedule: Schedule) => isSameDay(new Date(schedule.date), today));
        setSchedules(updatedSchedules);
      } catch (error) {
        console.error("Error fetching schedules:", error);
        Alert.alert("Error", "Unable to fetch schedules");
      }
    };
  
    useEffect(() => {
      fetchSchedules();
    }, [schedules]);
  

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
        className=" w-full py-4 bg-primary rounded-xl mt-5"
      >
        <View className="flex flex-row justify-center gap-2 items-center">
          <Ionicons name="location" size={21} color="white" />
          <Text className=" text-center text-lg font-bold text-white">
            Switch On Location
          </Text>
        </View>
      </TouchableOpacity>

      <View className="flex flex-row items-center justify-between mt-4 ">
        <Pressable
          onPress={requestPermission}
          className="bg-blue-500 py-5 w-[48%] px-4 rounded-lg"
        >
          <Text className="text-white font-bold text-center">Request Permissions</Text>
        </Pressable>

        <Link href="/scanner" asChild>
          <Pressable
            disabled={!isPermissionGranted}
            className={`py-5 px-4 w-[48%] rounded-lg p ${isPermissionGranted ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <View className="flex flex-row items-center justify-center gap-2">
              <Ionicons name="scan" size={21} color="white" />
              <Text
                className={`font-bold text-lg text-center ${isPermissionGranted ? 'text-white' : 'text-gray-500'}`}
              >
                Scan Code
              </Text>
            </View>
          </Pressable>
        </Link>
      </View>


      <View className=" flex flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => router.push("/(routes)/announcement")}
          className=" w-[100%] py-5 bg-primary rounded-xl mt-6">
          <View className="flex flex-row justify-center items-center gap-2">
            <Ionicons name="chatbubbles" size={21} color="white" />
            <Text className=" text-center text-lg font-bold text-white">
              Announcement
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text className=" mt-3 font-semibold text-lg">Current Journey</Text>
      {(schedules.length > 0 &&
            schedules.some((schedule) => schedule.status === "InProgress")
          ) ? (
            schedules
              .filter(
                (schedule) =>
                   schedule.status === "InProgress"
              )
              .map((schedule) => (
                <View key={schedule._id}>
                  <ScheduleListCardComponent
                    id={schedule._id}
                    from={schedule.startLocation}
                    to={schedule.endLocation}
                    startTime={schedule.startTime}
                    endTime={schedule.endTime}
                    status={schedule.status}
                    btn={true}
                  />
                </View>
              ))
          ) : (
            <Text>No schedules Found</Text>
          )}

      <View className=" mt-5 bg-gray-200 rounded-xl p-3">
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
