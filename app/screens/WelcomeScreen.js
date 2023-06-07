import { Image, ImageBackground, StyleSheet, View } from "react-native";
import React from "react";
import { Button, Text, Screen, Logo } from "../components";
import colors from "../config/colors";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode='cover'
        style={styles.background}
        blurRadius={10}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.textContainer}>
          <Text as='header3' color='darkGray'>
            Welcome to{" "}
          </Text>
          <Text as='header3' color='primary'>
            E-trajet
          </Text>
        </View>
        <View style={styles.subTextContainer}>
          <Text as='header6'>Lorem ipsum dolor sit amet</Text>
          <Text as='header6'> ducimus nemo, quas </Text>
          <Text as='header6'> consectetur </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            variant='primary'
            text='Login'
            onPress={() => navigation.navigate("Login")}
            style={{ marginBottom: 10 }}
          />
          <Button
            variant='secondary'
            text='Register'
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 5,
  },
  logoContainer: {
    position: "absolute",
    top: "4%",
    alignSelf: "center",
  },
  logo: {
    width: "100%",
    height: 90,
    marginVertical: 0,
    marginBottom: 0,

    textAlign: "center",
  },
  textContainer: {
    position: "absolute",
    top: "20%",
    flexDirection: "row",
    alignSelf: "center",
  },
  subTextContainer: {
    position: "absolute",
    top: "30%",
    alignSelf: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    marginBottom: 15,
  },
  tagline: {
    color: colors.white,
    textAlign: "center",
  },
});
