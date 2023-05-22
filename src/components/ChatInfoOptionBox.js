import React from "react";
import { Image, View, Text } from "react-native";
import styles from "./utils/styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const ChatInfoOptionBox = ({
  navigation,
  route,
  name,
  icon,
  convID = "",
  type = "conv",
  modalFunction = null,
  isConv = true,
}) => {
  if (modalFunction != null) {
    return (
      <Pressable
        onPress={() => modalFunction(true)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#D9D9D9" : "#FFFFFF00",
          },
        ]}
      >
        <View style={styles.optionContainer}>
          <Image source={icon} style={styles.chatInfoOptionIcon} />
          <Text style={styles.optionText}>{name}</Text>
        </View>
      </Pressable>
    );
  } else {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate(route, {
            convID: convID,
            type: type,
            isConv: isConv,
          })
        }
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#D9D9D9" : "#FFFFFF00",
          },
        ]}
      >
        <View style={styles.optionContainer}>
          <Image source={icon} style={styles.chatInfoOptionIcon} />
          <Text style={styles.optionText}>{name}</Text>
        </View>
      </Pressable>
    );
  }
};

export default ChatInfoOptionBox;
