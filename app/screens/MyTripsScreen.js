import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Screen, TripItem } from "../components";
import { Trip, User } from "../models";

const trip = new Trip();
const user = new User();

export default function MyTripsScreen({ navigation }) {
  const [trips, setTrips] = useState([]);
  const [callFunc, setCallFunc] = useState(false);

  useEffect(() => {
    if (!callFunc) {
      trip.getAllUserTrips(user.auth.currentUser.uid, trips => {
        setTrips(trips);
        setCallFunc(true);
      });
    }
  }, [callFunc]);

  return (
    <Screen withPadding>
      <View style={{ height: "83%", marginBottom: 10 }}>
        <ScrollView>
          {trips.length > 0 &&
            trips.map(trip => (
              <TripItem key={trip.id} trip={trip} navigation={navigation} />
            ))}
        </ScrollView>
      </View>
      <Button
        onPress={() => navigation.goBack()}
        text={"go back"}
        variant='darkGray'
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});
