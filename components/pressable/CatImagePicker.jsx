import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, {useState} from 'react';
import { Image, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { BottomSheet } from '@rneui/themed';

export default function CatImagePicker({ image, setImage }) {

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });

    setIsBottomSheetVisible(false);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImageFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this app to access your camera!");
      return;
    }
    
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });

    setIsBottomSheetVisible(false);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <Pressable style={
        image ?
          { width: 200, height: 200, backgroundColor: 'white', borderRadius: 12 } :
          { width: "100%", height: 200, backgroundColor: 'white', borderRadius: 12 }}
        onPress={ () => setIsBottomSheetVisible(true)} >
        {image ?
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> :
          <View style={styles.container}>
            <Entypo name="camera" size={57} color="#ADADAD" />
            <Text style={styles.text}>Upload Image</Text>
          </View>}
      </Pressable>
      <BottomSheet isVisible={isBottomSheetVisible}>
        <Pressable style={styles.bottomSheetPressable} onPress={pickImage}><Text>Choose From Camera Roll</Text></Pressable>
        <Pressable style={styles.bottomSheetPressable} onPress={pickImageFromCamera}><Text>Take a Photo</Text></Pressable>
        <Pressable style={styles.bottomSheetPressable} onPress={ () => setIsBottomSheetVisible(false)}><Text>Cancel</Text></Pressable>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 50,
  },
  text: {
    fontFamily: "Poppins",
    color: '#ADADAD',
    fontSize: 17
  },
  bottomSheetPressable: {
    backgroundColor: 'white',
    alignItems: "center",
    padding: 20
  }
});