import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, useColorScheme, Image, ScrollView, Button, Alert, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";


const Root = createNativeStackNavigator();
const dog = require("./assets/Teacup-Poodle-Pic.jpeg")

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Root.Navigator>
        <Root.Screen name="Home" component={Home}
          headerMode={"screen"}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <MaterialIcons name="settings" size={24} color={'#FFC0CB'} />
              </TouchableOpacity>
            )
          })}
        />
        <Root.Screen name="About" component={About}
          headerMode={"screen"}
        />
        <Root.Screen name="Settings" component={Settings}
          headerMode={"screen"}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("About")}>
                <MaterialIcons name="info" size={24} color={'#FFC0CB'} />
              </TouchableOpacity>
            )
          })}
        />
      </Root.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  return (
    <View style={styles.container}>
      <Text>This is the home screen :)</Text>
      <StatusBar style="auto" />
      <Button
        title="Press me"
        onPress={() => Alert.alert("You pressed a button")}
      />
      <Image source = {dog}
      style={{ flex: 1, height: null, width: null, margin: 10 }}/>
    </View>
  );
}

function About() {
  return (
    <View style={styles.containerHorizontal}>
       <ScrollView contentContainerStyle={styles.chipContainer} horizontal={true}>
       <Text>This app let you look at cute animal pictures of your choice.</Text>
      <Text> Hope the pictures of cute animals make your day better!</Text>
       </ScrollView>
    </View>
  );
}

function Settings() {
  return (
    <View style={styles.container}>
      <Text>Pick your preferred pet</Text>
      <Button
        title="Dog"
        onPress={() => Alert.alert("We will find you dog pictures!")}
      />
      <Button
        title="Cat"
        onPress={() => Alert.alert("We will find you cat pictures!")}
      />
      <Button
        title="Horse"
        onPress={() => Alert.alert("We will find you horse pictures!")}
      />
      <Button
        title="Bird"
        onPress={() => Alert.alert("We will find you bird pictures!")}
      />
       <TextInput
        style={styles.input}
        style={{borderWidth: 1, borderColor: "blue", fontFamily: 'Academy Engraved LET'}}
        placeholder=" Type here if you want to see other animals"
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
  containerHorizontal:{
    flexDirection: "row"
  }
});
