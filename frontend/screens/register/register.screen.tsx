import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView, // Import ScrollView
} from "react-native";
import CheckBox from "expo-checkbox";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { post } from "@/helpers/api";

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

  const handleRegister = async () => {
    // Prepare the data to be sent
    const data = {
      name,
      contact: contactNumber,
      email,
      password,
    };

    try {
      console.log(`data => `, data);
      await post("users", data);
      // const result = await response.json();
      // console.log('Registration successful:', response);
      // Handle successful registration (e.g., navigate to another screen)
      alert("Registration successful!");
      router.push("/(routes)/login");
    } catch (error) {
      console.error("Error registering:", error);
      // Handle error (e.g., show an error message)
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <ScrollView // Wrap the main content in ScrollView
      contentContainerStyle={{ flexGrow: 1 }} // Ensure content takes full height
      keyboardShouldPersistTaps="handled" // Allows tapping outside of keyboard to dismiss it
    >
      <View>
        <View className="items-center mt-6">
          <Image
            source={require("../../assets/images/logo.png")} // Replace with your logo path
            className="w-32 h-16"
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 20,
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={() => router.push("/(routes)/login")}>
            <Text
              style={{ color: "#9CA3AF", fontSize: 16, marginHorizontal: 10 }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                color: "#3B82F6",
                fontSize: 16,
                marginHorizontal: 10,
                textDecorationLine: "underline",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View className="p-5">
          <Text style={{ fontSize: 16, color: "#374151", marginBottom: 5 }}>
            Your name
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            style={{
              borderBottomColor: "#D1D5DB",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 20,
            }}
          />

          <Text style={{ fontSize: 16, color: "#374151", marginBottom: 5 }}>
            Contact Number
          </Text>
          <TextInput
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
            placeholder="+977"
            style={{
              borderBottomColor: "#D1D5DB",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 20,
            }}
          />

          <Text style={{ fontSize: 16, color: "#374151", marginBottom: 5 }}>
            Email Address
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email"
            style={{
              borderBottomColor: "#D1D5DB",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 20,
            }}
          />

          <Text style={{ fontSize: 16, color: "#374151", marginBottom: 5 }}>
            Password
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "#D1D5DB",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 20,
            }}
          >
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
              style={{ flex: 1 }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 16, color: "#374151", marginBottom: 5 }}>
            Confirm Password
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: "#D1D5DB",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 20,
            }}
          >
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholder="Confirm your password"
              style={{ flex: 1 }}
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

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <CheckBox
              value={rememberPassword}
              onValueChange={setRememberPassword}
            />
            <Text style={{ marginLeft: 10, color: "#374151" }}>
              Remember password
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#3B82F6",
              paddingVertical: 15,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={handleRegister} // Call the handleRegister function
          >
            <Text style={{ color: "#FFF", fontSize: 16 }}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
