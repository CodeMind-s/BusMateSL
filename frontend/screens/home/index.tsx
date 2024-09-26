import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";

import TrackbusScreen from "@/screens/track-bus/trackbus.screen";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const Home = () => {
  const navigation = useNavigation();

  const [greeting, setGreeting] = useState("Good Morning");
  const [thought, setThought] = useState("You are never late in life :)");
  const [name, setName] = useState("Andrew Garfield");

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
    <View className=" bg-swhite h-full w-full flex-1 px-6 py-4 ">
      <Text className=" text-[24px] " style={{ fontWeight: "900" }}>
        {greeting}
      </Text>
      <Text
        className=" text-[24px] font-extrabold text-primary "
        style={{ fontWeight: "900" }}
      >
        {name}!
      </Text>
      <View className="bg-primary h-[20%] my-4 rounded-xl justify-center items-left p-4">
        <Text className="text-[22px]" style={{ fontWeight: "900" }}>
          Thought of the day,
        </Text>
        <Text className="text-[22px] text-white" style={{ fontWeight: "900" }}>
          {thought}
        </Text>
      </View>
      <View className="h-[35%]">
        <Text className=" text-[22px] mb-2" style={{ fontWeight: "900" }}>
          Explore the Map,
        </Text>
        <TouchableOpacity
          onPress={() => {router.push("/(tabs)/track-bus");}}
          className="flex-1 rounded-lg"
        >
          <ImageBackground
            source={require("../../assets/images/home-map.jpg")}
            style={{ flex: 1 }}
            imageStyle={{ borderRadius: 15 }}
          ></ImageBackground>
        </TouchableOpacity>
      </View>
      <View className="h-[25%] my-5 flex flex-row justify-between">
        <TouchableOpacity
          className="h-full w-[45%] bg-primary my-2 justify-center items-center rounded-xl"
          onPress={() => router.push("/(routes)/schedules")}
        >
          <Ionicons name="calendar" size={35} color="white" />
          <Text className="text-white text-[21px] font-bold mt-2">
            Schedules
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="h-full w-[45%] bg-primary my-2 justify-center items-center rounded-xl"
          onPress={() => router.push("/(tabs)/tickets")}
        >
          <Ionicons name="ticket" size={35} color="white" />
          <Text className="text-white text-[21px] font-bold mt-2">
            Book Seats
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
