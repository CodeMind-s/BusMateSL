import BusDetailsScreen from "@/screens/tickets/busdetails.screen";
import { useLocalSearchParams } from "expo-router";

const BusDetails = () => {
  const { id } = useLocalSearchParams();
  return <BusDetailsScreen id={id} />;
};

export default BusDetails;
