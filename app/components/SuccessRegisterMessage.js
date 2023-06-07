import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import Text from "./Text";
import Button from "./Button";
export default function SuccessRegisterMessage({ navigation, resetSuccess }) {
  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Ionicons
          name='ios-checkmark-circle-outline'
          size={150}
          color={colors.success}
        />
      </View>
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <Text as={"header4"} style={{ textAlign: "center" }}>
          You have been registered successfully
        </Text>
      </View>
      <View style={{ alignItems: "center", marginBottom: 150 }}>
        <Text as={"header3"} style={{ textAlign: "center" }}>
          We just sent you a confirmation email please confirm your email
          account
        </Text>
      </View>

      <View>
        <Button
          text={"Go back to login screen"}
          variant='secondary'
          onPress={() => {
            resetSuccess();
            navigation.navigate("Login");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
