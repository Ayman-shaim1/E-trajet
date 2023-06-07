import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Header, Screen } from "../components";
import colors from "../config/colors";
import {
  DateFormField,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import * as Yup from "yup";
import { useRoute } from "@react-navigation/native";
import { Alert } from "../services";
import { Trip, User } from "../models";

const trip = new Trip();
const user = new User();

const validationSchema = Yup.object().shape({
  number: Yup.number().required().label("Number"),
  cvv: Yup.number().required().label("cvv"),
  expiry: Yup.date().required().label("Expiry"),
});

export default function PaiementScreen({ navigation }) {
  const route = useRoute();
  const { transportation, cancelHandler } = route.params;

  const handleSubmit = async ({ number, expiry, cvv }) => {
    try {
      delete transportation.transportationsWay;

      let trasportationData = {
        ...transportation,
        userId: user.auth.currentUser.uid,
        paiementDetails: { number, expiry, cvv, confirmPaiment: false },
      };
      const res = await trip.creatTrip(trasportationData);
      navigation.navigate("CodeBarre", { trip: res, cancelHandler });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Screen style={styles.container} withPadding>
      <Header textColor={"gray"} />
      <View style={{ paddingTop: "20%" }}>
        <Form
          validationSchema={validationSchema}
          initialValues={{ number: "", expiry: "", cvv: "" }}
          onSubmit={handleSubmit}>
          <FormField
            label='Card number'
            autoCapitalize='none'
            autoCorrect={false}
            name='number'
            placeholder='enter card number ...'
            keyboardType='numeric'
            maxLength={12}
            returnKeyType='done'
          />

          <DateFormField name='expiry' label='Expriy date' />

          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            name='cvv'
            label='Cvv code'
            placeholder='enter cvv code ...'
            keyboardType='numeric'
            maxLength={3}
            returnKeyType='done'
          />
          <SubmitButton text='pay' style={{ marginTop: 30 }} />
        </Form>
      </View>
      <Button
        text='go back'
        variant='darkGray'
        onPress={() => navigation.goBack()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
