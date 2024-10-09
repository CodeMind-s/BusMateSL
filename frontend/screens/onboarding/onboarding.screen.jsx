import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import image1 from '../../assets/onboarding/onboarding_1.png';
import image2 from '../../assets/onboarding/onboarding_2.png';
import image3 from '../../assets/onboarding/onboarding_3.png';
import { Ionicons } from '@expo/vector-icons';

const OnboardingScreen = ({ onComplete }) => { // Changed from setShowOnboarding to onComplete
  const [currentScreen, setCurrentScreen] = useState(0);


  const splashScreens = [
    {
      id: 1,
      title1: "Book Your",
      title2: "Tickets Easily",
      image: image1,
      text: 'Say goodbye to long queues! Browse bus schedules and reserve your seat instantly with our simple booking system.'
    },
    {
      id: 2,
      title1: "Track Your Bus",
      title2: "in Real-Time",
      image: image2,
      text: 'Never miss your bus again. Track routes and get live updates on arrival times for a seamless travel experience.'
    },
    {
      id: 3,
      title1: "Secure & Convenient",
      title2: "Payments",
      image: image3,
      text: 'Pay for your tickets easily with multiple payment options. Fast, secure, and hassle-free transactions.'
    },
  ];

  const handleNext = () => {
    if (currentScreen < splashScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onComplete(); // Call onComplete to notify that onboarding is finished
    }
  };

  return (
    <View className='h-full bg-swhite'>
      <View className='flex justify-center items-center h-[70%] p-4 mt-16'>
        <View className='w-full mb-7 flex items-center justify-end flex-row'>
          <TouchableOpacity onPress={handleNext}>
            {splashScreens[currentScreen].id !== 3 ? (
              <Text className='text-[#A1A1A1] text-[18px] font-bold text-right pr-4 pt-3'>Skip</Text>
            ) : (
              <Text></Text>
            )}
          </TouchableOpacity>
        </View>
        <Image className='' source={splashScreens[currentScreen].image} />
        <Text className={`${splashScreens[currentScreen].id === 3 ? 'text-[32px]' : 'text-[38px]'} font-bold text-left w-full mt-4`}>
          <Text>{splashScreens[currentScreen].title1}{'\n'}{splashScreens[currentScreen].title2}</Text>
        </Text>
        <Text className='text-[#A1A1A1] text-[20px] text-left w-full mt-5'>
          {splashScreens[currentScreen].text}
        </Text>
      </View>
      <View className=' h-[20%] flex flex-row justify-between items-center'>
        <View className='flex flex-row'>
          <View className={`ml-5 h-[15px] rounded-full ${splashScreens[currentScreen].id === 1 ? 'w-[30px] bg-primary' : 'aspect-square bg-slate-300'}`}></View>
          <View className={`ml-2 h-[15px] rounded-full ${splashScreens[currentScreen].id === 2 ? 'w-[30px] bg-primary' : 'aspect-square bg-slate-300'}`}></View>
          <View className={`ml-2 h-[15px] rounded-full ${splashScreens[currentScreen].id === 3 ? 'w-[30px] bg-primary' : 'aspect-square bg-slate-300'}`}></View>
        </View>
        <TouchableOpacity onPress={handleNext} className={`bg-primary p-3 mr-5 ${splashScreens[currentScreen].id === 3 ? 'rounded-md px-4' : 'rounded-full'}`}>
          {splashScreens[currentScreen].id !== 3 ? (
            <Ionicons name="arrow-forward" size={30} color="white" />
          ) : (
            <Text className='text-white font-semibold'>Get Started</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
