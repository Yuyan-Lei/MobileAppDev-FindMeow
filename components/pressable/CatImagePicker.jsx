import { Entypo } from "@expo/vector-icons";
import { BottomSheet } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export default function CatImagePicker({ image, setImage }) {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.2,
      });

      setIsBottomSheetVisible(false);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert("Error", "Unable to pick image");
    }
  };

  const pickImageFromCamera = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("You've refused to allow this app to access your camera!");
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.2,
      });

      setIsBottomSheetVisible(false);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert("Error", "Unable to pick image");
    }
  };

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
              {
                backgroundColor: pressed ? Colors.catInfoMainBackground : Colors.white,
              },
          image
            ? {
                width: 200,
                height: 200,
                borderRadius: 12,
              }
            : {
                width: "100%",
                height: 200,
                borderRadius: 12,
              }
          ]
        }
        onPress={() => setIsBottomSheetVisible(true)}
      >
        {image ? (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        ) : (
          <View style={styles.container}>
            <Entypo name="camera" size={57} color={Colors.gray} />
            <Text style={styles.text}>Upload Image</Text>
          </View>
        )}
      </Pressable>
      <BottomSheet isVisible={isBottomSheetVisible}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? Colors.catInfoMainBackground : Colors.white,
            },
            styles.bottomSheetPressable,
          ]}
          onPress={pickImage}
        >
          <Text>Choose From Camera Roll</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? Colors.catInfoMainBackground : Colors.white,
            },
            styles.bottomSheetPressable,
          ]}
          onPress={pickImageFromCamera}
        >
          <Text>Take a Photo</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? Colors.catInfoMainBackground : Colors.white,
            },
            styles.bottomSheetPressable,
          ]}
          onPress={() => setIsBottomSheetVisible(false)}
        >
          <Text>Cancel</Text>
        </Pressable>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 50,
  },
  text: {
    fontFamily: FontFamily.normal,
    color: Colors.gray,
    fontSize: FontSizes.button,
  },
  bottomSheetPressable: {
    alignItems: "center",
    padding: 20,
  },
});
