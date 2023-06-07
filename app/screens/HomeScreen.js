import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Screen,
  Header,
  TripItem,
  LastTrip,
  Divider,
  Text,
  Card,
} from "../components";
import colors from "../config/colors";
import { FontAwesome } from "@expo/vector-icons";
import { Trip, User } from "../models";

const trip = new Trip();
const user = new User();

const HomeScreen = ({ navigation }) => {
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
    <Screen withPadding style={styles.container}>
      <Header />
      <View style={{ height: "84%" }}>
        <ScrollView scrollEnabled={true}>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ marginVertical: 4 }} as={"header4"} color={"white"}>
              Last trip
            </Text>
          </View>
          {trips.length > 0 ? (
            <LastTrip trip={trips[0]} navigation={navigation} />
          ) : (
            <>
              <Card style={{ marginBottom: 20 }}>
                <View style={{ paddingVertical: 20 }}>
                  <View style={{ alignItems: "center" }}>
                    <FontAwesome
                      name='exclamation-triangle'
                      size={50}
                      color={colors.gray}
                    />
                  </View>
                  <Text
                    as={"header3"}
                    style={{ textAlign: "center" }}
                    color={"darkGray"}>
                    last trip not found
                  </Text>
                </View>
              </Card>
            </>
          )}

          <Divider />
          <View style={{ marginVertical: 10 }}>
            <Text style={{ marginVertical: 10 }} as={"header4"} color={"white"}>
              Historical
            </Text>
          </View>

          {trips.length > 0 &&
            trips.map(trip => (
              <TripItem key={trip.id} trip={trip} navigation={navigation} />
            ))}
        </ScrollView>
      </View>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 5,
    backgroundColor: colors.secondary,
  },
});
