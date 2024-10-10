import CheckoutScreen from "@/screens/tickets/checkout.screen";
import { useLocalSearchParams } from "expo-router";

const Checkout = () => {
  const { id, seat } = useLocalSearchParams() as { id: string, seat: string };
  return <CheckoutScreen id={id} seat={seat}  />;
};

export default Checkout;
