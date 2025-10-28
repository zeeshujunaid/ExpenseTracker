import { View, Text, StatusBar } from "react-native";
import Header from "../../Components/Header";

export default function Homescreen() {
  return (
    <View styele={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar hidden={true} />
      <Header />
      <Text>Homescreen</Text>
    </View>
  );
}
