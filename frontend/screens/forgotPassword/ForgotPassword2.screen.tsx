import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

const VerifyCodeScreen = () => {
  const [code, setCode] = useState(Array(5).fill(''));

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handleVerifyCode = () => {
    // Implement verification logic
    console.log('Entered code:', code.join(''));
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#F9FAFB' }}>
      {/* Back Button */}
      <TouchableOpacity style={{ padding: 10 }}>
        <Text style={{ fontSize: 24, color: '#333' }}>{'<'}</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
          Check your email
        </Text>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 30 }}>
          We sent a reset link to h*********@gmail.com
          {'\n'}Enter the 5-digit code mentioned in the email
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={{
                height: 50,
                width: 50,
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 8,
                textAlign: 'center',
                fontSize: 18,
                backgroundColor: '#FFF',
              }}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#007BFF',
            paddingVertical: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 20,
          }}
          onPress={handleVerifyCode}
        >
          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '600' }}>Verify Code</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={{ fontSize: 14, color: '#007BFF', textAlign: 'center' }}>
            Haven't got the email yet? <Text style={{ fontWeight: '600' }}>Resend email</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyCodeScreen;
