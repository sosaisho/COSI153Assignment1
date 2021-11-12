import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, useColorScheme, Image, ScrollView, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import userAccount from "./userAccount"
import { useNavigation } from "@react-navigation/native";
import { Provider as PaperProvider } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph, TextInput, Headline, DefaultTheme, LeftContent } from 'react-native-paper';


const Root = createNativeStackNavigator();
const dog = require("./assets/Teacup-Poodle-Pic.jpeg")

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Root.Navigator>
          <Root.Screen name="Home" component={Home}
            headerMode={"screen"}
            options={({ navigation, route }) => ({
              headerTintColor: DefaultTheme.colors.primary,
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                  <MaterialIcons name="settings" size={24} color={DefaultTheme.colors.primary} />
                </TouchableOpacity>
              )
            })}
          />
          <Root.Screen name="About" component={About}
            headerMode={"screen"}
            options={{
              headerTintColor: DefaultTheme.colors.primary
            }}
          />
          <Root.Screen name="Settings" component={Settings}
            headerMode={"screen"}
            options={({ navigation, route }) => ({
              headerTintColor: DefaultTheme.colors.primary,
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("About")}>
                  <MaterialIcons name="info" size={24} color={DefaultTheme.colors.primary} />
                </TouchableOpacity>
              )
            })}
          />
          <Root.Screen name="User Account" component={userAccount} headerMode={"screen"}
            options={{
              headerTintColor: DefaultTheme.colors.primary
            }} />
        </Root.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function Home() {
  const [dogs, setDogs] = useState([]);
  useEffect(() => {
    async function fetchDog() {
      await fetch("http://random.dog/doggos?include=jpg")
        .then((response) => response.json())
        .then((responseJson) => setDogs(responseJson.slice(0,100)))
          .catch((error) => {
            console.error(error);
          })
    }
    fetchDog();
  }, []);

  function renderDog(dog) {
    return (
      <Card>
        <Card.Cover source={{ uri: "https://random.dog/"+dog }} />
        <Card.Actions>
          <Button onPress={() => Alert.alert("You liked a picture!")}>
            Like
          </Button>
        </Card.Actions>
      </Card>
    )
  }

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button
        onPress={() => navigation.navigate("User Account", { likes: "Dogs" })}
        mode="contained"
      >
        Make User Account
        </Button>
      <FlatList
        data={dogs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => renderDog(item.item)}
      />
      <Image source={{ uri: 'https://www.photolibrary.jp/mhd7/img631/450-20180907205036139279.jpg' }}
        style={{ flex: 1, height: null, width: null, margin: 10 }} />
    </View>
  );
}

function About() {
  return (
    <View style={styles.containerHorizontal}>
      <ScrollView contentContainerStyle={styles.chipContainer} horizontal={true}>
        <Text style={{ color: DefaultTheme.colors.primary }}>This app let you look at cute animal pictures of your choice.</Text>
        <Text style={{ color: DefaultTheme.colors.primary }}> Hope the pictures of cute animals make your day better!</Text>
      </ScrollView>
    </View>
  );
}

function Settings() {
  return (
    <ScrollView contentContainerStyle={{ marginHorizontal: 5, marginVertical: 20 }}>
      <Headline style={{ color: DefaultTheme.colors.primary, marginBottom: 5 }}>PICK YOUR FAVORITE ANIMAL</Headline>
      <Card>
        <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1635&q=80' }} />
        <Card.Actions>
          <Button
            onPress={() => Alert.alert("We will find you dog pictures!")}>
            I want a dog!
        </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Cover source={{ uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.749xh;0,0.154xh&resize=768:*' }} />
        <Card.Actions>
          <Button
            onPress={() => Alert.alert("We will find you cat pictures!")}>
            I want a cat!
        </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Cover source={{ uri: 'https://i2.wp.com/ihearthorses.com/wp-content/uploads/2020/04/Canva-Pony-portrait-1-1536x1024.jpg' }} />
        <Card.Actions>
          <Button
            onPress={() => Alert.alert("We will find you pony pictures!")}>
            I want a pony!
        </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Cover source={{ uri: 'https://www.yellow.com.mt/sys/articles/1043/5ffd8d4f357f7_shutterstock160546226.jpg' }} />
        <Card.Actions>
          <Button
            onPress={() => Alert.alert("We will find you bunny pictures!")}>
            I want a bunny!
        </Button>
        </Card.Actions>
      </Card>
      <TextInput
        style={styles.input}
        style={{ borderWidth: 1, borderColor: "blue", fontFamily: 'Academy Engraved LET' }}
        placeholder=" Type here if you want to see other animals"
      />
    </ScrollView>
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
