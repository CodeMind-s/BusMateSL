import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ScheduleListCardComponent = ({
  from,
  to,
}: {
  from: string;
  to: string;
}) => {
  return (
    <View className="h-16 mt-4  border border-gray-300 w-full rounded-2xl flex flex-row justify-around items-center">
      <View className="w-1/3  flex justify-center items-center">
        <Text className="font-semibold text-base ">10.00 am</Text>
        <Text className=" text-sm text-[#A1A1A1]">{from}</Text>
      </View>
      <View className="w-1/3 h-[2px] bg-tertiary flex justify-center items-center relative">
        <View className="w-[45px] h-[45px] bg-primary rounded-full flex items-center z-10 justify-around">
          <Ionicons name="bus" size={21} color="white" />
        </View>
        <View className=" absolute top-1/2 left-0 h-[3px] w-full bg-gray-300"></View>
        <View className=" absolute -top-[0.8px] rounded-full left-0 h-[6px] aspect-square bg-gray-300"></View>
        <View className=" absolute -top-[0.8px] rounded-full right-0 h-[6px] aspect-square bg-gray-300"></View>
      </View>
      <View className="w-1/3 flex justify-center items-center">
        <Text className="font-semibold text-base ">10.00 am</Text>
        <Text className=" text-sm text-[#A1A1A1]">{to}</Text>
      </View>
    </View>
  );
};

export default ScheduleListCardComponent;
