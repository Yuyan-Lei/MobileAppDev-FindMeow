import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, ScrollView, Pressable } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import CatBreedSelector from "./CatBreedSelector";
import DatePicker from 'react-native-datepicker';
import { Chip } from '@rneui/themed';
import CatImagePicker from "./CatImagePicker";

export default function PostNewCatScreen() {
    const [catName, setCatName] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [vaccinated, setVaccinated] = useState(false);
    const [vetChecked, setVetChecked] = useState(false);
    const [dewormed, setDewormed] = useState(false);
    const [ready, setReady] = useState(false);
    const [neutered, setNeutered] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <Pressable style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
            <Text style={styles.title}>Upload Cat</Text>
            <CatImagePicker></CatImagePicker>
            <Text style={styles.subTitle}>Cat Name</Text>
            <TextInput placeholder="Name" style={styles.textInput}></TextInput>
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
                <TextInput placeholder="100" />
                <View style={{flex: 1}}></View>
                <Text>$</Text>
            </View>
            <Text style={styles.subTitle}>Description</Text>
            <TextInput 
                placeholder="Describe the kitten" 
                style={styles.textInput}
                multiline={true}/>
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

