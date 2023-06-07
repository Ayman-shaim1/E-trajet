import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../config/colors";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
const icons = {
  warning: <AntDesign name='exclamation' size={25} color={colors.primary} />,
  car: <FontAwesome5 name='car-alt' size={25} color={colors.primary} />,
  mapLoading: (
    <MaterialCommunityIcons
      name='map-clock-outline'
      size={25}
      color={colors.primary}
    />
  ),
  address: <Entypo name='address' size={25} color={colors.primary} />,
};

export default function MapAlert({ type, title, message }) {
  return (
    <View style={styles.alertContainer}>
      <View style={styles.alertWrapper}>
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>{title}</Text>
          <View style={styles.alertIconContainer}>
            <View style={styles.alertIconCircle}>
              <View style={styles.alertIcon}>{icons[type]}</View>
            </View>
          </View>
          <Text style={styles.alertMessage}>{message}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alertContainer: {
    width: 170,
    height: 170,
    position: "absolute",
    top: "20%",
    alignSelf: "center",
    borderRadius: 10,
    zIndex:1000,
  },
  alertWrapper: {
    backgroundColor: colors.primary,
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  alertContent: {
    backgroundColor: colors.white,
    width: "100%",
    height: "97%",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
  },
  alertIconContainer: {
    width: "100%",
    height: 50,
    alignItems: "center",
  },
  alertIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: colors.gray,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  alertIcon: {},
  alertMessage: {
    fontSize: 14,
    marginTop: 9,
    color: colors.darkGray,
    textAlign: "justify",
  },
});
