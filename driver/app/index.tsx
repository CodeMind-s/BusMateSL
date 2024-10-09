// import useUser from "@/hooks/auth/useUser";
import { Redirect } from "expo-router";
import { useState } from "react";
// import Loader from "@/components/loader/loader";

export default function TabsIndex() {
//   const { loading, user } = useUser();
const [user, setUser] = useState([]);
  return (
    <>
        <Redirect href={!user ? "/(routes)/login" : "/(tabs)"} />
    </>
  );
}
