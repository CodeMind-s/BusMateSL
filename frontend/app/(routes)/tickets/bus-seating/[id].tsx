import BusSeatsScreen from "@/screens/tickets/busseats.screen";
import { useLocalSearchParams } from "expo-router";

const BusSeating = () => {
  const { id } = useLocalSearchParams();
  return <BusSeatsScreen id={id} />;
};

export default BusSeating;
