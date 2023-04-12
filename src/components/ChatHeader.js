import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { Avatar } from "@rneui/base";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import useIcon from "../hooks/useIcon";
import useIndicator from "../hooks/useIndicator";

const profileImg = require("../assets/profile-picture.png");

const ChatHeader = ({ navigation, title, type, convID }) => {
  const backIcon = useIcon("backIcon");
  const infoIcon = useIcon("infoIcon");
  const friendIndicator = useIndicator("invisible");

  return (
    <View style={styles.headerContainer}>
      <Pressable
        onPress={() => navigation.navigate("Home")}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#D9D9D9" : "#FFFFFF00",
            borderRadius: 50,
            marginRight: 10,
            marginLeft: 20,
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
        // change to either ChatInfo for individual or ChatInfoGroup for group chats
        onPress={() =>
          navigation.navigate(type == "Direct" ? "ChatInfo" : "ChatInfoGroup", {
            title: title,
            convID: convID,
          })
        }
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
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: "white",
    paddingTop: 20,
  },
  headerBackButton: {
    width: 18,
    height: 18,
    margin: 5,
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
