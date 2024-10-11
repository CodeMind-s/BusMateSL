import { post } from '@/helpers/api';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const RegisterScreen = () => {
  const [driverNumber, setDriverNumber] = useState('');
  const [conductorNumber, setConductorNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [seatCount, setSeatCount] = useState('');
  const [password, setPassword] = useState('');
  const [busName, setBusName] = useState('bus123');
  const [routeNumber, setRouteNumber] = useState('1');
  const [estimatedTime, setEstimatedTime] = useState('00');
  const [amenities, setAmenities] = useState([]);

  // const handleRegister = () => {
  //   // Implement your registration logic here
  //   console.log('Registration details:', {
  //     driverNumber,
  //     conductorNumber,
  //     vehicleNumber,
  //     fromLocation,
  //     toLocation,
  //     email,
  //     phoneNumber,
  //     seatCount,
  //     password,
  //   });
  // };

  const handleRegister = async () => {
    // Handle the payment logic here
    // console.log("Payment details =>", {
    //   name,
    //   cardNumber,
    //   cvv,
    //   expiry,
    // });

    try {
      const response = await post("buses", {
        driverNumber,
        conductorNumber,
        busNumber: vehicleNumber,
        type: 'Luxury',
        from: fromLocation,
        to: toLocation,
        email,
        busName,
        routeNumber ,
        estimatedTime,
        phoneNumber,
        seatCount,
        password,
        amenities
      });
      // Assert the type of booking.data
      // const bookingData = response.data as { _id: string };
      console.log("regesterd successfuly",response);

      // Redirect to the success screen
      router.push("/(routes)/login");
    } catch (error) {
      // generate toast here
      console.error("Error during bus registration:", error);
      // Handle error appropriately, e.g., show an alert or notification
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: '#F9FAFB' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20,marginTop: 30, textAlign: 'center' }}>
        Register
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>Driver Number</Text>
          <TextInput
            style={{
              height: 50,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 15,
              backgroundColor: '#FFF',
            }}
            placeholder="Enter Driver Number"
            value={driverNumber}
            onChangeText={setDriverNumber}
            keyboardType="numeric"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>Conductor Number</Text>
          <TextInput
            style={{
              height: 50,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 15,
              backgroundColor: '#FFF',
            }}
            placeholder="Enter Conductor Number"
            value={conductorNumber}
            onChangeText={setConductorNumber}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>Vehicle Number</Text>
        <TextInput
          style={{
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            backgroundColor: '#FFF',
          }}
          placeholder="Enter Vehicle Number"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>From Location</Text>
          <TextInput
            style={{
              height: 50,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 15,
              backgroundColor: '#FFF',
            }}
            placeholder="Enter From Location"
            value={fromLocation}
            onChangeText={setFromLocation}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>To Location</Text>
          <TextInput
            style={{
              height: 50,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 15,
              backgroundColor: '#FFF',
            }}
            placeholder="Enter To Location"
            value={toLocation}
            onChangeText={setToLocation}
          />
        </View>
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>Email</Text>
        <TextInput
          style={{
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            backgroundColor: '#FFF',
          }}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      
      <View style={{ marginBottom: 15 }}>
        <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>Phone Number</Text>
        <TextInput
          style={{
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            backgroundColor: '#FFF',
          }}
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>Seat Count</Text>
        <TextInput
          style={{
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            backgroundColor: '#FFF',
          }}
          placeholder="Enter Seat Count"
          value={seatCount}
          onChangeText={setSeatCount}
          keyboardType="numeric"
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>Set Password</Text>
        <TextInput
          style={{
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            backgroundColor: '#FFF',
          }}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#007BFF',
          padding: 15,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 20,
        }}
        onPress={handleRegister}
      >
        <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;
