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
    <ScrollView style={{ flex: 1, backgroundColor: '#F9FAFB', padding: 20 }}>
      {/* Header */}
      <View style={{ backgroundColor: '#1F2937', paddingVertical: 15 }}>
        <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 18 }}>
          Welcome
        </Text>
      </View>

      {/* Login/Register Toggle */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
        <TouchableOpacity>
          <Text style={{ color: '#9CA3AF', fontSize: 16, marginHorizontal: 10 }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: '#3B82F6', fontSize: 16, marginHorizontal: 10, textDecorationLine: 'underline' }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>

      {/* Registration Form */}
      <View>
        {/* Name Field */}
        <Text style={{ fontSize: 16, color: '#374151', marginBottom: 5 }}>Your name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          style={{
            borderBottomColor: '#D1D5DB',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 20
          }}
        />

        {/* Contact Number Field */}
        <Text style={{ fontSize: 16, color: '#374151', marginBottom: 5 }}>Contact Number</Text>
        <TextInput
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
          placeholder="+977"
          style={{
            borderBottomColor: '#D1D5DB',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 20
          }}
        />

        {/* Email Field */}
        <Text style={{ fontSize: 16, color: '#374151', marginBottom: 5 }}>Email Address</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter your email"
          style={{
            borderBottomColor: '#D1D5DB',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 20
          }}
        />

        {/* Password Field */}
        <Text style={{ fontSize: 16, color: '#374151', marginBottom: 5 }}>Password</Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: '#D1D5DB',
          borderBottomWidth: 1,
          paddingBottom: 8,
          marginBottom: 20
        }}>
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

        {/* Confirm Password Field */}
        <Text style={{ fontSize: 16, color: '#374151', marginBottom: 5 }}>Confirm Password</Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: '#D1D5DB',
          borderBottomWidth: 1,
          paddingBottom: 8,
          marginBottom: 20
        }}>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            placeholder="Confirm your password"
            style={{ flex: 1 }}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Remember Password Checkbox */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
          <CheckBox
            value={rememberPassword}
            onValueChange={setRememberPassword}
          />
          <Text style={{ marginLeft: 10, color: '#374151' }}>Remember password</Text>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#3B82F6',
            paddingVertical: 15,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={() => {
            // Handle registration process here
            alert("Proceeding to the next step...");
          }}
        >
          <Text style={{ color: '#FFF', fontSize: 16 }}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
