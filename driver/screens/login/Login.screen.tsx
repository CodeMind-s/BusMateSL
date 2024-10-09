import { router } from "expo-router"
import { Text, Touchable, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

const LoginScreen = () => {
  return (
    <View className=' flex-1 justify-center items-center bg-swhite'>
      <Text>Login Screen</Text>
      <TouchableOpacity onPress={() => router.push("/(routes)/login")}> login</TouchableOpacity>
    </View>
  )
}

export default LoginScreen