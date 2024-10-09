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
    <View className="h-16 mt-4 mx-4  border border-tertiary rounded-2xl flex flex-row justify-around items-center">
      <View className="w-1/3  flex justify-center items-center">
        <Text className="font-bold">{from}</Text>
      </View>
      <View className="w-1/3 h-[2px] bg-tertiary flex justify-center items-center">
        <View className="w-[45px] h-[45px] mr-2 bg-primary rounded-full flex items-center justify-around">
        <Ionicons name="bus" size={21} color="white" />
      </View>
      </View>
      <View className="w-1/3 flex justify-center items-center">
        <Text className="font-bold">{to}</Text>
      </View>
    </View>
  );
};

export default ScheduleListCardComponent;
