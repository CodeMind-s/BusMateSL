import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import SearchComponent from "../../components/searchScheduleContainerComponent/searchScheduleContainerComponent";
import ScheduleListCardComponent from "../../components/scheduleListCardComponent/scheduleListCardComponent";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { get } from "../../../helpers/api"; // Ensure you import the `get` method from the api helper

interface Schedule {
  _id?: string; // Make _id optional
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  date: Date;
  status: string;
  price: number;
}


const Highway_Schedules = () => {
  // Array to store schedules
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true); // Loading state to manage loading status
  const [error, setError] = useState<string>(""); // Error state to manage any errors during data fetching

  // State to capture user input
  const [fromInput, setFromInput] = useState<string>("");
  const [toInput, setToInput] = useState<string>("");

  // Fetch schedules from the API
  const fetchSchedules = async () => {
    try {
      const response = await get<Schedule[]>("schedules");
      const responseData = response.data;
      setSchedules(responseData); // Assign fetched schedules to the state
    } catch (err) {
      console.error("Failed to fetch schedules:", err);
      setError("Failed to fetch schedules. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Use `useEffect` to fetch schedules when the component mounts
  useEffect(() => {
    fetchSchedules();
  }, []);

  // Handle the submission of 'from' and 'to' locations
  const handleSubmit = () => {
    const newSchedule = {
      id: schedules.length + 1, // Generate a new id (ensure this is unique)
      startLocation: fromInput,
      endLocation: toInput,
      startTime: "", // Placeholder values for now
      endTime: "",
      date: new Date(),
      status: "InComplete",
      price: 0,
    };
    setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);
    setFromInput("");
    setToInput("");
  };

  // Filter schedules based on user input
  const filteredSchedules = schedules.filter((schedule) => {
    const fromMatch = schedule.startLocation.toLowerCase().includes(fromInput.toLowerCase());
    const toMatch = schedule.endLocation.toLowerCase().includes(toInput.toLowerCase());
    return fromMatch && toMatch;
  });

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View><Text>{error}</Text></View>;
  }

  return (
    <View className="h-full bg-swhite pb-4">
      <SearchComponent
        from={fromInput}
        to={toInput}
        setFrom={setFromInput}
        setTo={setToInput}
        onSubmit={handleSubmit}
      />
      <ScrollView className="px-5">
        {filteredSchedules.map((schedule) => (
          <TouchableOpacity 
            key={schedule._id} 
            onPress={() => router.push(`/highway_schedules_details?id=${schedule._id}`)}
          >
            <ScheduleListCardComponent
              from={schedule.startLocation}
              to={schedule.endLocation}
              startTime={schedule.startTime}
              endTime={schedule.endTime}

            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Highway_Schedules;
