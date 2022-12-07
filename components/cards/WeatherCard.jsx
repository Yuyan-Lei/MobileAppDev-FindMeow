import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors } from "../styles/Colors";
import { WEATHERS } from "../listContents/weathers";

export function WeatherCard({ weatherData }) {
  // Get current weather and temperature data.
  var weather = weatherData.weather[0].main;
  var temperature = weatherData.main.temp;

  // Show different sentence based on the weather and temperature.
  let sentence = "";
  if (weather === "Sunny") {
    sentence = WEATHERS.sunny;
  } else if (weather === "Rain") {
    sentence = WEATHERS.rain;
  } else if (weather === "Clouds") {
    sentence = WEATHERS.clouds;
  } else if (weather === "Snow") {
    sentence = WEATHERS.snow;
  } else if (weather === "Lightning") {
    sentence = WEATHERS.lightning;
  } else if (temperature <= 10) {
    sentence = WEATHERS.cold;
  } else if (temperature >= 30) {
    sentence = WEATHERS.hot;
  } else {
    sentence = WEATHERS.default;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.weatherText}>{sentence}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 10,
  },
  weatherText: {
    fontFamily: "PoppinsLight",
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
  },
});
