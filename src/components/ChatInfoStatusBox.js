import React from "react";
import { Image, View, Text } from "react-native";
import styles from "./utils/styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import StatusBox from "./StatusBox";

const ChatInfoStatusOptionBox = (props) => {
  return (
    <Pressable
      onPress={() =>
        props.navigation.navigate(props.routeName, {
          bubbleID: props.bubbleID,
          headerTitle: props.headerTitle,
          bubbleTitle: props.bubbleTitle,
        })
      }
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#D9D9D9" : "#FFFFFF00",
        },
      ]}
    >
      <View style={styles.optionContainer}>
        <Image source={props.icon} style={styles.chatInfoOptionIcon} />
        <Text style={styles.optionText}>{props.name}</Text>
      </View>

      <View style={styles.chatInfoOptionContainer}>
        <StatusBox userStatus={props.userStatus} />
      </View>
    </Pressable>
  );
};

export default ChatInfoStatusOptionBox;
