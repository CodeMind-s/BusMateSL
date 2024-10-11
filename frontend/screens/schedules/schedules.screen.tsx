import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ScheduleScreen = () => {
  return (
    <View className="h-full bg-swhite px-6 py-4 ">
      <View className=" my-2">
        <Text className=" text-[20px] " style={{ fontWeight: "900" }}>
          Choose the bus type you desire to explore.
        </Text>
      </View>
      <View className="h-[40%] flex flex-row justify-between mt-5">
      <TouchableOpacity
          className="h-[91%] w-[48%] my-2 rounded-xl"
          onPress={() => router.push("/(routes)/highway_schedules")}
        >
          <ImageBackground
            source={require("../../assets/images/busTypes/highway.jpg")}
            style={{ flex: 1 }}
            imageStyle={{ borderTopLeftRadius: 15 , borderTopRightRadius: 15 , opacity:0.7}}
            className=" bg-black rounded-t-2xl"
          />
            <View className="bg-primary h-[25%] rounded-b-xl p-2 justify-center items-center">
              <Text className="text-white text-center text-[18px] font-bold">
                High-Way Schedules
              </Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="h-[91%] w-[48%] my-2 rounded-xl"
          onPress={() => router.push("/(routes)/sltb_schedules")}
        >
          <ImageBackground
            source={require("../../assets/images/busTypes/sltb.jpg")}
            style={{ flex: 1 }}
             imageStyle={{ borderTopLeftRadius: 15 , borderTopRightRadius: 15 , opacity:0.7}}
            className=" bg-black rounded-t-2xl"
          />
            <View className="bg-primary h-[25%] rounded-b-xl p-2 justify-center items-center">
              <Text className="text-white text-center text-[19px] font-bold">
                SLTB Schedules
              </Text>
            </View>
        </TouchableOpacity>
      </View>
      <View className="h-[40%] flex flex-row justify-between my-3">
      <TouchableOpacity
          className="h-[91%] w-[48%] my-2 rounded-xl"
          onPress={() => router.push("/(routes)/intercity_schedules")}
        >
          <ImageBackground
            source={require("../../assets/images/busTypes/intercity.jpg")}
            style={{ flex: 1 }}
             imageStyle={{ borderTopLeftRadius: 15 , borderTopRightRadius: 15 , opacity:0.7}}
            className=" bg-black rounded-t-2xl"
          />
            <View className="bg-primary h-[25%] rounded-b-xl p-2 justify-center items-center">
              <Text className="text-white text-center text-[18px] font-bold">
                Intercity Schedules
              </Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="h-[91%] w-[48%] my-2 rounded-xl"
          onPress={() => router.push("/(routes)/privatebus_schedules")}
        >
          <ImageBackground
            source={require("../../assets/images/busTypes/private.jpg")}
            style={{ flex: 1 }}
             imageStyle={{ borderTopLeftRadius: 15 , borderTopRightRadius: 15 , opacity:0.7}}
            className=" bg-black rounded-t-2xl"
          />
            <View className="bg-primary h-[25%] rounded-b-xl p-2 justify-center items-center">
              <Text className="text-white text-center text-[18px] font-bold">
                Private Bus Schedules
              </Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScheduleScreen;
