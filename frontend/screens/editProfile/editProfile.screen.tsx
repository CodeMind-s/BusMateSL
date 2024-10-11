import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import tailwind from "tailwind-react-native-classnames";
import { get, put } from "@/helpers/api"; // Import put function
import { AuthContext } from "@/contexts/AuthContext";

interface UserProps {
  _id: string;
  name: string;
  email: string;
  dateofbirth: string;
  gender: string;
  contact: string;
  profileImage: string;
}

const EditProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://randomuser.me/api/portraits/men/34.jpg"
  );
  const [userData, setUserData] = useState<UserProps | null>(null);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "TicketContext or AuthContext must be used within a TicketProvider or AuthProvider"
    );
  }
  const { id: userId } = authContext;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await get(`users/${userId}`);
        const user = response.data as UserProps;
        setUserData(user);
        setName(user.name);
        setEmail(user.email);
        setContact(user.contact);
        setDate(new Date(user.dateofbirth));
        setGender(user.gender);
        setProfileImage(user.profileImage || profileImage);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  console.log(`dateofbirth => `, userData);
  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
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

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        name,
        contact,
        email,
        dateofbirth: date.toISOString().split("T")[0], // Format to 'YYYY-MM-DD'
      };

      const response = await put(`users/${userId}`, updatedData);
      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully");
      } else {
        Alert.alert("Error", "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "An error occurred while updating the profile");
    }
  };

  return (
    <View className="h-[120vh] bg-w m-5 py-4">

      {/* Dark Background Header */}
      <View className="flex items-center justify-start bg-Secondary rounded-b-2xl -mt-6 py-6 mb-4">
        <TouchableOpacity onPress={pickImage} className="relative">
          <Image
            source={{ uri: profileImage }}
            className="w-24 h-24 rounded-full mb-4"
          />
          {/* <View className="absolute bottom-0 right-0 bg-primary rounded-full p-1">
            <Ionicons name="camera" size={20} color="white" />
          </View> */}
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <ScrollView className="flex-1 px-4">
        <View className="mb-3">
          <Text className="mb-1 text-base font-semibold">Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="border border-gray-300 p-3 rounded-lg bg-white"
          />
        </View>


        <View className="mb-3">
          <Text className="mb-1 text-base font-semibold">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            className="border border-gray-300 text-sm p-3 rounded-lg bg-white"

          />
        </View>

        <View className="mb-3">
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
              value={"Male"}
              editable={false}
              className="h-12 p-3 text-"
            />
          </View>
        </View>
        <View className="mb-3">
          <Text className="mb-1 text-base font-semibold">Contact</Text>
          <View className="border border-gray-300 rounded-lg bg-white">
            <TextInput
              value={contact}
              editable={true}
              className="h-12 p-3"
            />
          </View>
        </View>

        {/* Save Changes Button */}
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg mt-4"
          onPress={handleSaveChanges} // Call the handleSaveChanges function
        >
          <Text className="text-center text-white font-bold">Save changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
