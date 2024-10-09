import { View } from 'react-native';
import React from 'react';
import { useGlobalSearchParams } from 'expo-router';
import IntercitySchedulesDet from '@/screens/busType/detailScreens/intercity_schedules_details/intercity.schedules.details.screen';

const IntercityDetails = () => {
  const { id } = useGlobalSearchParams(); // Get the schedule id from the query parameters

  return (
    <View>
      <IntercitySchedulesDet scheduleId={Array.isArray(id) ? id[0] : id || ''} />
    </View>
  );
};

export default IntercityDetails;
