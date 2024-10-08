import { View, Text } from 'react-native';
import React from 'react';
import OnboardingScreen from '../../../screens/onboarding/onboarding.screen';

// Define the props interface
interface OnboardingProps {
  onComplete: () => void; // Define the type of onComplete as a function
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  return (
    <View>
      <OnboardingScreen onComplete={onComplete} />
    </View>
  );
};

export default Onboarding;
