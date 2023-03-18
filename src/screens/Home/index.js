import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Audience from "./Audience";
import Messages from "./Messages";
import Settings from "./Settings";
import styles from "../utils/styles";

const audienceIcon = require("../../assets/icons/audience-icon.png");
const messagesIcon = require("../../assets/icons/messages-icon.png");
const settingsIcon = require("../../assets/icons/settings-icon.png");

const Home = () => {
  const Tab = createBottomTabNavigator();
  const options = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: styles.tab,
    tabBarItemStyle: styles.item,
    tabBarActiveBackgroundColor: "#F6F6FF",
    initialRouteName: "Messages",
  };

  return (
    <Tab.Navigator initialRouteName="Messages" screenOptions={options}>
      <Tab.Screen
        name="Audience"
        component={Audience}
        options={{
          tabBarIcon: () => (
            <Image style={{ width: 40, height: 38 }} source={audienceIcon} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: () => (
            <Image style={{ width: 28, height: 27 }} source={messagesIcon} />
          ),
          //tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: () => (
            <Image style={{ width: 28, height: 26 }} source={settingsIcon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
