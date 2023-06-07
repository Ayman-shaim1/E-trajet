import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Button, Screen, Text } from "../components";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Fontisto } from "@expo/vector-icons";
import colors from "../config/colors";

const trans = {
  taxi: require("../assets/images/taxi.png"),
  tram: require("../assets/images/tram.png"),
  bus: require("../assets/images/bus.png"),
};

export default function TripDetailsScreen({ route, navigation }) {
  const { trip } = route.params;

  return (
    <Screen withPadding>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: trip.directions[0].direction[0].latitude + 0.0011115,
          longitude: trip.directions[0].direction[0].longitude + 0.0001115,
          latitudeDelta: 0.08,
          longitudeDelta: 0.01,
        }}>
        {trip.directions &&
          trip.directions.length > 0 &&
          trip.directions.map((item, index) => (
            <Polyline
              key={index}
              coordinates={item.direction}
              strokeColor={item.color}
              strokeWidth={8}
            />
          ))}
        {trip.startPosition && (
          <Marker coordinate={trip.startPosition}>
            <Fontisto name='map-marker-alt' size={24} color={colors.darkGray} />
          </Marker>
        )}
        {trip.endPosition && (
          <Marker coordinate={trip.endPosition}>
            <Fontisto name='map-marker-alt' size={24} color={colors.darkGray} />
          </Marker>
        )}
      </MapView>
      <View
        style={{
          marginVertical: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Text>paiment confirmation : </Text>
        {trip.paiementDetails.confirmPaiment ? (
          <Text style={{ color: colors.success }}>payment confirmed</Text>
        ) : (
          <Text  style={{ color: colors.danger }}>payment not confirmed yet</Text>
        )}
      </View>
      <View
        style={{
          marginVertical: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <View style={styles.imageContainer}>
          <Image source={trans[trip.code]} style={styles.image} />
        </View>
        <View>
          <Text as={"header5"} style={{ marginLeft: 5, textAlign: "center" }}>
            Trip on{" "}
            {trip &&
              trip.createdAt &&
              trip.createdAt.toDate().toLocaleDateString()}{" "}
          </Text>
          <Text
            as={"header5"}
            style={{ marginLeft: 5, textAlign: "center" }}
            color={"darkGray"}>
            using {trip.code}{" "}
          </Text>
        </View>
      </View>
      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <Text as={"header4"}>
          Start from '{trip.startAddress}' to '{trip.endAddress}'
        </Text>
      </View>
      <View style={{ marginVertical: 1 }}>
        <Text as={"header5"} style={{ marginBottom: 10 }}>
          Seat : {trip && trip.nbrSeat}
        </Text>
      </View>
      <View style={{ marginVertical: 1 }}>
        <Text as={"header5"} style={{ marginBottom: 10 }}>
          Total price : {trip && trip.price.toFixed(2)}
        </Text>
      </View>

      <Button
        text={"Show Qr code"}
        onPress={() =>
          navigation.navigate("QrCode", { trip, isFromItem: true })
        }
      />
      <Button
        text={"Go back"}
        onPress={() => navigation.goBack()}
        variant='secondary'
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "40%",
    borderRadius: 7,
  },
  imageContainer: {
    backgroundColor: colors.light,
    position: "relative",
    width: 90,
    height: 90,
  },
  image: {
    // position: "absolute",
    height: 60,
    width: 100,
    zIndex: 100,
    transform: [{ translateX: 12 }, { translateY: 14 }],
  },
});
