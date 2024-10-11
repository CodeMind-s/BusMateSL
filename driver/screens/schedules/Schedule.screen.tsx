import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import ScheduleListCardComponent from "../../components/scheduleListCardComponent/scheduleListCardComponent";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { get } from '@/helpers/api';

// Define the structure of a schedule
interface Schedule {
  _id: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  date: Date;
  status: string; // Could be "InComplete", "InProgress", or "Complete"
}

// Function to check if two dates are the same (ignoring the time)
const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const ScheduleScreen = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  

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
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [schedules]);

  return (
    <View className="bg-swhite flex-1">
      {/* To be Completed Section */}
      <View className="h-[54%] px-5 pt-5">
        <Text className="text-[21px] font-bold">To be Completed</Text>
        
        <ScrollView>
        { schedules && schedules.length > 0 ? (
            schedules
              .filter((schedule) => schedule.status === "InComplete" || schedule.status === "InProgress")
              .map((schedule, index) => (
                <View key={schedule._id}>
                  <ScheduleListCardComponent
                    id={schedule._id}
                    from={schedule.startLocation}
                    to={schedule.endLocation}
                    startTime={schedule.startTime}
                    endTime={schedule.endTime}
                    status={schedule.status}
                    btn={index === 0}
                  />
                </View>
              ))
          ) : (
            <Text className=" h-full w-full text-center mt-9 text-[#A1A1A1]">No Schedules Found</Text>
          )
        }
        </ScrollView>
        <View className="h-[5%] flex justify-center items-center">
          <Text className="text-[14px] px-2 text-primary ">View more...</Text>
        </View>
      </View>

      {/* Completed Section */}
      <View className="h-[48%] p-5">
        <Text className="text-[21px] font-bold">Completed</Text>
        <ScrollView>
          {schedules
            .filter((schedule) => schedule.status === "Complete")
            .map((schedule) => (
              <ScheduleListCardComponent
                key={schedule._id}
                id={schedule._id}
                from={schedule.startLocation}
                to={schedule.endLocation}
                startTime={schedule.startTime}
                endTime={schedule.endTime}
                status={schedule.status}
                btn={false}
              />
            ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        className="absolute bottom-0 right-0 m-5 z-10"
        onPress={() => router.push("/(routes)/addSchedule")}
      >
        <Ionicons name="add-circle" size={50} color="#3B6DE7" />
      </TouchableOpacity>
    </View>
  );
};

export default ScheduleScreen;
