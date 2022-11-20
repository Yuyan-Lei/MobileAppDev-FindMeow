import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, ScrollView, Pressable } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import CatBreedSelector from "./CatBreedSelector";
import DatePicker from 'react-native-datepicker';
import { Chip } from '@rneui/themed';
import CatImagePicker from "./CatImagePicker";
import { createCat } from "../../firebaseUtils/cat";
import { writeImageToDB } from "../../firebaseUtils/firestore";

export default function PostNewCatScreen({navigation: {navigate}}) {
    const [catName, setCatName] = useState('');
    const [image, setImage] = useState(null);
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [vaccinated, setVaccinated] = useState(false);
    const [vetChecked, setVetChecked] = useState(false);
    const [dewormed, setDewormed] = useState(false);
    const [ready, setReady] = useState(false);
    const [neutered, setNeutered] = useState(false);

    const onPostNewCat = () => {
        const tags = [];
        if (vaccinated) {
            tags.push('Vaccinated');
        }
        if (vetChecked) {
            tags.push('Vet Checked');
        }
        if (dewormed) {
            tags.push('Dewormed');
        }
        if (ready) {
            tags.push('Ready to go home');
        }
        if (neutered) {
            tags.push('Neutered');
        }
        writeImageToDB(image).
            then(url => {
                createCat({Name: catName, Breed: breed, Birthday: birthDate,
                    Picture: url, Gender: gender, Price: price, Description: description, 
                    Tags: tags, Cattery: '', Contact: '', UploadTime: new Date().getTime()})
            }).then(navigate('Cats'));
    };

    return (
        <ScrollView style={styles.container}>
            <Pressable style={styles.submitButton} onPress={onPostNewCat}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
            <Text style={styles.title}>Upload Cat</Text>
            <CatImagePicker image={image} setImage={setImage}></CatImagePicker>
            <Text style={styles.subTitle}>Cat Name</Text>
            <TextInput 
                placeholder="Name" 
                style={styles.textInput}
                value={catName}
                onChangeText={setCatName}></TextInput>
            <Text style={styles.subTitle}>Breed</Text>
            <CatBreedSelector selectedBreed={breed} setSelectedBreed={setBreed}/>
            <Text style={styles.subTitle}>Birthdate</Text>
            <DatePicker 
                mode="date" 
                date={birthDate}
                onDateChange={setBirthDate}
                showIcon={false}/>
            <Text style={styles.subTitle}>Gender</Text>
            <SelectList
                setSelected={setGender}
                data={[{key: "Female", value: "Female"}, {key: "Male", value: "Male"}]}
                save="value"
                defaultOption={{ key: gender, value: gender }}
                placeholder="Select Gender"
                boxStyles={{
                    backgroundColor: "white",
                    borderWidth: 0
                }}
                search={false}
                />
            <Text style={styles.subTitle}>Price</Text>
            <View style={styles.priceInput}>
                <TextInput 
                    placeholder="100"
                    value={price}
                    onChangeText={setPrice} />
                <View style={{flex: 1}}></View>
                <Text>$</Text>
            </View>
            <Text style={styles.subTitle}>Description</Text>
            <TextInput 
                placeholder="Describe the kitten" 
                style={styles.textInput}
                multiline={true}
                value={description}
                onChangeText={setDescription}/>
            <Text style={styles.subTitle}>Labels</Text>
            <View style={styles.chipContainer}>
                <Chip 
                    title="Vaccinated" 
                    type={vaccinated ? "solid" : "outline"}
                    containerStyle={styles.chip}
                    color="#F59156"
                    onPress={() => setVaccinated(!vaccinated)}></Chip>
                <Chip 
                    title="Vet Checked"
                    type={vetChecked ? "solid" : "outline"}
                    containerStyle={styles.chip}
                    color="#F59156"
                    onPress={() => setVetChecked(!vetChecked)}></Chip>
                <Chip 
                    title="Dewormed" 
                    type={dewormed ? "solid" : "outline"}
                    containerStyle={styles.chip}
                    color="#F59156"
                    onPress={() => setDewormed(!dewormed)}></Chip>
                <Chip 
                    title="Ready to go home" 
                    type={ready ? "solid" : "outline"}
                    containerStyle={styles.chip}
                    color="#F59156"
                    onPress={() => setReady(!ready)}></Chip>
                <Chip 
                    title="Neutered"
                    type={neutered ? "solid" : "outline"}
                    containerStyle={styles.chip}
                    color="#F59156"
                    onPress={() => setNeutered(!neutered)}></Chip>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        backgroundColor: "#FFFCF6",
        flex: 1,
    },
    submitButton: {
        marginTop: '20%',
        alignSelf: "flex-end",
    },
    submitButtonText: {
        color: '#F59156',
        fontFamily: 'Montserrat',
    },
    title: {
        color: '#F59156',
        fontSize: 26,
        fontFamily: 'Montserrat',
        fontWeight: '700',
    },
    subTitle: {
        color: '#F59156',
        fontFamily: 'Montserrat',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14,
        fontWeight: '600',
    },
    textInput: {
        height: 60,
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "white", 
        padding: 10
    },
    priceInput: {
        flexDirection: 'row',
        backgroundColor: "white", 
        height: 60,
        borderRadius: 20,
        alignItems: "center",
        padding: 10
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 5
    }
  });
