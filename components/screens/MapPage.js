import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import MapView from "react-native-maps";

export default function MapPage() {
  const { height, width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          alignItems: "center",
          backgroundColor: "red",
          width: width,
          height: 200,
        }}
      >
        <Text>Location</Text>
        <Text>Location</Text>
        <Text>Location</Text>
        <Text>Location</Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.3387,
          longitude: -121.8853,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    // top: 130,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
