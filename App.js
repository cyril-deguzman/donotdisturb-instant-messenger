import React, { useState, createContext, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { useFonts } from "expo-font";

import Home from "./src/screens/Home";
import Chat from "./src/screens/Chat";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import StatusForSpecificAudience from "./src/screens/Home/StatusForSpecificAudience";
import NewMessage from "./src/screens/Home/NewMessage";
import AddBubble from "./src/screens/Home/AddBubble";
import ChatInfo from "./src/screens/Home/ChatInfo";
import ChatInfoGroup from "./src/screens/Home/ChatInfoGroup";
import AddMembers from "./src/screens/Home/AddMembers";
import SeeMembers from "./src/screens/Home/SeeMembers";
import CreateAudience from "./src/screens/Home/CreateAudience";

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator
      defaultScreenOptions={{ Home }}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen
        name="StatusForSpecificAudience"
        component={StatusForSpecificAudience}
      />
      <Stack.Screen name="NewMessage" component={NewMessage} />
      <Stack.Screen name="AddBubble" component={AddBubble} />
      <Stack.Screen name="ChatInfo" component={ChatInfo} />
      <Stack.Screen name="ChatInfoGroup" component={ChatInfoGroup} />
      <Stack.Screen name="AddMembers" component={AddMembers} />
      <Stack.Screen name="SeeMembers" component={SeeMembers} />
      <Stack.Screen name="CreateAudience" component={CreateAudience} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      defaultScreenOptions={{ Login }}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setLoading(false);
    });
    return () => unsubscribe;
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  /** NOTE: Implementation of font loading may not be secure, but working for now. Please check. */
  const [fontsLoaded] = useFonts({
    Inter: require("./src/assets/fonts/Inter.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
