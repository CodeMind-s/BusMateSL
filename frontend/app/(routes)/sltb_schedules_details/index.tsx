import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalSearchParams } from 'expo-router';
import SLTB_Schedules_Details from '@/screens/busType/detailScreens/sltb_schedules_details/sltb.schedules.details';



const SltbDetails = () => {
    const { id } = useGlobalSearchParams(); // Get the schedule id from the query parameters
  
    return (
      <View>
        <SLTB_Schedules_Details scheduleId={Array.isArray(id) ? id[0] : id || ''} />
      </View>
    );
  };

export default SltbDetails