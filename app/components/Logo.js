import { Image, StyleSheet, View } from "react-native";
import React from "react";
import Text from "./Text";
export default function Logo() {
  return (
    <View style={styles.logocontainer}>
      <Image source={require("../assets/images/logo2.png")} />
      <View style={styles.textContainer}>
        <Text as='header4' color='primary' style={styles.mainText}>
          E-trajet
        </Text>
        <Text color='gray' style={styles.subText}>
          Lorem, ipsum dolor.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logocontainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textContainer: {
    marginLeft: 10,
  },
  mainText: {
    marginLeft: 10,
  },
  subText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
