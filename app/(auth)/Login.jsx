import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { router } from "expo-router";

export default function Login() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <StatusBar hidden={true} />
      {/* Logo Section */}
      <View
        style={{
          marginBottom: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/expensetrackerlogo.png")}
          style={{
            width: 250,
            height: 140,
            marginBottom: 10,
            resizeMode: "contain",
          }}
        />
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#da1212" }}>
          Login Your Account
        </Text>
      </View>

      {/* Input Fields */}
      <View style={{ width: "100%", gap: 25 }}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            padding: 12,
            fontSize: 16,
          }}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            padding: 12,
            fontSize: 16,
          }}
        />
      </View>

      {/* Signup Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#da1212",
          width: "100%",
          padding: 15,
          borderRadius: 10,
          marginTop: 30,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
          Login
        </Text>
      </TouchableOpacity>

      {/* Dont have an account */}
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text style={{ color: "#000" }}>Dont have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/Signup");
          }}
        >
          <Text style={{ color: "#da1212", fontWeight: "600" }}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
