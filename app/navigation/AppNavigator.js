import { TabButtonItem } from "../components";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapNavigator from "./MapNavigation";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import HomeNavigator from "./HomeNavigator";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            display: isKeyboardVisible ? "none" : "flex",
            borderTopWidth: 0,
            alignItems: "center",
            justifyContent: "center",
            elevation: 0,
            paddingBottom: 75,
          },
        }}>
        <Tab.Screen
          name='Home'
          component={HomeNavigator}
          options={({ navigation }) => ({
            tabBarButton: () => (
              <TabButtonItem
                navigation={navigation}
                onPress={() => navigation.navigate("Home")}
                icon='ios-home-outline'
              />
            ),
          })}
        />
        <Tab.Screen
          name='Map'
          component={MapNavigator}
          options={({ navigation }) => ({
            tabBarButton: () => (
              <TabButtonItem
                navigation={navigation}
                onPress={() => navigation.navigate("Map")}
                icon='map-outline'
              />
            ),
          })}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileNavigator}
          options={({ navigation }) => ({
            tabBarButton: () => (
              <TabButtonItem
                navigation={navigation}
                onPress={() => navigation.navigate("Profile")}
                icon='person-outline'
              />
            ),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
