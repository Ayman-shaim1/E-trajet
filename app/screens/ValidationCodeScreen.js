import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Screen, Text } from "../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const ValidationCodeScreen = ({ navigation  }) => {
  const [numbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [numbersOutput, setNumberOutput] = useState([null, null, null, null]);
  const [numberOutputIndex, setNumberOutputIndex] = useState(0);

  const setNumberHandler = value => {
    if (numberOutputIndex !== 4) {
      const newnumbersOutput = numbersOutput;
      newnumbersOutput[numberOutputIndex] = value;
      setNumberOutputIndex(numberOutputIndex + 1);
      setNumberOutput(newnumbersOutput);
    }
  };

  return (
    <Screen
      style={{
        backgroundColor: "#fff",
      }}>
      <ScrollView>
        <Text
          as={"header6"}
          color={"primary"}
          style={{ marginLeft: "10%" }}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name='arrow-left'
            size={20}
            color={colors.primary}
            // style={{ marginTop: 30 }}
          />
          go back
        </Text>

        <View style={styles.timerContainer}>
          <Text as='header1'>{styles.timerText}01:16</Text>
        </View>

        <View style={styles.textContainer}>
          <Text as='header6' color='gray'>
            We sent the code verfication to
          </Text>
          <Text as='header6' color='gray' style={{ marginBottom: 20 }}>
            your mobile number
          </Text>
          <TouchableOpacity>
            <Text as='header6' color='primary'>
              Sent again
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.numberOutputContainer}>
          {numbersOutput.map((numberOutput, index) => (
            <View style={styles.numberOutput}>
              <Text style={styles.numberOutputText} key={index}>
                {numberOutput}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.phoneNumberContainer}>
          <Text as='header6' style={styles.phoneNumberText}>
            +212 6 00 00 00 00
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          {numbers.map(number => (
            <TouchableOpacity
              key={number}
              style={styles.button}
              onPress={() => setNumberHandler(number)}>
              <Text style={styles.buttonText}>{number}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setNumberHandler(0)}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ValidationCodeScreen;

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 10,
  },

  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  numberOutputContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  numberOutput: {
    backgroundColor: "#f4f4f4",
    margin: 2,
    width: 75,
    height: 75,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  numberOutputText: {
    fontSize: 35,
    fontWeight: "bold",
  },

  phoneNumberContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    width: "33%",
    borderWidth: 0,
    fontSize: 30,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 30,
    marginVertical: 17,
  },
});
