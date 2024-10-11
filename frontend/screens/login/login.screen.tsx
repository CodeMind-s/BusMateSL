import React, { useState, useEffect, useContext } from "react";
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
import { router } from "expo-router";
import { post } from "@/helpers/api";
import { AuthContext } from "@/contexts/AuthContext";

interface LoginProps {
  _id: string;
  name: string;
  email: string;
  contact: string;
  isAdmin: boolean;
  token: string;
}

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within a AuthProvider");
  }
  const { setId, setName, setUserEmail, setToken } = context;

  const handleLogin = async () => {
    try {
      const response = await post("/users/auth", { email, password });
      const data = response.data as LoginProps;
      setId(data._id);
      setName(data.name);
      setUserEmail(data.email);
      setToken(data.token);
      router.push("/(tabs)/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View className="p-6">
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
        <TouchableOpacity onPress={() => router.push("/(routes)/register")}>
          <Text className="mx-4 text-lg text-gray-500">Register</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center border-b border-gray-300 mb-4 py-2">
        <Ionicons name="mail-outline" size={24} color="black" />
        <TextInput
          className="flex-1 ml-3 text-lg"
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View className="flex-row items-center border-b border-gray-300 mb-4 py-2">
        <Ionicons name="lock-closed-outline" size={24} color="black" />
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
        <TouchableOpacity
          onPress={() => router.push("/(routes)/forgotPassword")}
        >
          <Text className="text-blue-500">Forget password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-lg"
        onPress={handleLogin}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
