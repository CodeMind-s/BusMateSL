import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

const PasswordResetConfirmScreen = () => {
  const handleConfirm = () => {
    // Implement confirm action, such as navigating to the new password screen
    console.log('Password reset confirmed');
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#F9FAFB' }}>
      {/* Back Button */}
      <TouchableOpacity style={{ padding: 10 }}>
        <Text style={{ fontSize: 24, color: '#333' }}>{'<'}</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
          Password reset
        </Text>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 30 }}>
          Your password has been successfully reset. Click confirm to set a new password.
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: '#007BFF',
            paddingVertical: 15,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={handleConfirm}
        >
          <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '600' }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordResetConfirmScreen;
