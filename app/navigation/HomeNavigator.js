import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TripDetailsScreen, HomeScreen, CodeBarreScreen } from "../screens";
const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='TripDetails' component={TripDetailsScreen} />
      <Stack.Screen name='QrCode' component={CodeBarreScreen} />

    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
