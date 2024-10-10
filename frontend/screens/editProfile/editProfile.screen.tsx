import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import tailwind from "tailwind-react-native-classnames";

const EditProfileScreen = () => {
  // User profile data, can be fetched from an API
  const [name, setName] = useState("Randini Maliksha");
  const [email, setEmail] = useState("randi@gmail.com");
  const [password, setPassword] = useState("********");
  const [date, setDate] = useState(new Date(1995, 4, 23));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState("Female");
  const [profileImage, setProfileImage] = useState(
    "https://randomuser.me/api/portraits/women/44.jpg"
  );

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View className="h-[120vh] bg-swhite -mt-9 py-4">
      {/* Dark Background Header */}
      <View className=" py-6 items-center justify-center bg-Secondary rounded-b-2xl mb-4">
      <TouchableOpacity onPress={pickImage} className="relative">
          <Image
            source={{ uri: profileImage }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <View className="absolute bottom-0 right-0 bg-white rounded-full p-1">
            <Ionicons name="camera" size={20} color="#000" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <ScrollView className="flex-1 px-3 h-full">
      <View className="mb-4">
        <Text className="mb-1 text-base font-semibold">Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          className="border border-gray-300 px-3 py-2 rounded-lg bg-white"
        />
      </View>

      <View className="mb-4">
        <Text className="mb-1 text-base font-semibold">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          className="border border-gray-300 px-3 py-2 rounded-lg bg-white"
        />
      </View>

      <View className="mb-4">
        <Text className="mb-1 text-base font-semibold">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 px-3 py-2 rounded-lg bg-white"
        />
      </View>

      <View className="mb-4">
        <Text className="mb-1 text-base font-semibold">Date of Birth</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="border border-gray-300 p-3 rounded-lg bg-white"
        >
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeDate}
          />
        )}
      </View>

      <View className="mb-3">
        <Text className="mb-1 text-base font-semibold">Gender</Text>
        <View className="border border-gray-300 rounded-lg bg-white">
          <TextInput
            value={gender}
            editable={false}
            className="border border-gray-300 px-3 py-2 rounded-lg bg-white"
          />
        </View>
      </View>

        {/* Save Changes Button */}
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg mt-4"
          onPress={() => {
            // Add functionality to save changes
          }}
        >
          <Text className="text-center text-white font-bold">Save changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
