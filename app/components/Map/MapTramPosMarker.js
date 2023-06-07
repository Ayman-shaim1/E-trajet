import { Image, StyleSheet, Text } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import { Fontisto } from "@expo/vector-icons";
import colors from "../../config/colors";

const MapTramPosMarker = ({ coordinate }) => {
  return (
    <Marker
      coordinate={coordinate}
      style={styles.markerContainer}
      anchor={{ x: 0.5, y: 0.5 }}>
      <Fontisto name='map-marker-alt' size={60} color={colors.primary} />
    </Marker>
  );
};

export default MapTramPosMarker;

const styles = StyleSheet.create({
  markerContainer: {
    // position: "relative",
  },
  marker: {
    width: 30,
  },
});
