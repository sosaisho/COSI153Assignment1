
import { Text, StyleSheet, View, TouchableOpacity, FlatList, useColorScheme, Image, ScrollView, Button, Alert, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function userAccount({ route, navigation }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        async function load() {
            await AsyncStorage.getItem("userName").then((res) => {
                console.log(res);
                if (res !== undefined && res !== null) {
                    setUserName(res);
                }
            });
            await AsyncStorage.getItem("userEmail").then((res) => {
                console.log(res);
                if (res !== undefined && res !== null) {
                    setEmail(res);
                }
            });
        }
        load();
    }, []);

    async function saveUser() {
        if (userName === "" || email === "") {
            Alert.alert("You must enter valid name and/or email");
            return;
        }
        await AsyncStorage.setItem("userName", userName).then((res) => console.log("saved username"));
        await AsyncStorage.setItem("userEmail", email).then((res) => console.log("saved email"));
        Alert.alert("Successfully saved your information!");
    }

    return (
        <View style={styles.container}>
            <Text>This user likes: {route.params.likes}</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: "blue"}}
                placeholder="Type your name(last name, first name)"
                onChangeText={(text) => setUserName(text)}
                value={userName}
            />
            <TextInput
                style={{ borderWidth: 1, borderColor: "blue",}}
                placeholder="Type your email address"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <Button
                title="Submit"
                onPress={() => saveUser()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    headline: {
        fontSize: 18,
        fontWeight: "bold"
    },
    card: {
        marginVertical: 5,
    },
    clipboardButton: {
        margin: 10,
    },
    settingsButton: {
        margin: 10,
        marginVertical: 5,
    },
    settingsButtonInner: {
        justifyContent: "flex-start"
    },
    searchFab: {
        position: "absolute",
        margin: 24,
        right: 0,
        bottom: 0,
    },
    headerButtons: {
        flexDirection: "row"
    },
    headerButtonInner: {
        marginHorizontal: 10,
    },
    chipContainer: {
        margin: 10,
    },
    chip: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 2
    },
    containerHorizontal: {
        flexDirection: "row"
    }
});
