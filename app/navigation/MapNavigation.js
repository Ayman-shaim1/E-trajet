import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CodeBarreScreen,
  MapScreen,
  PaiementScreen,
  SearchLocationScreen,
} from "../screens";

const Stack = createNativeStackNavigator();

export default function MapNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='StartTrip' component={MapScreen} />
      <Stack.Screen name='SearchPosition' component={SearchLocationScreen} />
      <Stack.Screen name='Paiment' component={PaiementScreen} />
      <Stack.Screen name='CodeBarre' component={CodeBarreScreen} />
    </Stack.Navigator>
  );
}
