import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar, Button, Screen } from "../components";
import { User } from "../models";
import { useState } from "react";
import { useEffect } from "react";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const user = new User();
export default function ProfileScreen({ navigation }) {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    user.getUserById(user.auth.currentUser.uid, user => {
      setLoggedUser(user);
    });
  }, []);
  return (
    <Screen withPadding>
      <View style={{ alignItems: "center" }}>
        {loggedUser && (
          <View
            style={{
              marginTop: 10,
              width: "100%",
              backgroundColor: colors.white,
              paddingVertical: 15,
              paddingHorizontal: 12,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
            }}>
            <View style={{ alignItems: "center" }}>
              {loggedUser && <Avatar uri={loggedUser.image} size='sm' />}
            </View>
            <Text style={{ marginLeft: 10 }}>
              {loggedUser.firstName} {loggedUser.lastName}
            </Text>
          </View>
        )}
      </View>

      <View style={{ marginTop: 50 }}>
        <TouchableOpacity
          style={{ marginVertical: 5 }}
          onPress={() => navigation.navigate("ChnageInf")}>
          <View
            style={{
              width: "100%",
              backgroundColor: colors.white,
              paddingVertical: 15,
              paddingHorizontal: 12,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <View
                style={{
                  backgroundColor: colors.primary,
                  marginRight: 10,
                  padding: 3,
                  borderRadius: 4,
                }}>
                <MaterialCommunityIcons
                  name='account'
                  size={18}
                  color={colors.white}
                />
              </View>
              <Text>Change my informations</Text>
            </View>
            <MaterialCommunityIcons
              name='arrow-right'
              size={18}
              color={colors.gray}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginVertical: 5 }}
          onPress={() => navigation.navigate("MyTrips")}>
          <View
            style={{
              width: "100%",
              backgroundColor: colors.white,
              paddingVertical: 15,
              paddingHorizontal: 12,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <View
                style={{
                  backgroundColor: colors.success,
                  marginRight: 10,
                  padding: 3,
                  borderRadius: 4,
                }}>
                <MaterialCommunityIcons
                  name='format-list-bulleted-square'
                  size={18}
                  color={colors.white}
                />
              </View>
              <Text>My trips</Text>
            </View>
            <MaterialCommunityIcons
              name='arrow-right'
              size={18}
              color={colors.gray}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Button
        text={"Sign out"}
        variant='danger'
        style={{ position: "absolute", width: "100%", bottom: "15%" }}
        onPress={() => {
          user.logout();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});
