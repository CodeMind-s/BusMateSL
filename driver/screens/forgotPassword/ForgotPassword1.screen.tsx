import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

const FirstForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Implement password reset functionality
    console.log('Reset password for:', email);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#F9FAFB' }}>
      {/* Back Button */}
      <TouchableOpacity style={{ padding: 10 }}>
        {/* This can be replaced with an actual icon */}
        <Text style={{ fontSize: 24, color: '#333' }}>{'<'}</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
          Forgot password
        </Text>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 30 }}>
          Please enter your email to reset the password
        </Text>

        <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 5 }}>
          Your Email
        </Text>
        <TextInput
          style={{
            height: 50,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            marginBottom: 20,
            backgroundColor: '#FFF',
          }}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#007BFF',
            paddingVertical: 15,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={handleResetPassword}
        >
          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '600' }}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FirstForgotPasswordScreen;
