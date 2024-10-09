import { View, TextInput, Button, ScrollView } from "react-native";
import SearchComponent from "../../components/searchScheduleContainerComponent/searchScheduleContainerComponent";
import ScheduleListCardComponent from "../../components/scheduleListCardComponent/scheduleListCardComponent";
import React, { useState } from "react";

const Highway_Schedules = () => {
  // Array to store schedules
  const [schedules, setSchedules] = useState([
    { from: "Colombo", to: "Panadura" },
    { from: "Kandy", to: "Jaffna" },
    { from: "Kandy", to: "Jaffna" },
    { from: "Galle", to: "Colombo" },
    { from: "Anuradhapura", to: "Panadura"},
    { from: "Kandy", to: "Jaffna" },
    { from: "Kandy", to: "Jaffna" },
    { from: "Galle", to: "Colombo" },
    { from: "Colombo", to: "Panadura"},
    { from: "Kandy", to: "Jaffna" },
    { from: "Kandy", to: "Jaffna" },
    { from: "Galle", to: "Colombo" },
  ]);

  // State to capture user input
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");

  // Handle the submission of 'from' and 'to' locations
  const handleSubmit = () => {
    // Append new schedule to the existing array
    setSchedules((prevSchedules) => [
      ...prevSchedules,
      { from: fromInput, to: toInput },
    ]);

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
      <ScrollView>
        {filteredSchedules.map((schedule, index) => (
          <ScheduleListCardComponent
            key={index}
            from={schedule.from}
            to={schedule.to}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Highway_Schedules;
