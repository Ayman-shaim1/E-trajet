import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Screen, Text, Card } from "../components";
import colors from "../config/colors";

export default function AboutScreen() {
  return (
    <Screen>
      <ScrollView style={styles.container}></ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 20,
    textAlign: "center",
    color: colors.white,
  },
  sectionBgPrimary: {
    color: colors.white,
    padding: 10,
    height: 400,
    backgroundColor: colors.primary,
  },
  sectionBgBrown: {
    color: colors.white,
    padding: 10,
    height: 400,
    backgroundColor: colors.brown,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 140,
    height: 140,
  },
  text: {
    textAlign: "justify",
  },
});
