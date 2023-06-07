import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import colors from "../../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function MapToast({ text, image }) {
  const [show, setShow] = useState(true);
  if (show)
    return (
      <View style={styles.toastWrapper}>
        <View style={styles.toastContainer}>
          {image && <Image source={image} style={styles.toastImage} />}
          <Text style={styles.toastText}>{text}</Text>
          <TouchableOpacity
            style={styles.btnRemove}
            onPress={() => setShow(false)}>
            <MaterialCommunityIcons
              name='close'
              size={20}
              color={colors.gray}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  toastWrapper: {
    backgroundColor: colors.primary,
    width: "95%",
    alignSelf: "center",
    alignItems: "flex-end",
    borderRadius: 5,
    zIndex: 100,
    marginBottom: 4,
  },
  toastText: { width: "90%" },
  btnRemove: { padding: 10 },
  toastImage: {
    width: 30,
    height: 30,
    marginBottom: 6,
    marginRight: 6,
  },
  toastContainer: {
    backgroundColor: colors.white,
    width: "98%",
    paddingVertical: 20,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: "center",
    // justifyContent:'center',
    flexDirection: "row",
  },
});
