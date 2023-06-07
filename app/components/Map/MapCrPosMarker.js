import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";

export default function MapCrPosMarker({ coordinate }) {
  return (
    <Marker coordinate={coordinate}>
      <Image
        source={require("../../assets/icons/current-position.png")}
        style={styles.schoolMarker}
      />
    </Marker>
  );
}

const styles = StyleSheet.create({});
