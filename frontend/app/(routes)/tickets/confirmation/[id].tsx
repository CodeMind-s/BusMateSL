import TicketConfirmationScreen from "@/screens/tickets/ticketconfirmation.screen";
import { useLocalSearchParams } from "expo-router";

const TicketConfirmation = () => {
  const { id } = useLocalSearchParams();
  return <TicketConfirmationScreen id={id}/>;
};

export default TicketConfirmation;
