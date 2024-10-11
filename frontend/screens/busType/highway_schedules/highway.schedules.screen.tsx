import { View, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import SearchComponent from "../../components/searchScheduleContainerComponent/searchScheduleContainerComponent";
import ScheduleListCardComponent from "../../components/scheduleListCardComponent/scheduleListCardComponent";
import React, { useState } from "react";
import { router } from "expo-router";

const Highway_Schedules = () => {
  // Array to store schedules
  const [schedules, setSchedules] = useState([
    { id: 1, from: "Kurunegala", to: "Panadura" },
    { id: 2, from: "Galle", to: "Colombo" },
    { id: 3, from: "Kandy", to: "Jaffna" },
    { id: 4, from: "Anuradhapura", to: "Panadura" },
  ]);

  // State to capture user input
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");

  // Handle the submission of 'from' and 'to' locations
  const handleSubmit = () => {
    const newSchedule = {
      id: schedules.length + 1, // Generate a new id (ensure this is unique)
      from: fromInput,
      to: toInput,
    };
    setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);
    setFromInput("");
    setToInput("");
  };

  const filteredSchedules = schedules.filter(schedule => {
    const fromMatch = schedule.from.toLowerCase().includes(fromInput.toLowerCase());
    const toMatch = schedule.to.toLowerCase().includes(toInput.toLowerCase());
    return fromMatch && toMatch; // Only show schedules that match both inputs
  });

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
          <TouchableOpacity key={schedule.id}  
          onPress={() => router.push(`/highway_schedules_details?id=${schedule.id}`)}>
            <ScheduleListCardComponent
              from={schedule.from}
              to={schedule.to}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Highway_Schedules;
