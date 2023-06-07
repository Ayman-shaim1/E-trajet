import { StyleSheet, View, Keyboard, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, Screen } from "../components";
import MapView from "react-native-maps";
import { useLocation } from "../hooks";
import { MapAlert, Marker } from "../components/Map";
import { Alert, Map } from "../services";
import MapSearch from "../components/Map/MapSearch";

export default function SearchLocationScreen({ navigation }) {
  const { location, error } = useLocation();
  const [clickedLocation, setClickedLocation] = useState(null);
  const [markerSize, setMarkerSize] = useState(35);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [clickedAddress, setClickedAddress] = useState("");
  const mapRef = useRef(null);

  const handleMapPress = event => {
    const { coordinate } = event.nativeEvent;
    const { latitude, longitude } = coordinate;

    setClickedLocation({ latitude, longitude });
  };

  const handleRegionChange = region => {
    const zoomLevel = region.latitudeDelta;
    const newSize = 40 - (zoomLevel - 0.008) * 100;
    setMarkerSize(newSize);
  };

  const handleConfirm = () => {
    if (clickedLocation) {
      navigation.navigate("StartTrip", {
        destination: clickedLocation,
      });
    }
  };

  const handleSearchLocation = chLocation => {
    if (location) {
      const { latitude, longitude } = chLocation;
      setClickedLocation({ latitude, longitude });
    }
  };

  const getClickedAddresshandler = async () => {
    if (clickedLocation) {
      const latitude = clickedLocation.latitude;
      const longitude = clickedLocation.longitude;
      const address = await Map.getAddress(latitude, longitude);
      console.log("address", address);
      setClickedAddress(address);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.open({
        type: "danger",
        title: "Location error",
        message: error,
      });
    }
    if (clickedLocation) {
      const latitude = clickedLocation.latitude;
      const longitude = clickedLocation.longitude;
      getClickedAddresshandler();
      mapRef.current.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.001,
      });
    } else if (location) {
      const latitude = location.latitude;
      const longitude = location.longitude;

      setTimeout(() => {
        mapRef.current.animateToRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.001,
        });
      }, 1000);
    }

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
  }, [error, clickedLocation, location]);
  return (
    <Screen>
      <MapSearch setDestinationLocation={handleSearchLocation} />

      {clickedLocation && (
        <MapAlert
          title={"choosen location"}
          message={clickedAddress}
          type='address'
        />
      )}

      {location && (
        <MapView
          style={styles.map}
          ref={mapRef}
          onPress={handleMapPress}
          onRegionChange={handleRegionChange}>
          {clickedLocation && (
            <Marker coordinate={clickedLocation} markerSize={markerSize} />
          )}
        </MapView>
      )}
      <View
        style={[
          styles.btnConfirmContainer,
          { display: isKeyboardVisible ? "none" : "flex" },
        ]}>
        <Button
          text={"Confirm"}
          disabled={!clickedLocation && true}
          onPress={handleConfirm}
        />
        <Button
          text={"Go Back"}
          onPress={() => navigation.goBack()}
          variant={"danger"}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },

  btnConfirmContainer: {
    position: "absolute",
    bottom: "15%",
    zIndex: 3000,
    width: "100%",
    paddingHorizontal: 10,
  },
});
