import { View, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import ScheduleListCardComponent from '@/screens/components/scheduleListCardComponent/scheduleListCardComponent';
import SearchComponent from '@/screens/components/searchScheduleContainerComponent/searchScheduleContainerComponent';

const SLTB_Schedules = () => {
  // Array to store schedules
  const [schedules, setSchedules] = useState([
    { id: 1, from: "Colombo", to: "Panadura" },
    { id: 2, from: "Kandy", to: "Jaffna" },
    { id: 3, from: "Galle", to: "Colombo" },

  ]);

  // State to capture user input
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");

  // Handle the submission of 'from' and 'to' locations
  const handleSubmit = () => {
    const newSchedule = {
      id: schedules.length + 1, // Generate a new id
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
    return fromMatch && toMatch;
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
      <ScrollView>
        {filteredSchedules.map((schedule) => (
          <TouchableOpacity 
            key={schedule.id} 
            onPress={() => router.push(`/sltb_schedules_details?id=${schedule.id}`)}
          >
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

export default SLTB_Schedules;
