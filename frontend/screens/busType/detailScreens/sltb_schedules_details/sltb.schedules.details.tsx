import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

// Define the expected prop type
interface SLTBSchedulesDetProps {
  scheduleId: string; // Adjust the type according to your needs
}

const SLTB_Schedules_Details: React.FC<SLTBSchedulesDetProps> = ({
  scheduleId,
}) => {
  const [schedules, setSchedules] = useState([
    {
      id: "1",
      from: "Colombo",
      to: "Panadura",
      routeNo: "101",
      distance: "35",
      timetaken: "1Hr 15min",
      contact: "0779140100",
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
      haults: [
        "Pettah",
        "Fort",
        "Galle Face",
        "Kollupitiya Duplication Road",
        "Keselwatta Duplication Road",
        "Bambalapitiya Duplication Road",
        "Wellawatta",
        "Dehiwala",
        "Mt. Lavinia (Galkissa)",
        "Ratmalana",
        "Moratuwa",
        "Old Galle Road",
        "Walana",
        "Panadura",
      ],
    },
    {
      id: "2",
      from: "Kandy",
      to: "Jaffna",
      routeNo: "202",
      distance: "225",
      timetaken: "6Hrs",
      contact: "0779140101",
      starttime: [
        "05.30 AM",
        "06.30 AM",
        "07.30 AM",
        "08.30 AM",
        "09.30 AM",
        "10.30 AM",
        "11.30 AM",
        "12.30 PM",
        "01.30 PM",
        "02.30 PM",
      ],
      haults: [
        "Kaduwela",
        "Malabe",
        "Kothalawala",
        "Koswatta",
        "Baththaramulla",
        "Rajagiriya",
        "Kollupiti",
      ],
    },
    {
      id: "3",
      from: "Galle",
      to: "Colombo",
      routeNo: "303",
      distance: "120",
      timetaken: "2Hrs 45min",
      contact: "0779140102",
      starttime: [
        "06.15 AM",
        "07.15 AM",
        "08.15 AM",
        "09.15 AM",
        "10.15 AM",
        "11.15 AM",
        "12.15 PM",
        "01.15 PM",
        "02.15 PM",
        "03.15 PM",
      ],
      haults: [
        "Kaduwela",
        "Malabe",
        "Kothalawala",
        "Koswatta",
        "Baththaramulla",
        "Rajagiriya",
        "Kollupiti",
      ],
    },
    {
      id: "4",
      from: "Panadura",
      to: "Colombo",
      routeNo: "303",
      distance: "120",
      timetaken: "2Hrs 45min",
      contact: "0779140102",
      starttime: [
        "06.15 AM",
        "07.15 AM",
        "08.15 AM",
        "09.15 AM",
        "10.15 AM",
        "11.15 AM",
        "12.15 PM",
        "01.15 PM",
        "02.15 PM",
        "03.15 PM",
      ],
      haults: [
        "Pettah",
        "Fort",
        "Galle Face",
        "Kollupitiya Duplication Road",
        "Keselwatta Duplication Road",
        "Bambalapitiya Duplication Road",
        "Wellawatta",
        "Dehiwala",
        "Mt. Lavinia (Galkissa)",
        "Ratmalana",
        "Moratuwa",
        "Old Galle Road",
        "Walana",
        "Panadura",
      ],
    },
    {
      id: "4",
      from: "Jaffna",
      to: "Kandy",
      routeNo: "202",
      distance: "225",
      timetaken: "6Hrs",
      contact: "0779140101",
      starttime: [
        "05.40 AM",
        "06.40 AM",
        "07.40 AM",
        "08.40 AM",
        "09.40 AM",
        "10.40 AM",
        "11.40 AM",
        "12.40 PM",
        "01.40 PM",
        "02.40 PM",
      ],
      haults: [
        "Kaduwela",
        "Malabe",
        "Kothalawala",
        "Koswatta",
        "Baththaramulla",
        "Rajagiriya",
        "Kollupiti",
      ],
    },
    {
      id: "4",
      from: "Colombo",
      to: "Galle",
      routeNo: "303",
      distance: "120",
      timetaken: "2Hrs 45min",
      contact: "0779140102",
      starttime: [
        "06.45 AM",
        "07.45 AM",
        "08.45 AM",
        "09.45 AM",
        "10.45 AM",
        "11.45 AM",
        "12.45 PM",
        "01.45 PM",
        "02.45 PM",
        "03.45 PM",
      ],
      haults: [
        "Galle Face ",
        "Dehiwala",
        "Moratuwa",
        "Panadur",
        "Wadduw",
        "Kalutar",
        "Aluthgam",
      ],
    },
    {
      id: "5",
      from: "Galle",
      to: "Colombo",
      routeNo: "303",
      distance: "120",
      timetaken: "2Hrs 45min",
      contact: "0779140102",
      starttime: [
        "06.15 AM",
        "07.15 AM",
        "08.15 AM",
        "09.15 AM",
        "10.15 AM",
        "11.15 AM",
        "12.15 PM",
        "01.15 PM",
        "02.15 PM",
        "03.15 PM",
      ],
      haults: [
        "Galle Face ",
        "Dehiwala",
        "Moratuwa",
        "Panadur",
        "Wadduw",
        "Kalutar",
        "Aluthgam",
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
              source={require("../../../../assets/images/busTypes/sltb.jpg")}
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
            </View>
          </View>

          {/* Start times comparison */}
          <View className="mb-5 mx-4 pt-5 px-5 h-[250px] border-[2px] rounded-2xl border-tertiary flex justify-between">
            <View className="flex flex-row justify-around w-full">
              <Text className="text-[18px] font-bold">
                From {schedule.from}
              </Text>
              <Text className="text-[18px] font-bold">From {schedule.to}</Text>
            </View>
            <ScrollView nestedScrollEnabled={true}>
              <View className="w-full">
                {schedule.starttime.map((time, index) => (
                  <View
                    key={index}
                    className="w-full p-2 border-b-2 border-tertiary rounded-b flex flex-row justify-between items-center"
                  >
                    <View className="flex justify-center items-center w-[50%]">
                      <Text className="text-[16px]">{time}</Text>
                    </View>
                    <View className="flex justify-center items-center w-[50%]">
                      <Text className="text-[16px]">
                        {matchedStartTimes[index] || "-"}
                      </Text>
                    </View>
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

          {/* Main Bus Haults Section */}
          <View className="mb-5 mx-4 pt-5 px-5 h-[250px] border-[2px] rounded-2xl border-tertiary flex justify-between">
            <View>
              <Text className="text-[18px] font-bold">Main Bus Haults</Text>
            </View>
            <ScrollView nestedScrollEnabled={true}>
              {schedule.haults.map((hault, index) => (
                <View key={index} className="flex flex-row my-2 mx-3 w-[80%]">
                  <Ionicons name="location" size={24} color="#3B6DE7" />
                  <Text className="text-[16px] ml-2">{hault}</Text>
                </View>
              ))}
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

export default SLTB_Schedules_Details;
