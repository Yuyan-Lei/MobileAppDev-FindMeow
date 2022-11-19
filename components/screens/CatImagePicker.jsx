import React, { useState, useEffect } from 'react';
import { Pressable, Image, View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';

export default function CatImagePicker() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    // <View style={{ width: 200, height: 200, backgroundColor: 'white'}}>
    <Pressable style={{ width: 200, height: 200, backgroundColor: 'white', borderRadius: 12}} onPress={pickImage} >
    {image ? 
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> : 
        <View style={styles.container}>
            <Entypo name="camera" size={57} color="#ADADAD" />
            <Text style={styles.text}>Upload Image</Text>
        </View>}
    </Pressable>
    // </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 50,
    },
    text: {
        color: '#ADADAD',
        fontFamily: 'Montserrat',
        fontSize: 17
    }
  });