import { StyleSheet } from "react-native";
import React from "react";
import MapView, { Polyline } from "react-native-maps";

export default function MiniMap({ coords }) {
  if (coords && coords.length > 0) {
    return (
      <MapView
        style={styles.map}
        zoomEnabled={false}
        scrollEnabled={false}
        initialRegion={{
          latitude: coords[0].direction[0].latitude,
          longitude: coords[0].direction[0].longitude,
          latitudeDelta: 0.00001,
          longitudeDelta: 0.009,
        }}>
        {coords.map((item, index) => (
          <Polyline
            key={index}
            coordinates={item.direction}
            strokeColor={item.color}
            strokeWidth={5}
          />
        ))}
      </MapView>
    );
  } else return <></>;
}

const styles = StyleSheet.create({
  map: { height: 110, width: 110, borderRadius: 6,marginHorizontal:10, },
});
