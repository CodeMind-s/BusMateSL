import { View, TextInput, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface SearchComponentProps {
  from: string;
  to: string;
  setFrom: (value: string) => void;
  setTo: (value: string) => void;
  onSubmit: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  from,
  to,
  setFrom,
  setTo,
  onSubmit,
}) => {
  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <View className="-mt-5 h-[25%] w-full pt-2 bg-Secondary rounded-b-3xl flex">
      <View className="flex flex-row justify-center">
        <View className="w-[80%] flex my-4">
          <TextInput
            value={from}
            onChangeText={(text) => setFrom(text)}
            placeholder="From"
            className="h-12 bg-white rounded-lg px-4 mb-4"
          />

          <TextInput
            value={to}
            onChangeText={(text) => setTo(text)}
            placeholder="To"
            className="h-12 bg-white rounded-lg px-4"
          />
        </View>
        <View className="w-[10%] flex justify-center items-center">
          <TouchableOpacity onPress={handleSwap}>
            <Ionicons name="swap-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Uncomment the search button if needed */}
      {/* <View className="flex flex-row justify-center">
        <TouchableOpacity
          onPress={onSubmit}
          className="w-[80%] h-10 bg-primary rounded-lg px-4 flex justify-center items-center"
        >
          <Text className="text-[18px] text-white">Search</Text>
        </TouchableOpacity>
        <View className="w-[10%]"></View>
      </View> */}
    </View>
  );
};

export default SearchComponent;
