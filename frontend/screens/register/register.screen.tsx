import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Ionicons from "@expo/vector-icons/Ionicons";
import tailwind from "tailwind-react-native-classnames";

const RegisterScreen = () => {
  // State variables
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  return (
    <ScrollView style={tailwind`flex-1 bg-white p-4`}>
      {/* Header */}
      <View style={tailwind`bg-gray-900 py-4`}>
        <Text style={tailwind`text-center text-white text-lg`}>Welcome</Text>
      </View>

      {/* Login/Register Toggle */}
      <View style={tailwind`flex-row justify-center my-6`}>
        <TouchableOpacity>
          <Text style={tailwind`text-gray-500 text-base mx-4`}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={tailwind`text-blue-500 text-base mx-4 underline`}>
            Register
          </Text>
        </TouchableOpacity>
      </View>

      {/* Registration Form */}
      <View style={tailwind`px-6`}>
        {/* Name Field */}
        <Text style={tailwind`text-base text-gray-700 mb-2`}>Your name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          style={tailwind`border-b border-gray-300 pb-2 mb-4`}
        />

        {/* Contact Number Field */}
        <Text style={tailwind`text-base text-gray-700 mb-2`}>
          Contact Number
        </Text>
        <TextInput
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
          placeholder="+977"
          style={tailwind`border-b border-gray-300 pb-2 mb-4`}
        />

        {/* Email Field */}
        <Text style={tailwind`text-base text-gray-700 mb-2`}>
          Email Address
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter your email"
          style={tailwind`border-b border-gray-300 pb-2 mb-4`}
        />

        {/* Password Field */}
        <Text style={tailwind`text-base text-gray-700 mb-2`}>Password</Text>
        <View
          style={tailwind`flex-row items-center border-b border-gray-300 pb-2 mb-4`}
        >
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="Enter your password"
            style={tailwind`flex-1`}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Field */}
        <Text style={tailwind`text-base text-gray-700 mb-2`}>
          Confirm Password
        </Text>
        <View
          style={tailwind`flex-row items-center border-b border-gray-300 pb-2 mb-4`}
        >
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            placeholder="Confirm your password"
            style={tailwind`flex-1`}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Remember Password Checkbox */}
        <View style={tailwind`flex-row items-center mb-6`}>
          <CheckBox
            value={rememberPassword}
            onValueChange={setRememberPassword}
          />
          <Text style={tailwind`ml-2 text-gray-700`}>Remember password</Text>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={tailwind`bg-blue-500 p-4 rounded-lg`}
          onPress={() => {
            // Handle registration process here
            alert("Proceeding to the next step...");
          }}
        >
          <Text style={tailwind`text-white text-center text-lg`}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
