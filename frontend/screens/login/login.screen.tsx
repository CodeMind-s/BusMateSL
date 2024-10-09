import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { TailwindProvider } from "tailwindcss-react-native";
import CheckBox from "expo-checkbox";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 px-6 bg-gray-100">
      <View className="items-center py-6">
        <Text className="text-xl font-bold">Login</Text>
      </View>

      <View className="items-center my-6">
        <Image
          source={require("../../assets/images/logo.png")} // Replace with your logo path
          className="w-32 h-16"
          resizeMode="contain"
        />
      </View>

      <View className="flex-row justify-center mb-8">
        <TouchableOpacity>
          <Text className="mx-4 text-lg text-blue-500 border-b-2 border-blue-500">
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="mx-4 text-lg text-gray-500">Register</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center border-b border-gray-300 mb-4 py-2">
        <Ionicons name="mail-outline" size={20} color="gray" />
        <TextInput
          className="flex-1 ml-3 text-lg"
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View className="flex-row items-center border-b border-gray-300 mb-4 py-2">
        <Ionicons name="lock-closed-outline" size={20} color="gray" />
        <TextInput
          className="flex-1 ml-3 text-lg"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? "eye" : "eye-off"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row items-center">
          <CheckBox
            value={rememberMe}
            onValueChange={setRememberMe}
            style={{ marginRight: 8 }}
          />
          <Text className="text-gray-600">Remember password</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-blue-500">Forget password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="bg-blue-500 py-3 rounded-lg">
        <Text className="text-white text-center font-semibold text-lg">
          Login
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
