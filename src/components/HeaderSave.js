import React from "react";
import { Image, View, Text } from "react-native";
import styles from "./utils/styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import useIcon from "../hooks/useIcon";

const HeaderSave = (props) => {
  const backIcon = useIcon("backIcon");

  return (
    <View style={styles.headerContainer}>
      <Pressable
        onPress={() => props.navigation.goBack()}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#D9D9D9" : "#FFFFFF00",
            borderRadius: 50,
          },
        ]}
      >
        <Image source={backIcon} style={styles.headerBackButton} />
      </Pressable>

      <Text style={styles.headerSaveText}>{props.title}</Text>

      <Pressable
        onPress={
          () => props.function(props.navigation)
          //console.log(props.function)
        }
        // style={[styles.SaveButton]}
        style={({ pressed }) => [
          styles.SaveHeaderButtonBG,
          {
            backgroundColor: pressed
              ? "rgba(112,107,188,1)"
              : "rgba(122,107,188,1)",
            borderRadius: 50,
          },
        ]}
      >
        <Text style={styles.SaveText}>Save</Text>
      </Pressable>
    </View>
  );
};

export default HeaderSave;
