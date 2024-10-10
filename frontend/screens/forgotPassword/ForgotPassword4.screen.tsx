import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

const SetNewPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleUpdatePassword = () => {
    // Implement password update functionality
    console.log('Password updated');
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#F9FAFB' }}>
      {/* Back Button */}
      <TouchableOpacity style={{ padding: 10 }}>
        <Text style={{ fontSize: 24, color: '#333' }}>{'<'}</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
          Set a new password
        </Text>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 30 }}>
          Create a new password. Ensure it differs from previous ones for security.
        </Text>

        {/* Password Input */}
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 5 }}>
          Password
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <TextInput
            style={{
              flex: 1,
              height: 50,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 15,
              backgroundColor: '#FFF',
            }}
            placeholder="Enter new password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
            <Text style={{ marginLeft: 10, color: '#666' }}>{isPasswordVisible ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 5 }}>
          Confirm Password
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <TextInput
            style={{
              flex: 1,
              height: 50,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 15,
              backgroundColor: '#FFF',
            }}
            placeholder="Confirm new password"
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}>
            <Text style={{ marginLeft: 10, color: '#666' }}>{isConfirmPasswordVisible ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        {/* Update Password Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#007BFF',
            paddingVertical: 15,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={handleUpdatePassword}
        >
          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '600' }}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SetNewPasswordScreen;
