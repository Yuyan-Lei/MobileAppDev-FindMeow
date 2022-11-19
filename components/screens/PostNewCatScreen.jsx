import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import CatBreedSelector from "./CatBreedSelector";
import DatePicker from 'react-native-datepicker';

export default function PostNewCatScreen() {
    const [catName, setCatName] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Cat</Text>
            {/* TODO: Add Image Upload */}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: "#FFFCF6",
        flex: 1,
    },
    title: {
        marginTop: '20%',
        color: 'orange',
        fontSize: 26
    },
    subTitle: {
        color: '#F59156',
        fontFamily: 'Montserrat',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14
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
  });

