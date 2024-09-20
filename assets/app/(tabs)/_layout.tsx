import { View, Text, TouchableOpacity } from 'react-native'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const TabLayout = () => {
  return (
    <Tabs
        screenOptions={{
            headerLeft: ()=><TouchableOpacity>
                <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
            </TouchableOpacity>
        }}>
        <Tabs.Screen></Tabs.Screen>
    </Tabs>
  )
}

export default TabLayout
