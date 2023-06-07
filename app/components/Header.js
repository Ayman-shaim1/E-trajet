import { StyleSheet, View } from "react-native";
import React from "react";
import { Text, Avatar } from "../components/index";
import globalStyles from "../config/styles";
import { useState } from "react";
import { useEffect } from "react";
import { User } from "../models";

const user = new User();

const Header = ({ textColor }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    user.getUserById(user.auth.currentUser.uid, user => {
      setLoggedUser(user);
    });
  }, []);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.textContainer}>
        <View style={styles.text}>
          <Text as='header4' color='primary'>
            Hi,
          </Text>
          <Text as='header4' color={textColor ? textColor : "white"}>
            {loggedUser && loggedUser.firstName}{" "}
            {loggedUser && loggedUser.lastName}
          </Text>
        </View>
        <View style={styles.text}></View>
      </View>
      <Avatar uri={loggedUser && loggedUser.image} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: globalStyles.paddingHorizontal,
    backgroundColor: "trasnparent",
  },
  textContainer: {},
  text: {
    flexDirection: "row",
  },
});
