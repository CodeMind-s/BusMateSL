import { post } from '@/helpers/api';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';

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
  const [password1, setPassword1] = useState('');
  const [busName, setBusName] = useState('');
  const [routeNumber, setRouteNumber] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false); 
  const [formError, setFormError] = useState('')

  const handleRegister = async () => {

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
      console.log("regesterd successfuly",response);
      Alert.alert("Success", "Registered successfully.");

      router.push("/(routes)/login");
    } catch (error) {
      console.error("Error during bus registration:", error);
    }
  };

  useEffect(() => {
    validateForm();
  }, [driverNumber, conductorNumber, vehicleNumber, fromLocation, toLocation, email, phoneNumber, password, password1, routeNumber]);

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;
    const vehicleRegex = /^[A-Za-z0-9]{7}$/;
    const locationRegex = /^[A-Za-z ]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{5,}$/;

    const isValidDriverNumber = phoneRegex.test(driverNumber);
    const isValidConductorNumber = phoneRegex.test(conductorNumber);
    const isValidVehicleNumber = vehicleRegex.test(vehicleNumber);
    const isValidEmail = email.includes('@') && email.includes('.');
    const isValidPhoneNumber = phoneRegex.test(phoneNumber);
    const isValidRouteNumber = routeNumber.length <= 3 && /^[0-9]+$/.test(routeNumber);
    const isValidPassword = passwordRegex.test(password);
    const isPasswordsMatch = password === password1;

    setIsFormValid(
      isValidDriverNumber &&
      isValidConductorNumber &&
      isValidVehicleNumber &&
      isValidEmail &&
      isValidPhoneNumber &&
      isValidRouteNumber &&
      isValidPassword &&
      isPasswordsMatch
    );

    if(!isValidDriverNumber){
      setFormError("Driver number must 10 numbers!")
    }
    else if(!isValidConductorNumber){
      setFormError("Conductor number must 10 numbers!")
    }
    else if(!isValidVehicleNumber){
      setFormError("Invalide Vehicle number!")
    }
    else if(!isValidEmail){
      setFormError("Invalide Email Address!")
    }
    else if(!isValidPhoneNumber){
      setFormError("Invalide Phone Number!")
    }
    else if(!isValidRouteNumber){
      setFormError("Invalide Route Number!")
    }
    else if(!isValidPassword){
      setFormError("Password must contain at least one uppercase letter, one lowercase letter, one number, one symbol, and be at least 5 characters long!")
    }
    else if(!isPasswordsMatch){
      setFormError("Passwords mismatch!")
    }
    else{
      setFormError("")
    }
  };

  const [emailError, setEmailError] = useState(false); 

    const validateEmail = (email: string) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    };



  const validatePassword = (password: string) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    return passwordPattern.test(password);
  };


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, backgroundColor: '#F9FAFB' }}>
      <Image
          source={require("../../assets/images/logo.png")} 
          className="w-32 h-16 mx-auto mb-3"
          resizeMode="contain"
        />

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
            placeholder="735xxxxxxx"
            value={driverNumber}
            onChangeText={text => setDriverNumber(text.replace(/[^0-9]/g, '').slice(0, 10))}
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
            placeholder="785xxxxxxx"
            value={conductorNumber}
            onChangeText={text => setConductorNumber(text.replace(/[^0-9]/g, '').slice(0, 10))}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
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
            placeholder="Enter Vehicle No."
            value={vehicleNumber}
            onChangeText={text => {
              const letters = text.replace(/[^A-Za-z]/g, '').slice(0, 3);
              const numbers = text.replace(/[^0-9]/g, '').slice(0, 4);
              setVehicleNumber(letters + numbers);
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
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
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>Start Location</Text>
          <TextInput
            style={{
              height: 50,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 15,
              backgroundColor: '#FFF',
            }}
            placeholder="From"
            value={fromLocation}
            onChangeText={text => {
              const filteredText = text.replace(/[^A-Za-z\s]/g, '');
              setFromLocation(filteredText);
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>End Location</Text>
          <TextInput
            style={{
              height: 50,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 15,
              backgroundColor: '#FFF',
            }}
            placeholder="Destination"
            value={toLocation}
            onChangeText={text => {
              const filteredText = text.replace(/[^A-Za-z\s]/g, '');
              setToLocation(filteredText);
            }}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>Route Number</Text>
          <TextInput
            style={{
              height: 50,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 15,
              backgroundColor: '#FFF',
            }}
            placeholder="14"
            value={routeNumber}
            onChangeText={text => setRouteNumber(text.replace(/[^0-9]/g, '').slice(0, 3))}
            keyboardType='numeric'
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>Estimated Time</Text>
          <TextInput
            style={{
              height: 50,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 15,
              backgroundColor: '#FFF',
            }}
            placeholder="2H 30Min"
            value={estimatedTime}
            onChangeText={text => {
              const filteredText = text.replace(/[^0-9HM\s]/g, ''); 
              setEstimatedTime(filteredText);
            }}
          />
        </View>
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>Email</Text>
        <TextInput
          style={{
            height: 50,
            borderColor: emailError ? 'red' : '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            backgroundColor: '#FFF',
          }}
          placeholder="Enter Email"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setEmailError(!validateEmail(text)); // Set error state based on validation
          }}
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
          onChangeText={text => setPhoneNumber(text.replace(/[^0-9]/g, '').slice(0, 10))}
          keyboardType="phone-pad"
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>Bus Name</Text>
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
          value={busName}
          onChangeText={setBusName}
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

      <View style={{ marginBottom: 15 }}>
        <Text style={{ marginBottom: 5, color: '#333', fontWeight: '600' }}>Re-Enter Password</Text>
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
          value={password1}
          onChangeText={setPassword1}
          secureTextEntry
        />
      </View>

      {!isFormValid && (<Text className=' text-red-500'>{formError}</Text>)}

      {isFormValid ? (<TouchableOpacity
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
      </TouchableOpacity>) : (
        <TouchableOpacity
        style={{
          backgroundColor: '#A1A1A1',
          padding: 15,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>Register</Text>
      </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default RegisterScreen;
