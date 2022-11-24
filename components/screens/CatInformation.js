import { Feather, Ionicons } from "@expo/vector-icons";
import { Chip } from "@rneui/themed";
import React from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { MessageButton } from "../pressable/MessageButton";
import { PhoneButton } from "../pressable/PhoneButton";
import { rootStackNavigateBack } from "../RootNavigation";
import { Colors } from "../styles/Colors";
import BottomDrawer from "react-native-bottom-drawer-view";

export default class CatInformation extends React.Component {
  renderContent = () => {
    return (
      <View style={{ marginHorizontal: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 20,
          }}
        >
          <View style={styles.label}>
            <View style={styles.tags}>
              <Text style={styles.tagText}>Gender</Text>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>Female</Text>
            </View>
            <View style={styles.tags}>
              <Text style={styles.tagText}>Age</Text>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>1 year</Text>
            </View>
            <View style={styles.tags}>
              <Text style={styles.tagText}>Breed</Text>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>Unknown</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textPrimary}>Kaka</Text>
          <Text
            style={{
              textAlign: "right",
              fontSize: 20,
              fontWeight: "bold",
              color: Colors.darkOrange,
              marginLeft: "auto",
              marginVertical: 20,
            }}
          >
            $200
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Ionicons name="location-sharp" size={24} color={Colors.darkOrange} />
          <Text style={styles.textSecondary}>Santa Clara (0.8km)</Text>
        </View>

        <Text style={styles.date}>Nov 17, 2022</Text>
        <View style={styles.chipBox}>
          <Chip title="Vaccinated" containerStyle={styles.chip} />
          <Chip title="Vet Checked" containerStyle={styles.chip} />
          <Chip title="Dewormed" containerStyle={styles.chip} />
        </View>

        <Text style={styles.contact}>Contact Info</Text>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text>Angel Girls</Text>
            <Text style={styles.date}>Cattery</Text>
          </View>
          <View style={styles.buttonView}>
            <PhoneButton />
            <MessageButton />
          </View>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View>
        <Image
          source={require("../pictures/kaka.jpg")}
          resizeMode="cover"
          style={{ height: 450, width: 500 }}
        ></Image>
        <View style={{ position: "absolute", top: 48, left: 12 }}>
          <View style={{ opacity: 0.5 }}>
            <Pressable onPress={rootStackNavigateBack}>
              <Feather name="arrow-left-circle" size={24} color="white" />
            </Pressable>
          </View>
        </View>
        <BottomDrawer
          containerHeight={800}
          downDisplay={300}
          startUp={false}
          backgroundColor={Colors.dimGray}
          borderRadius={30}
        >
          {this.renderContent()}
        </BottomDrawer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    marginTop: 1000,
    width: 100,
    alignSelf: "flex-end",
  },
  card: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  label: {
    alignItems: "center",
    flexDirection: "row",
  },
  tags: {
    backgroundColor: "white",
    marginHorizontal: 20,
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
  },
  tagText: {
    color: Colors.gray,
    padding: 5,
    width: 80,
    textAlign: "center",
  },
  textPrimary: {
    textAlign: "left",
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "left",
    fontSize: 14,
    marginLeft: 6,
  },
  chip: {
    marginVertical: 15,
    marginHorizontal: 10,
    height: 35,
  },
  contact: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonView: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  roundButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  chipBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  date: {
    color: Colors.gray,
    marginVertical: 8,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
  },
});
