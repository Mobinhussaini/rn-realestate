import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="bg-gray-300 px-6 py-4 rounded-xl text-3xl  text-red-600">Welcome to your app</Text>

    </View>
  );
}
