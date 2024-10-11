import { get } from "@/helpers/api";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

interface BusProps {
  _id: string;
}

export default function TabsIndex() {
  const [currentBus, setCurrentBus] = useState<BusProps | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const response = await get(`buses/profile`);
        setCurrentBus(response.data as BusProps);
      } catch (error) {
        console.error("Error fetching bus profile:", error);
        // Optionally handle error state here
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };
    fetchBus();
  }, []);

  if (loading) {
    return null; // or you can return a loading spinner component
  }

  return (
    <>
      {/* Redirect based on the fetched user data */}
      {currentBus ? (
        <Redirect href="/(tabs)" /> // Redirect to tabs if the user is logged in
      ) : (
        <Redirect href="/(routes)/login" /> // Redirect to login if not logged in
      )}
    </>
  );
}
