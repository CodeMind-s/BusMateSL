import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import tailwind from "tailwind-react-native-classnames";

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={tailwind`flex-1 bg-gray-100 p-6`}>
      {/* Header */}
      <View style={tailwind`flex-row justify-center items-center mb-4`}>
        <Text style={tailwind`text-lg font-bold text-gray-500`}>Login</Text>
        <Text style={tailwind`text-lg font-bold text-blue-500 ml-4`}>Register</Text>
      </View>

      {/* Form Fields */}
      <View style={tailwind`bg-white p-4 rounded-lg shadow-lg`}>
        <View style={tailwind`flex-row justify-between`}>
          <TextInput
            style={tailwind`border p-2 w-[48%] rounded-lg border-gray-300`}
            placeholder="Driver Number"
          />
          <TextInput
            style={tailwind`border p-2 w-[48%] rounded-lg border-gray-300`}
            placeholder="Conductor Number"
          />
        </View>

        <TextInput
          style={tailwind`border p-2 mt-4 rounded-lg border-gray-300`}
          placeholder="Vehicle Number"
        />

        <View style={tailwind`flex-row justify-between mt-4`}>
          <TextInput
            style={tailwind`border p-2 w-[48%] rounded-lg border-gray-300`}
            placeholder="From"
          />
          <TextInput
            style={tailwind`border p-2 w-[48%] rounded-lg border-gray-300`}
            placeholder="To"
          />
        </View>

        <TextInput
          style={tailwind`border p-2 mt-4 rounded-lg border-gray-300`}
          placeholder="Email"
          keyboardType="email-address"
        />

        <TextInput
          style={tailwind`border p-2 mt-4 rounded-lg border-gray-300`}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />

        <TextInput
          style={tailwind`border p-2 mt-4 rounded-lg border-gray-300`}
          placeholder="Seat Count"
          keyboardType="numeric"
        />

        <View style={tailwind`relative`}>
          <TextInput
            style={tailwind`border p-2 mt-4 rounded-lg border-gray-300`}
            placeholder="Set Password"
            secureTextEntry={true}
          />
          <Ionicons
            name="eye-off-outline"
            size={20}
            color="gray"
            style={tailwind`absolute right-4 top-5`}
          />
        </View>
      </View>

      {/* Register Button */}
      <TouchableOpacity
        style={tailwind`bg-blue-500 p-4 rounded-lg mt-6`}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={tailwind`text-center text-white font-bold`}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
