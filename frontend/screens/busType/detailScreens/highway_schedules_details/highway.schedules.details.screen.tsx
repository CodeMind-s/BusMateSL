import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

// Define the expected prop type
interface HighwaySchedulesDetProps {
  scheduleId: string; // Adjust the type according to your needs
}

const HighwaySchedulesDet: React.FC<HighwaySchedulesDetProps> = ({
  scheduleId,
}) => {
  const [schedules, setSchedules] = useState([
    {
      id: "1",
      from: "Kurunegala",
      to: "Colombo",
      routeNo: "159",
      distance: "93.5",
      timetaken: "2Hrs 50min",
      contact: "0779140197",
      price: "850.00",
      starttime: [
        "06.00 AM",
        "07.00 AM",
        "08.00 AM",
        "09.00 AM",
        "10.00 AM",
        "11.00 AM",
        "12.00 PM",
        "01.00 PM",
        "02.00 PM",
        "03.00 PM",
      ],
    },
    {
      id: "2",
      from: "Galle",
      to: "Colombo",
      routeNo: "255",
      distance: "120",
      timetaken: "3Hrs",
      contact: "0779140198",
      price: "950.00",
      starttime: [
        "06.00 AM",
        "07.00 AM",
        "08.00 AM",
        "09.00 AM",
        "10.00 AM",
        "11.00 AM",
        "12.00 PM",
        "01.00 PM",
        "02.00 PM",
        "03.00 PM",
      ],
    },
    {
      id: "3",
      from: "Kandy",
      to: "Jaffna",
      routeNo: "304",
      distance: "225",
      timetaken: "6Hrs",
      contact: "0779140199",
      price: "1500.00",
      starttime: [
        "06.00 AM",
        "07.00 AM",
        "08.00 AM",
        "09.00 AM",
        "10.00 AM",
        "11.00 AM",
        "12.00 PM",
        "01.00 PM",
        "02.00 PM",
        "03.00 PM",
      ],
    },
    {
      id: "4",
      from: "Colombo",
      to: "Kurunegala",
      routeNo: "444",
      distance: "180",
      timetaken: "4Hrs 15min",
      contact: "0779140123",
      price: "1200.00",
      starttime: [
        "05.45 AM",
        "06.45 AM",
        "07.45 AM",
        "08.45 AM",
        "09.45 AM",
        "10.45 AM",
        "11.45 AM",
        "12.45 PM",
        "01.45 PM",
        "02.45 PM",
      ],
    },
  ]);

  // Find the schedule based on the provided scheduleId
  const schedule = schedules.find((schedule) => schedule.id === scheduleId);

  // Find the matching schedule where 'from' is equal to the original's 'to' and 'to' is equal to the original's 'from'
  const matchedSchedule = schedules.find(
    (s) => s.from === schedule?.to && s.to === schedule?.from
  );

  // Extract the start times of the matched schedule if it exists
  const matchedStartTimes = matchedSchedule ? matchedSchedule.starttime : [];

  return (
    <ScrollView className="-mt-5 bg-swhite">
      {schedule ? (
        <View className="w-full h-full">
          <View className="w-full h-[250px]">
            <ImageBackground
              source={require("../../../../assets/images/busTypes/highway.jpg")}
              style={{ flex: 1 }}
              imageStyle={{ opacity: 0.5 }}
              className="w-full h-full bg-black"
            >
              <View className="flex justify-end h-full pb-3">
                <Text className="text-[30px] text-center font-extrabold text-white mb-4">
                  {schedule.from} - {schedule.to}
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View className="h-[130px] flex flex-row w-full">
            <View className="w-[40%] p-5">
              <View className="bg-primary w-full h-full rounded-2xl flex justify-center items-center">
                <Text className="text-white text-[36px] font-extrabold mb-0">
                  {schedule.routeNo}
                </Text>
                <Text className="text-white text-[24px] -mt-3">Route</Text>
              </View>
            </View>
            <View className="px-2 flex justify-around py-5">
              <View className="flex flex-row">
                <Text className="text-[16px] font-bold">Distance :</Text>
                <Text className="text-[16px] "> {schedule.distance} KM</Text>
              </View>
              <View className="flex flex-row">
                <Text className="text-[16px] font-bold">Time Taken :</Text>
                <Text className="text-[16px] "> {schedule.timetaken}</Text>
              </View>
              <View className="flex flex-row">
                <Text className="text-[16px] font-bold">Contact :</Text>
                <Text className="text-[16px] "> {schedule.contact}</Text>
              </View>
              <View className="flex flex-row">
                <Text className="text-[16px] font-bold">Ticket Price :</Text>
                <Text className="text-[16px] font-bold">
                  {" "}
                  Rs. {schedule.price}
                </Text>
              </View>
            </View>
          </View>

          {/* First schedule start times */}
          <View className="mb-5 mx-4 pt-5 px-5 h-[250px] border-[2px] rounded-2xl border-tertiary flex justify-between">
            <View>
              <Text className="text-[18px] font-bold">
                From {schedule.from}
              </Text>
            </View>
            <ScrollView nestedScrollEnabled={true}>
              <View className="w-full">
                {schedule.starttime.map((time, index) => (
                  <View
                    key={index}
                    className="w-full p-2 border-b-2 border-tertiary flex flex-row justify-between items-center"
                  >
                    <View className="flex justify-center items-center w-[50%]">
                      <Text className="text-[16px]">{time}</Text>
                    </View>
                    <TouchableOpacity className="px-5 py-1 bg-primary rounded">
                      <Text className="text-[16px] text-white font-bold">
                        Reserve Seat
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View className="flex items-center h-6">
              <Text className="text-[14px] font-bold text-primary">
                See More...
              </Text>
            </View>
          </View>

          {/* Second schedule start times */}
          <View className="mb-5 mx-4 pt-5 px-5 h-[250px] border-[2px] rounded-2xl border-tertiary flex justify-between">
            <View>
              <Text className="text-[18px] font-bold">From {schedule.to}</Text>
            </View>
            <ScrollView nestedScrollEnabled={true}>
              <View className="w-full">
                {matchedStartTimes.map((time, index) => (
                  <View
                    key={index}
                    className="w-full p-2 border-b-2 border-tertiary flex flex-row justify-between items-center"
                  >
                    <View className="flex justify-center items-center w-[50%]">
                      <Text className="text-[16px]">{time}</Text>
                    </View>
                    <TouchableOpacity className="px-5 py-1 bg-primary rounded">
                      <Text className="text-[16px] text-white font-bold">
                        Reserve Seat
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View className="flex items-center h-6">
              <Text className="text-[14px] font-bold text-primary">
                See More...
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text>No schedule found for this ID.</Text>
      )}
    </ScrollView>
  );
};

export default HighwaySchedulesDet;
