import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { get } from "../../../../helpers/api";
import { router } from "expo-router";

interface HighwaySchedulesDetProps {
  scheduleId: string;
}

interface Schedule {
  _id?: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  date: Date;
  status: string;
  price: number;
  bus: {
    busNumber: string;
    from: string;
    to: string;
    routeNumber: string;
    estimatedTime: string;
    phoneNumber: string;
  };
  distance: string;
  timetaken: string;
  contact: string;
  routeNo: string;
  starttime: string[];
}
interface AllSchedule {
  _id?: string; // Make _id optional
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  date: Date;
  status: string;
  price: number;
}

const HighwaySchedulesDet: React.FC<HighwaySchedulesDetProps> = ({
  scheduleId,
}) => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [allSchedule, setAllSchedule] = useState<AllSchedule[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [matchedStartTimes, setMatchedStartTimes] = useState<string[]>([]); // State to store matched start times

  const fetchSchedule = async () => {
    try {
      const response = await get<Schedule>(`schedules/${scheduleId}`);
      const responseData = response.data;
      console.log(responseData);
      setSchedule(responseData);
    } catch (err) {
      console.error("Failed to fetch schedule:", err);
      setError("Failed to fetch schedule. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch schedules from the API
  const fetchAllSchedules = async () => {
    try {
      const response = await get<AllSchedule[]>("schedules");
      const responseData = response.data;
      setAllSchedule(responseData);

      // Match schedules based on startLocation and endLocation
      if (schedule) {
        const matchedSchedules = responseData.filter(
          (s) =>
            s.startLocation === schedule.startLocation &&
            s.endLocation === schedule.endLocation
        );
        console.log("reached");
        // Extract the start times from matched schedules
        const startTimes = matchedSchedules.flatMap((s) => s.startTime);
        console.log(startTimes);
        setMatchedStartTimes(startTimes);
      }
    } catch (err) {
      console.error("Failed to fetch schedules:", err);
      setError("Failed to fetch schedules. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true); // Start loading whenever component mounts
    fetchSchedule();
  }, [scheduleId]); // Only depend on scheduleId for fetching individual schedule

  useEffect(() => {
    if (schedule) {
      fetchAllSchedules(); // Fetch all schedules only after schedule is fetched
    }
  }, [schedule]); // Fetch all schedules when `schedule` is updated

  return (
    <ScrollView className="-mt-5 bg-swhite">
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : schedule ? (
        <View className="w-full h-full">
          <View className="w-full h-[250px]">
            <ImageBackground
              source={require("../../../../assets/images/busTypes/highway.jpg")}
              style={{ flex: 1 }}
              imageStyle={{ opacity: 0.5 }}
              className="w-full h-full bg-black"
            >
              <View className="flex justify-end h-full pb-3">
                <Text className="text-[30px] text-center font-extrabold text-white mb-4">
                  {schedule.bus.from} - {schedule.bus.to}
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View className="h-[130px] flex flex-row w-full">
            <View className="w-[40%] p-5">
              <View className="bg-primary w-full h-full rounded-2xl flex justify-center items-center">
                <Text className="text-white text-[36px] font-extrabold mb-0">
                  {schedule.bus.routeNumber}
                </Text>
                <Text className="text-white text-[24px] -mt-3">Route</Text>
              </View>
            </View>
            <View className="px-2 flex justify-around py-5">
              <View className="flex flex-row">
                <Text className="text-[16px] font-bold">Distance :</Text>
                <Text className="text-[16px] "> 15 KM</Text>
              </View>
              <View className="flex flex-row">
                <Text className="text-[16px] font-bold">Time Taken :</Text>
                <Text className="text-[16px] ">
                  {" "}
                  {schedule.bus.estimatedTime}
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="text-[16px] font-bold">Contact :</Text>
                <Text className="text-[16px] ">
                  {" "}
                  {schedule.bus.phoneNumber}
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="text-[16px] font-bold">Ticket Price :</Text>
                <Text className="text-[16px] font-bold">
                  {" "}
                  Rs. {schedule.price}
                </Text>
              </View>
            </View>
          </View>

          {/* Displaying matched start times in From section */}
          <View className="mb-5 mx-4 pt-5 px-5 h-[250px] border-[2px] rounded-2xl border-tertiary flex justify-between">
            <View>
              <Text className="text-[18px] font-bold">
                From {schedule.bus.from}
              </Text>
            </View>
            <ScrollView nestedScrollEnabled={true}>
              <View className="w-full">
                {matchedStartTimes.length > 0 ? (
                  matchedStartTimes.map((time, index) => (
                    <View
                      key={index}
                      className="w-full p-2 border-b-2 border-tertiary flex flex-row justify-between items-center"
                    >
                      <View className="flex justify-center items-center w-[50%]">
                        <Text className="text-[16px]">{time}</Text>
                      </View>
                      <TouchableOpacity
                        className="px-5 py-1 bg-primary rounded"
                        onPress={() =>
                          router.push(`/tickets/bus-details/${scheduleId}`)
                        } // Use backticks here
                      >
                        <Text className="text-[16px] text-white font-bold">
                          Reserve Seat
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <Text className="text-center text-gray-500">
                    No available times
                  </Text>
                )}
              </View>
            </ScrollView>
            <View className="flex items-center h-6">
              <Text className="text-[14px] font-bold text-primary">
                See More...
              </Text>
            </View>
          </View>

          {/* The same for To section, if needed */}
          <View className="mb-5 mx-4 pt-5 px-5 h-[250px] border-[2px] rounded-2xl border-tertiary flex justify-between">
            <View>
              <Text className="text-[18px] font-bold">
                From {schedule.bus.to}
              </Text>
            </View>
            <ScrollView nestedScrollEnabled={true}>
              <View className="w-full">
                {matchedStartTimes.length > 0 ? (
                  matchedStartTimes.map((time, index) => (
                    <View
                      key={index}
                      className="w-full p-2 border-b-2 border-tertiary flex flex-row justify-between items-center"
                    >
                      <View className="flex justify-center items-center w-[50%]">
                        <Text className="text-[16px]">{time}</Text>
                      </View>
                      <TouchableOpacity className="px-5 py-1 bg-primary rounded">
                        <Text className="text-[16px] text-white font-bold">
                          Reserve Seat
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <Text className="text-center text-gray-500">
                    No available times
                  </Text>
                )}
              </View>
            </ScrollView>
            <View className="flex items-center h-6">
              <Text className="text-[14px] font-bold text-primary">
                See More...
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text>No schedule found for this ID.</Text>
      )}
    </ScrollView>
  );
};

export default HighwaySchedulesDet;
