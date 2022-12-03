import React from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Overlay,
  OverlayComponent,
} from "react-native-maps";
import { Foundation } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";
import { Ionicons } from "@expo/vector-icons";
import { CatCard_map } from "../cards/CatCard_map";

export default function MapPage({ navigation }) {
  const { height, width } = useWindowDimensions();
  const buttonHandler = () => {
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.3387,
          longitude: -121.8853,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 37.3387, longitude: -121.8853 }}>
          <View>
            {/* <Pressable> */}
            <Foundation name="marker" size={50} color={Colors.orangeText} />
            {/* </Pressable> */}
          </View>
          <Callout>
            <View style={{ width: 100, height: 100, backgroundColor: "white" }}>
              <Text>Hi Hi hi</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          width: width,
          height: 90,
          backgroundColor: "white",
          position: "absolute",
          top: 0,
        }}
      >
        <View style={{ top: 40, position: "absolute" }}>
          <Pressable
            // onPress={navigation.goBack}
            style={{ marginLeft: 15 }}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color="black"
              style={{ top: 12 }}
            />
          </Pressable>
          <View
            style={{
              alignItems: "center",
              width: width,
            }}
          >
            <Text
              style={{ fontFamily: "PoppinsSemiBold", fontSize: 20, top: -15 }}
            >
              Location
            </Text>
          </View>
        </View>
      </View>

      {/* Scrollable card */}
      <ScrollView
        horizontal={true}
        style={{
          flexDirection: "row",
          width: width,
          height: 100,
          backgroundColor: "transparent",
          position: "absolute",
          top: height - 200,
          // left: 20,
        }}
      >
        {/* Add space to the beginning */}
        <View style={{ width: 20 }}></View>

        {/* Cat card list here */}
        <CatCard_map></CatCard_map>
        <CatCard_map></CatCard_map>
      </ScrollView>
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
