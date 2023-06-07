import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Text, Screen, Divider, Button } from "../components";
import * as Yup from "yup";
import { Form, FormField, SubmitButton } from "../components/forms";

const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("veuillez saisire votre email !")
    .email("email invalid !")
    .label("Email"),
  nomcomplet: Yup.string()
    .matches(phoneRegExp, "numero de telephone invalid !")
    .required("veuillez saisire votre nom !")
    .label("Nomcomplet"),
  phonenumber: Yup.string()
    .required("veuillez saisire votre numero de telephone !")
    .label("Phonenumber"),
  message: Yup.string()
    .required("veuillez saisire le message !")
    .label("Message"),
});

export default function ContactScreen() {
  const handleSubmit = async ({ email, nomcomplet, phonenumber, message }) => {
    console.log(email, nomcomplet, phonenumber, message);
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <Text as='header3' style={styles.title}>
          Contactez nous
        </Text>
        <Form
          initialValues={{ email: "", nomcomplet: "", message: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='account'
            name='nomcomplet'
            placeholder='Nom complet'
          />
          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='phone'
            name='phonenumber'
            placeholder='Numero de telephone'
            keyboardType='phone-pad'
            textContentType='telephoneNumber'
          />

          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='email'
            keyboardType='email-address'
            name='email'
            placeholder='Email'
            textContentType='emailAddress'
          />

          <FormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='message'
            name='message'
            placeholder='Message'
            maxLength={255}
            multiline
          />

          <SubmitButton text='Envoyer' iconStart='send' />
        </Form>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  logo: {
    marginTop: 20,
    textAlign: "center",
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});
