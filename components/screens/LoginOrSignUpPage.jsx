import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { TextInput, Pressable } from "@react-native-material/core";
import { CheckBox } from '@rneui/themed';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseUtils/firebase-setup";
import { createUser, createCattery } from "../../firebaseUtils/user";
import { MaterialCommunityIcons, Entypo, MaterialIcons, Feather } from "@expo/vector-icons";

export default function LoginOrSignUpPage({ route, navigation }) {
    const [pageState, setPageState] = useState(0);
    const [isCattery, setIsCattery] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [website, setWebsite] = useState('');

    const onCreateAccount = () => {
        createUserWithEmailAndPassword(auth, userName, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                return user.email;
            }).then((email) => {
                if (!isCattery) {
                    return createUser(email);
                } else {
                    return createCattery(email, { catteryName: name, phoneNumber, website });
                }
            }).then(() => navigation.navigate('Home'))
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert('SignUp Failed', errorMessage);
            });
    };

    const onSignIn = () => {
        signInWithEmailAndPassword(auth, userName, password).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            navigation.navigate('Home');
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert('Login Failed', errorMessage);
            });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find Your Favorite Cat to Join Your Family</Text>
            <View style={styles.majorContent}>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable
                        style={styles.headPressable}
                        onPress={() => setPageState(0)} >
                        <Text style={pageState === 0 ?
                            styles.selectedButton : styles.notSelectedButton}>Log In</Text>
                    </Pressable>
                    <Pressable
                        style={styles.headPressable}
                        onPress={() => setPageState(1)} >
                        <Text style={pageState === 1 ?
                            styles.selectedButton : styles.notSelectedButton}>Sign Up</Text>
                    </Pressable>
                </View>
                <TextInput
                    label="EMAIL"
                    value={userName}
                    leading={props => <MaterialCommunityIcons name="email" {...props} />}
                    color="#F59156"
                    onChangeText={setUserName} />
                <TextInput
                    label="PASSWORD"
                    secureTextEntry={true}
                    leading={props => <Entypo name="lock" {...props} />}
                    value={password}
                    color="#F59156"
                    onChangeText={setPassword} />
                {
                    pageState === 0 ?
                        <View>
                            <Pressable
                                onPress={() => onSignIn()}
                                style={styles.loginAndSignUpButton}>
                                <Text style={styles.loginAndSignUpButtonText}>Log In</Text>
                            </Pressable>
                        </View> :
                        <View>
                            <CheckBox
                                title="I'm a cattery owner"
                                checked={isCattery}
                                onPress={() => setIsCattery(!isCattery)}
                                textStyle={{ color: "#F59156", fontSize: 17 }}
                                checkedColor="#F59156"
                                containerStyle={{ backgroundColor: 'transparent' }}
                            />
                            {
                                isCattery &&
                                <View>
                                    <TextInput
                                        label="Cattery Name"
                                        value={name}
                                        color="#F59156"
                                        leading={props => <MaterialIcons name="storefront" {...props} />}
                                        onChangeText={setName} />
                                    <TextInput
                                        label="Cattery Phone"
                                        value={phoneNumber}
                                        color="#F59156"
                                        leading={props => <Feather name="phone" {...props} />}
                                        onChangeText={setPhoneNumber} />
                                    <TextInput
                                        label="Cattery Website"
                                        value={website}
                                        color="#F59156"
                                        leading={props => <MaterialCommunityIcons name="web" {...props} />}
                                        onChangeText={setWebsite} />
                                </View>
                            }
                            <Pressable
                                onPress={() => onCreateAccount()}
                                style={styles.loginAndSignUpButton}>
                                <Text style={styles.loginAndSignUpButtonText}>Create Account</Text>
                            </Pressable>
                        </View>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFB801",
        flex: 1,
    },
    majorContent: {
        backgroundColor: "#F9F9F9",
        flex: 1,
        borderRadius: 18,
        padding: 20,
    },
    title: {
        fontSize: 40,
        marginTop: 70,
        marginBottom: 35,
        textAlign: 'center',
        padding: 20,
        fontWeight: '700',
    },
    headPressable: {
        marginHorizontal: 5,
        marginTop: 10,
        marginBottom: 30,
    },
    selectedButton: {
        fontSize: 23,
        color: '#0C0C0E',
        fontWeight: '600',
    },
    notSelectedButton: {
        fontSize: 16,
        color: 'rgba(12, 12, 14, 0.5)',

    },
    loginAndSignUpButton: {
        backgroundColor: "#FFB801",
        borderRadius: 18,
        height: 72,
        alignItems: "center",
        padding: 25,
        marginTop: '10%'
    },
    loginAndSignUpButtonText: {
        textAlign: 'center',
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    textInput: {
        color: '#F59156',
    }
});
