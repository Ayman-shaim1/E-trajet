import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Screen } from "../components";

export default function ChanageInformationScreen({ navigation }) {
  return (
    <Screen withPadding>
      
      <Button
        onPress={() => navigation.goBack()}
        text={"go back"}
        variant='darkGray'
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});
