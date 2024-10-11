import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const BusDetailsCard = () => {
  return (
    <View className=' mt-5 p-3 border-2 rounded-xl border-gray-300'>
      <View className=' w-full flex flex-row justify-start items-center'>
        <Ionicons name="bus" size={25} color="#3B6DE7" />
        <Text className=' ml-3 font-semibold text-lg text-center text-black'>Saravana Travels</Text>
      </View>
      <View className=' w-full flex flex-row justify-start items-center mt-2'>
        <Ionicons name="time-outline" size={18} color="#A1A1A1" />
        <Text className=' ml-2 text-sm text-center text-[#A1A1A1]'>Saravana Travels</Text>
      </View>
      <View className=' w-full flex flex-row justify-start items-center mt-1'>
        <MaterialIcons name="error-outline" size={18} color="#A1A1A1" />
        <Text className=' ml-2 text-sm text-center text-[#A1A1A1]'>Free WiFi | Full AC | USB Charging | Highway</Text>
      </View>
      <View className=' w-full flex flex-row justify-start items-center mt-1'>
        <Ionicons name="star-outline" size={18} color="#A1A1A1" />
        <Text className=' ml-2 text-sm text-center text-[#A1A1A1]'>4.5 ratings</Text>
      </View>
    </View>
  )
}

export default BusDetailsCard