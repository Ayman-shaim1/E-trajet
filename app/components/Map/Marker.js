import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Marker as RNMMarker } from "react-native-maps";
import { Fontisto } from "@expo/vector-icons";
import colors from "../../config/colors";

export default function Marker({ coordinate, markerSize }) {
  return (
    <RNMMarker coordinate={coordinate} anchor={{ x: 0.5, y: 0.5 }}>
      <Fontisto
        name='map-marker-alt'
        size={markerSize}
        color={colors.primary}
      />
    </RNMMarker>
  );
}

const styles = StyleSheet.create({});
