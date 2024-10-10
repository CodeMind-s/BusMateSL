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

  const handleRegister = () => {
    // Implement your registration logic here
    console.log('Registration details:', {
      driverNumber,
      conductorNumber,
      vehicleNumber,
      fromLocation,
      toLocation,
      email,
      phoneNumber,
      seatCount,
      password,
    });
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
