import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ProfileScreen,
  ChanageInformationScreen,
  MyTripsScreen,
  TripDetailsScreen,
  CodeBarreScreen,
} from "../screens";

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='ChnageInf' component={ChanageInformationScreen} />
      <Stack.Screen name='MyTrips' component={MyTripsScreen} />
      <Stack.Screen name='TripDetails' component={TripDetailsScreen} />
      <Stack.Screen name='QrCode' component={CodeBarreScreen} />
    </Stack.Navigator>
  );
}
