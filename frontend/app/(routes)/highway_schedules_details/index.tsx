import { View } from 'react-native';
import React from 'react';
import { useGlobalSearchParams } from 'expo-router';
import HighwaySchedulesDet from '@/screens/busType/detailScreens/highway_schedules_details/highway.schedules.details.screen';

const HighwayDetails = () => {
  const { id } = useGlobalSearchParams(); // Get the schedule id from the query parameters

  return (
    <View>
      <HighwaySchedulesDet scheduleId={Array.isArray(id) ? id[0] : id || ''} />
    </View>
  );
};

export default HighwayDetails;
