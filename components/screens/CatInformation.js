import { Feather, Ionicons } from "@expo/vector-icons";
import { Button, Chip, Overlay } from "@rneui/themed";
import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { MessageButton } from "../pressable/MessageButton";
import { PhoneButton } from "../pressable/PhoneButton";
import { rootStackNavigateBack } from "../RootNavigation";
import { Colors } from "../styles/Colors";
import { useWindowDimensions } from "react-native";
import { HeartButton } from "../pressable/HeartButton";
import {
  Backdrop,
  BackdropSubheader,
  AppBar,
  IconButton,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import BottomDrawer from "react-native-bottom-drawer-view";

// const CatInformation = () => {
//   const [visible, setVisible] = useState(false);
//   const [value, setValue] = useState(0);
//   const { height, width } = useWindowDimensions();
//   const [revealed, setRevealed] = useState(false);

//   return (
// <View style={styles.container}>
//   <ImageBackground
//     source={require("../pictures/kaka.jpg")}
//     resizeMode="cover"
//     style={styles.image}
//   >
//     <Button title="Cat info" buttonStyle={styles.button} />

//     <Overlay style={styles.card}>
//       <View style={{ position: "absolute", top: 12, left: 12 }}>
//         <View style={{ opacity: 0.5 }}>
//           <Pressable onPress={rootStackNavigateBack}>
//             <Feather name="arrow-left-circle" size={24} color="black" />
//           </Pressable>
//         </View>
//       </View>

//       {/* card format */}
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-evenly",
//           marginVertical: 20,
//         }}
//       >
//         <View style={styles.label}>
//           <View style={styles.tags}>
//             <Text style={{ color: Colors.gray }}>Gender</Text>
//             <Text>Female</Text>
//           </View>
//           <View style={styles.tags}>
//             <Text style={{ color: Colors.gray }}>Age</Text>
//             <Text>1 year</Text>
//           </View>
//           <View style={styles.tags}>
//             <Text style={{ color: Colors.gray }}>Breed</Text>
//             <Text>Unknown</Text>
//           </View>
//         </View>
//       </View>

//       <View style={{ flexDirection: "row" }}>
//         <Text style={styles.textPrimary}>Kaka</Text>
//         <Text
//           style={{
//             textAlign: "right",
//             fontSize: 20,
//             fontWeight: "bold",
//             color: Colors.darkOrange,
//             marginLeft: "auto",
//           }}
//         >
//           $200
//         </Text>
//       </View>

//       <View style={{ flexDirection: "row" }}>
//         <Ionicons
//           name="location-sharp"
//           size={24}
//           color={Colors.darkOrange}
//         />
//         <Text style={styles.textSecondary}>Santa Clara (0.8km)</Text>
//       </View>

//       <Text style={styles.date}>Nov 17, 2022</Text>
//       <View style={styles.chipBox}>
//         <Chip title="Vaccinated" containerStyle={styles.chip} />
//         <Chip title="Vet Checked" containerStyle={styles.chip} />
//         <Chip title="Dewormed" containerStyle={styles.chip} />
//         <Text>Hi</Text>
//       </View>

//       <Text style={styles.contact}>Contact Info</Text>
//       <View style={{ flexDirection: "row" }}>
//         <View>
//           <Text>Angel Girls</Text>
//           <Text style={styles.date}>Cattery</Text>
//         </View>
//         <View style={styles.buttonView}>
//           <PhoneButton />
//           <MessageButton />
//         </View>
//       </View>
//     </Overlay>
//   </ImageBackground>
// </View>

// new version
// <View>
//   {/* <View> */}
//     <View style={{ height: 400, backgroundColor: "gray" }}>
//       <Image
//         source={require("../pictures/kaka.jpg")}
//         resizeMode="cover"
//         style={{ height: 430, width: width }}
//       ></Image>
//     </View>
//   </View>

//   <View style={{ position: "absolute", top: 48, left: 12 }}>
//     <View style={{ opacity: 0.5 }}>
//       <Pressable onPress={rootStackNavigateBack}>
//         <Feather name="arrow-left-circle" size={24} color="white" />
//       </Pressable>
//     </View>
//   </View>

// <View style={{ top: -80, width: width }}>
//   <View style={{ height: 24 }} />
//   <View
//     style={{ padding: 24, backgroundColor: "white", borderRadius: 35 }}
//   >
//     <Text style={{ color: "orange", fontWeight: "500" }}>About</Text>
//     <Text>hello world</Text>
//     <View style={{ flexDirection: "row" }}>
//       <Text style={{ fontWeight: "500", color: Colors.black }}>
//         Phone:{" "}
//       </Text>
//       <Text>111</Text>
//     </View>
//     <View style={{ flexDirection: "row" }}>
//       <Text style={{ fontWeight: "500", color: Colors.black }}>
//         Website:{" "}
//       </Text>
//       <Text>http://xxx</Text>
//     </View>
//   </View>
// </View>
// </View>

// second version
// <Backdrop
//   revealed={revealed}
//   header={
//     <AppBar
//       style={{
//         marginTop: 450,
//         alignSelf: "flex-end",
//         // backgroundColor: "black",
//       }}
//       // title="See More"
//       transparent
//       leading={(props) => (
//         <IconButton
//           icon={(props) => (
//             <Icon name={revealed ? "close" : "menu"} {...props} />
//           )}
//           onPress={() => setRevealed((prevState) => !prevState)}
//           {...props}
//         />
//       )}
//     />
//   }
//   style={{ marginTop: -30 }}
//   headerContainerStyle={{ backgroundColor: "gray" }}
//   subheaderContainerStyle={{ backgroundColor: "black" }}
//   // frontLayerContainerStyle={{ backgroundColor: "yellow" }}
//   backLayerContainerStyle={{ backgroundColor: "green" }}
//   backLayer={<View style={{ height: 200 }} />}
// >
//   <BackdropSubheader
//     // title="Subheader Hello World"
//     style={{ textAlign: "center" }}
//   />
//   {/* <Text>hihihihi</Text> */}
//   <View style={{ marginHorizontal: 20 }}>
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "space-evenly",
//       }}
//     >
//       <View style={styles.label}>
//         <View style={styles.tags}>
//           <Text style={{ color: Colors.gray }}>Gender</Text>
//           <Text>Female</Text>
//         </View>
//         <View style={styles.tags}>
//           <Text style={{ color: Colors.gray }}>Age</Text>
//           <Text>1 year</Text>
//         </View>
//         <View style={styles.tags}>
//           <Text style={{ color: Colors.gray }}>Breed</Text>
//           <Text>Unknown</Text>
//         </View>
//       </View>
//     </View>
//     <View style={{ flexDirection: "row" }}>
//       <Text style={styles.textPrimary}>Kaka</Text>
//       <Text
//         style={{
//           textAlign: "right",
//           fontSize: 20,
//           fontWeight: "bold",
//           color: Colors.darkOrange,
//           marginLeft: "auto",
//         }}
//       >
//         $200
//       </Text>
//     </View>

//     <View style={{ flexDirection: "row" }}>
//       <Ionicons name="location-sharp" size={24} color={Colors.darkOrange} />
//       <Text style={styles.textSecondary}>Santa Clara (0.8km)</Text>
//     </View>

//     <Text style={styles.date}>Nov 17, 2022</Text>
//     <View style={styles.chipBox}>
//       <Chip title="Vaccinated" containerStyle={styles.chip} />
//       <Chip title="Vet Checked" containerStyle={styles.chip} />
//       <Chip title="Dewormed" containerStyle={styles.chip} />
//     </View>

//     <Text style={styles.contact}>Contact Info</Text>
//     <View style={{ flexDirection: "row" }}>
//       <View>
//         <Text>Angel Girls</Text>
//         <Text style={styles.date}>Cattery</Text>
//       </View>
//       <View style={styles.buttonView}>
//         <PhoneButton />
//         <MessageButton />
//       </View>
//     </View>
//   </View>
// </Backdrop>

//   );
// };

const IMAGE_HEIGHT = 49;
// const HEADER_HEIGHT = 60;
export default class CatInformation extends React.Component {
  renderContent = () => {
    return (
      <View>
        <Text>hello world</Text>
      </View>
    );
  };
  render() {
    return (
      <BottomDrawer containerHeight={400} offset={IMAGE_HEIGHT}>
        {this.renderContent()}
      </BottomDrawer>
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
    backgroundColor: Colors.labelBackground,
    marginHorizontal: 20,
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
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
