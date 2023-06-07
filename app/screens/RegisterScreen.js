import { Image, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  Text,
  Screen,
  Divider,
  Button,
  Logo,
  SuccessRegisterMessage,
} from "../components";
import * as Yup from "yup";
import {
  Form,
  ErrorMessage,
  FormField,
  SubmitButton,
} from "../components/forms";
import colors from "../config/colors";
import { User } from "../models";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("please enter your email !")
    .email("email invalid !")
    .label("Email"),
  firstName: Yup.string()
    .required("please enter your first name")
    .label("firstName"),
  lastName: Yup.string()
    .required("please enter your last name")
    .label("lastName"),
  phone: Yup.string()
    .required("please enter your phone number")
    .label("lastName"),
  password: Yup.string()
    .required("please enter a password !")
    .label("Password"),
  confirmPassword: Yup.string()
    .required("please confirm your password !")
    .label("Confri password"),
});

const user = new User();

export default function RegisterScreen({ navigation }) {
  const [errorMessage, setErrorMessage] = useState(false);
  const [registerSuccess, setregisterSuccess] = useState(false);

  const handleSubmit = async ({
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
  }) => {
    try {
      if (password === confirmPassword) {
        const res = await user.register({
          email,
          password,
          firstName,
          lastName,
          phone,
        });
        if (res !== null) {
          setregisterSuccess(true);
        }
      } else {
        setErrorMessage("passwords not match !");
      }
    } catch (error) {
      Alert.open({
        title: "register login error",
        message: error,
        type: "danger",
      });
      setregisterSuccess(false);
    }
  };

  return (
    <Screen style={styles.container} withPadding>
      {registerSuccess ? (
        <SuccessRegisterMessage
          navigation={navigation}
          resetSuccess={() => setregisterSuccess(false)}
        />
      ) : (
        <ScrollView scrollEnabled={true}>
          <Logo />
          <View style={styles.textContainer}>
            <Text as='header2'>Sign up</Text>
            <Text as='header6' color='gray'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos?
            </Text>
          </View>

          <Form
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {errorMessage && (
              <ErrorMessage error={errorMessage} visible={true} />
            )}

            <FormField placeholder='John' label='First name' name='firstName' />
            <FormField placeholder='Doe' label='Last name' name='lastName' />

            <FormField
              placeholder='xyz@example.com'
              label='Email'
              keyboardType='email-address'
              textContentType='emailAddress'
              name='email'
            />

            <FormField
              placeholder='+212 6 00 00 00 00 '
              label='Phone number'
              name='phone'
            />
            <FormField
              placeholder='********'
              label='Password'
              name='password'
              secureTextEntry
              textContentType='password'
            />
            <FormField
              placeholder='********'
              label='Confrim password'
              name='confirmPassword'
              secureTextEntry
              textContentType='password'
            />
            <SubmitButton text='Register' variant='secondary' />
          </Form>
          <Divider withOr margin={20} />
          <Button
            variant='white'
            text='Log in with Gmail'
            style={styles.smLoginButton}
            iconStart={require("../assets/images/google-logo.png")}
          />

          <Button
            variant='white'
            text='Log in with facebok '
            style={styles.smLoginButton}
            iconStart={require("../assets/images/facebook-logo.png")}
          />

          <View style={styles.signupTextContainer}>
            <Text as='paragraph' style={styles.text} color='gray'>
              Don't have an account?{" "}
            </Text>
            <Text
              as='paragraph'
              style={styles.text}
              color='primary'
              onPress={() => navigation.navigate("Login")}>
              Log in
            </Text>
          </View>

          <View style={styles.TCPPTextContainer}>
            <Text as='paragraph' style={styles.text} color='gray'>
              By continue to log in. you accept our company
            </Text>

            <View style={styles.TCPPAndTextContainer}>
              <Text
                as='paragraph'
                style={[
                  styles.text,
                  { borderBottomWidth: 1, borderColor: colors.primary },
                ]}
                color='primary'>
                Terms & conditions
              </Text>
              <Text as='paragraph' style={[styles.text]} color='gray'>
                and
              </Text>
              <Text
                as='paragraph'
                style={[
                  styles.text,
                  { borderBottomWidth: 1, borderColor: colors.primary },
                ]}
                color='primary'>
                Privacy plicy
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "#fff",
  },

  textContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  switchButtonContainer: {
    flexDirection: "row",
    borderColor: colors.third,
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
  },
  text: {
    fontWeight: "bold",
    marginHorizontal: 2,
  },
  btnSwitch: {
    width: "50%",
    margin: 1,
    borderWidth: 0,
  },

  smLoginButton: {
    marginVertical: 10,
    padding: 20,
  },
  signupTextContainer: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
  },
  TCPPTextContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  TCPPAndTextContainer: {
    flexDirection: "row",
  },
});
