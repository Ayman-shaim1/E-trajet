import { Image, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Text, Screen, Divider, Button, TextInput, Logo } from "../components";
import * as Yup from "yup";
import {
  Form,
  ErrorMessage,
  FormField,
  SubmitButton,
} from "../components/forms";
import colors from "../config/colors";
import { Alert } from "../services";
import { User } from "../models/";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("please enter your email !")
    .email("email invalid !")
    .label("Email"),
  password: Yup.string()
    .required("please enter your password  !")
    .min(4, "il fau saisire au minimum 4 carctere !")
    .label("Password"),
});

const user = new User();
console.log(user.isEmailVerified);

export default function LoginScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    try {
      const res = await user.login(email, password);
      console.log(res.use)
      if (res.user.email !== "jhon@gmail.com" && !res.user.emailVerified) {
        Alert.open({
          title: "Error",
          message:
            "your account is not yet verified, we have sent a verification email to your email inbox, please verify your email account",
          type: "danger",
        });
      } 
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogleHandler = async () => {
    try {
      console.log("hello world");
    } catch (error) {
      Alert.open({
        title: "Gmail login error",
        message: error,
        type: "danger",
      });
      console.log(error);
    }
  };
  const signInWithFacebookHandler = async () => {
    const data = await user.loggedUser();
    console.log(data);
  };

  return (
    <Screen withPadding style={styles.container}>
      <ScrollView>
        <Logo />
        <View style={styles.textContainer}>
          <Text as='header3'>Log in</Text>
          <Text as='header6' color='gray'>
            Lorem ipsum dolor sit amet.
          </Text>
        </View>
        <Form
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <ErrorMessage
            error='Invalid email and/or password.'
            visible={loginFailed}
          />
          <FormField
            label='email'
            autoCapitalize='none'
            autoCorrect={false}
            icon='email'
            keyboardType='email-address'
            textContentType='emailAddress'
            name='email'
            placeholder='xyz@example.com '
          />
          <FormField
            label='password'
            autoCapitalize='none'
            autoCorrect={false}
            icon='lock'
            name='password'
            placeholder='******'
            secureTextEntry
            textContentType='password'
          />
          <SubmitButton text='Login' variant='secondary' />
        </Form>

        <Divider withOr margin={20} />
        <Button
          variant='white'
          text='Log in with Gmail'
          style={[styles.smLoginButton, styles.firstBtnLogin]}
          iconStart={require("../assets/images/google-logo.png")}
          onPress={signInWithGoogleHandler}
        />

        <Button
          variant='white'
          text='Log in with facebok '
          style={styles.smLoginButton}
          iconStart={require("../assets/images/facebook-logo.png")}
          onPress={signInWithFacebookHandler}
        />

        <View style={styles.signupTextContainer}>
          <Text as='paragraph' style={styles.text} color='gray'>
            Don't have an account?{" "}
          </Text>
          <Text
            as='paragraph'
            style={styles.text}
            color='primary'
            onPress={() => navigation.navigate("Register")}>
            Sign Up
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
  firstBtnLogin: {},
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
