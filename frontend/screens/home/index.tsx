import { View, Image, Text, TouchableOpacity, ImageBackground } from "react-native";
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
      <View className="flex flex-row">
        <Image
          source={{ uri: 'https://as1.ftcdn.net/v2/jpg/03/28/19/46/1000_F_328194664_RKSHvMLgHphnD1nwQYb4QKcNeEApJmqa.jpg' }}
          style={{ width: 50, height: 50 }}
          className="rounded-full mr-3"
        />
        <View>
          <Text className=" text-[16px] " style={{ fontWeight: "900" }}>
            {greeting}
          </Text>
          <Text
            className=" text-[20px] font-extrabold text-primary "
            style={{ fontWeight: "900" }}
          >
            {name}!
          </Text>
        </View>
      </View>
      <View>
        <Text className="mt-4 text-[18px]">Recommended Buses</Text>
        <View className="w-full flex-row py-2 ">
          <View className=" w-[50%]  ">
            <TouchableOpacity
              onPress={() => router.push("/(routes)/highway_schedules")}
              className="py-2 m-1 pl-3 bg-tertiary flex flex-row items-center  rounded-xl"
            >
              <View className="w-[35px] h-[35px] mr-2 bg-primary rounded-full flex items-center justify-around">
                <Ionicons name="bus" size={18} color="white" />
              </View>
              <Text className=" font-bold text-[16px]">Highway</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/(routes)/intercity_schedules")}
              className="py-2 m-1 pl-3 bg-tertiary flex flex-row items-center  rounded-xl"
            >
              <View className="w-[35px] h-[35px] mr-2 bg-primary rounded-full flex items-center justify-around">
                <Ionicons name="bus" size={18} color="white" />
              </View>
              <Text className=" font-bold text-[16px]">Intercity</Text>
            </TouchableOpacity>
          </View>
          <View className=" w-[50%]  ">
            <TouchableOpacity
              onPress={() => router.push("/(routes)/sltb_schedules")}
              className="py-2 m-1 pl-3 bg-tertiary flex flex-row items-center  rounded-xl"
            >
              <View className="w-[35px] h-[35px] mr-2 bg-primary rounded-full flex items-center justify-around">
                <Ionicons name="bus" size={18} color="white" />
              </View>
              <Text className=" font-bold text-[16px]">SLTB</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/(routes)/privatebus_schedules")}
              className="py-2 m-1 pl-3 bg-tertiary flex flex-row items-center  rounded-xl"
            >
              <View className="w-[35px] h-[35px] mr-2 bg-primary rounded-full flex items-center justify-around">
                <Ionicons name="bus" size={18} color="white" />
              </View>
              <Text className=" font-bold text-[16px]">Private</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="h-[35%]">
        <Text className=" text-[20px] my-3 font-semibold"  >
          Live Bus Tracking
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/(tabs)/track-bus");
          }}
          className="flex-1 rounded-lg"
        >
          <ImageBackground
            source={require("../../assets/images/home-map.jpg")}
            style={{ flex: 1 }}
            imageStyle={{ borderRadius: 15 }}
          ></ImageBackground>
        </TouchableOpacity>
      </View>
      <View className="h-[25%] my-5">
        <Text className=" text-[20px] font-semibold mb-2">
          Quick Actions
        </Text>
        <View className=" flex flex-row justify-between">
          <View className="h-full w-[48%] relative bg-tertiary my-1 justify-center items-left px-3 rounded-xl">
            <TouchableOpacity
              onPress={() => router.push("/(routes)/schedules")}
              className="absolute right-0 top-0 w-[80px] h-[80px] bg-primary rounded-tr-xl rounded-bl-[100px]  flex items-center justify-center"
            >
              <Ionicons
                name="arrow-forward-circle-outline"
                size={28}
                color="white"
              />
            </TouchableOpacity>
            <Ionicons name="calendar" size={35} color="#23252E" />
            <Text className="text-[#23252E] text-[21px] font-bold mt-2">
              Schedules
            </Text>
          </View>
          <View className="h-full w-[48%] bg-tertiary my-1 justify-center items-left px-3 rounded-xl">
            <TouchableOpacity
              onPress={() => router.push("/(routes)/tickets/ticket")}
              className="absolute right-0 top-0 w-[80px] h-[80px] bg-primary rounded-tr-xl rounded-bl-[100px]  flex items-center justify-center"
            >
              <Ionicons
                name="arrow-forward-circle-outline"
                size={28}
                color="white"
              />
            </TouchableOpacity>
            <Ionicons name="ticket" size={35} color="#23252E" />
            <Text className="text-[#23252E] text-[21px] font-bold mt-2">
              Book Seats
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;
