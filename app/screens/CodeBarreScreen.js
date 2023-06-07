import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Button, Screen, Text } from "../components";
import QRCode from "react-native-qrcode-svg";
export default function CodeBarreScreen({ navigation, route }) {
  const { trip, isFromItem, cancelHandler } = route.params;

  const goBackHandler = () => {
    navigation.goBack();
    if (cancelHandler) cancelHandler();
  };

  return (
    <Screen withPadding style={styles.container}>
      <Text as={"header4"} style={{ textAlign: "center" }}>
        Your trip code bar should be scanned for confirming payment
      </Text>

      <View style={{ alignItems: "center", marginVertical: 30 }}>
        <QRCode value={trip.id} size={340} />
      </View>
      {isFromItem ? (
        <Button text={"Go back"} onPress={goBackHandler} />
      ) : (
        <Button
          text={"Go To Map"}
          onPress={() => {
            navigation.navigate("StartTrip");
            cancelHandler();
          }}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  code: {
    width: 400,
    height: 400,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
