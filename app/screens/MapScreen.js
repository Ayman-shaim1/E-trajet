import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Header,
  Modal,
  ChooseDirection,
  ChooseTransportation,
} from "../components";
import { useLocation } from "../hooks";
import MapView, { Polyline, Marker as RNMMarker } from "react-native-maps";
import { MapAlert, MapCrPosMarker, MapToast } from "../components/Map";
import { Alert } from "../services";
import { Fontisto } from "@expo/vector-icons";
import colors from "../config/colors";

export default function MapScreen({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeInterface, setActiveInterface] = useState(0);
  const [startPosition, setStartPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  const [transportation, setTransportation] = useState("");
  const [seat, setSeat] = useState(1);
  const [startTrip, setStartTrip] = useState(false);

  const { location, error } = useLocation();

  const setPositionsHandler = (stPos, endPos) => {
    setActiveInterface(1);
    setStartPosition(stPos);
    setEndPosition(endPos);
  };

  const setTransportationHandler = trans => {
    setTransportation(trans);
    setActiveInterface(0);
    setModalVisible(false);
    setStartTrip(true);
  };

  const closeModalHandler = () => {
    setActiveInterface(0);
    setModalVisible(false);
    if (route.params) route.params.destination = null;
  };

  const openModalHandler = () => {
    setModalVisible(true);
  };

  const cancelHandler = () => {
    if (route.params) route.params.destination = null;
    setEndPosition(null);
    setStartTrip(null);
    setTransportation(null);
    setModalVisible(false);
  };

  const chnageSeatHandler = seat => {
    setSeat(seat);
  };

  const goToPaimentHandler = () => {
    navigation.navigate("Paiment", { transportation, cancelHandler });
  };
  useEffect(() => {
    if (route.params && route.params.destination) {
      setModalVisible(true);
    }
    if (error) {
      Alert.open({
        type: "danger",
        title: "Location Error",
        message: error,
      });
    }
  }, [error, endPosition, startPosition, endPosition, route.params]);

  return (
    <>
      {/* Begin Header */}
      <View style={styles.headerContainer}>
        <Header textColor='darkGray' />
      </View>
      {transportation && transportation.transportationsWay && (
        <View
          style={{
            top: "14%",
            position: "absolute",
            zIndex: 1000,
            width: "100%",
          }}>
          {transportation.transportationsWay.code !== "taxi" ? (
            <>
              <MapToast
                text={`You have been choose to ${transportation.transportationsWay.name} as the best trasportation  way`}
              />
              <MapToast
                text={`Black line mean you have to go to the stop positions using your feet`}
              />
              <MapToast
                text={`Yellow line mean the direction of ${transportation.transportationsWay.code}`}
              />
            </>
          ) : (
            <>
              <MapToast
                text={`You have been choose to ${transportation.transportationsWay.name} as the best trasportation  way`}
              />
              <MapToast
                text={`yellow line mean the direction of ${transportation.transportationsWay.code}`}
              />
            </>
          )}
        </View>
      )}
      {/* End Header */}
      <Modal show={modalVisible} onClose={closeModalHandler}>
        {activeInterface === 0 ? (
          <ChooseDirection
            navigation={navigation}
            route={route}
            setPositions={setPositionsHandler}
            closeModal={closeModalHandler}
            openModal={openModalHandler}
            changeSeat={chnageSeatHandler}
          />
        ) : (
          <ChooseTransportation
            setTransportation={setTransportationHandler}
            startPosition={startPosition}
            endPosition={endPosition}
            seat={seat}
          />
        )}
      </Modal>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude + 0.0011115,
            longitude: location.longitude + 0.0001115,
            latitudeDelta: 0.008,
            longitudeDelta: 0.001,
          }}>
          {transportation &&
            transportation.directions &&
            transportation.directions.length > 0 &&
            transportation.directions.map((item, index) => (
              <Polyline
                key={index}
                coordinates={item.direction}
                strokeColor={item.color}
                strokeWidth={8}
              />
            ))}

          <MapCrPosMarker
            coordinate={{
              longitude: location.longitude,
              latitude: location.latitude,
            }}
          />

          {startPosition && (
            <RNMMarker coordinate={startPosition}>
              <Fontisto
                name='map-marker-alt'
                size={24}
                color={colors.darkGray}
              />
            </RNMMarker>
          )}
          {endPosition && (
            <RNMMarker coordinate={endPosition}>
              <Fontisto
                name='map-marker-alt'
                size={24}
                color={colors.darkGray}
              />
            </RNMMarker>
          )}
        </MapView>
      )}

      {!startTrip ? (
        location ? (
          !transportation && (
            <MapAlert
              title={`Get started your trip`}
              message={
                "Where you want to go ? click on get stared button start yout trip"
              }
              type='warning'
            />
          )
        ) : (
          <MapAlert
            title={`Map loading`}
            message={
              "Please wait before you start a trip we should get your position "
            }
            type='mapLoading'
          />
        )
      ) : (
        <></>
      )}
      {!startTrip ? (
        <View
          style={{
            position: "absolute",
            bottom: "15%",
            alignSelf: "center",
            width: "90%",
          }}>
          <Button
            variant='primary'
            text='Get started'
            onPress={() => setModalVisible(true)}
            disabled={!location ? true : false}
          />
        </View>
      ) : (
        <View
          style={{
            position: "absolute",
            bottom: "13%",
            alignSelf: "center",
            width: "90%",
          }}>
          <Button
            variant='primary'
            text='pay now'
            onPress={goToPaimentHandler}
          />
          <Button variant='danger' text='cancel' onPress={cancelHandler} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    top: "4%",
    alignSelf: "center",
    width: "100%",
    zIndex: 4000,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  loadingTextContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    alignSelf: "center",
    width: "100%",
    zIndex: 1000,
    transform: [{ translateX: -50 }, { translateY: -20 }],
  },
  loadingText: {
    fontSize: 30,
  },
});
