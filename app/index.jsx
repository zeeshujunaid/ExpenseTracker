import { View, Text, TouchableOpacity, ImageBackground,StatusBar } from "react-native";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <ImageBackground
      source={{
        uri: "https://images.pexels.com/photos/11624818/pexels-photo-11624818.jpeg",
      }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      blurRadius={2}
    >
      <StatusBar hidden={true} />
      {/* Overlay */}
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />

      {/* Content */}
      <View style={{ alignItems: "center", zIndex: 2 }}>
        <Text
          style={{
            fontSize: 34,
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Expense Tracker
        </Text>

        <Text
          style={{
            color: "#d1d5db",
            fontSize: 16,
            marginTop: 10,
            textAlign: "center",
            maxWidth: 250,
          }}
        >
          Manage your spending, save smart, and track your goals — all in one
          place.
        </Text>

        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/Homescreen")}
          style={{
            backgroundColor: "#f43f5e",
            paddingVertical: 12,
            paddingHorizontal: 40,
            borderRadius: 30,
            marginTop: 30,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 5,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: 18,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
