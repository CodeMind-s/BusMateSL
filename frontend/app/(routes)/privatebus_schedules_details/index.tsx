import { View, Text } from 'react-native';
import React from 'react';
import { useGlobalSearchParams } from 'expo-router';
import PrivateBus_Schedules_Details from '@/screens/busType/detailScreens/privatebus_schedules_details/privatebus.schedules.details';

const PrivateBusDetails = () => {
  const { id } = useGlobalSearchParams(); // Get the schedule id from the query parameters

  return (
    <View>
      <PrivateBus_Schedules_Details scheduleId={Array.isArray(id) ? id[0] : id || ''} />
    </View>
  );
};

export default PrivateBusDetails;
