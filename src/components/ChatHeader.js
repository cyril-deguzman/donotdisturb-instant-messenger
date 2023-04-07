import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { Avatar } from "@rneui/base";
// import styles from "./utils/styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import useIcon from "../hooks/useIcon";
import useIndicator from "../hooks/useIndicator";

const profileImg = require("../assets/profile-picture.png");

const ChatHeader = ({ navigation, title }) => {
  const backIcon = useIcon("backIcon");
  const infoIcon = useIcon("infoIcon");
  const friendIndicator = useIndicator("invisible");

  return (
    <View style={styles.headerContainer}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#D9D9D9" : "#FFFFFF00",
            borderRadius: 50,
          },
        ]}
      >
        <Image source={backIcon} style={styles.headerBackButton} />
      </Pressable>
      <View>
        <Avatar size={40} rounded source={profileImg} />
        <Image source={friendIndicator} style={styles.indicator} />
      </View>
      <Text style={styles.headerText}>{title}</Text>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#D9D9D9" : "#FFFFFF00",
            borderRadius: 50,
            marginRight: 10,
          },
        ]}
      >
        <Image source={infoIcon} style={styles.headerInfoButton} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "white",
    paddingTop: 20,
  },
  headerBackButton: {
    width: 18,
    height: 18,
    marginLeft: 20,
    marginRight: 10,
    tintColor: "#7A6BBC",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
    flex: 1,
  },
  headerInfoButton: {
    width: 22,
    height: 22,
    margin: 10,
  },
  indicator: {
    position: "absolute",
    width: 13,
    height: 13,
    bottom: 0,
    right: -1,
  },
});

export default ChatHeader;