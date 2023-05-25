import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import useIcon from "../hooks/useIcon";
import normalize from "react-native-normalize";

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
            padding: normalize(10),
            marginLeft: normalize(10),
          },
        ]}
      >
        <Image source={backIcon} style={styles.headerBackButton} />
      </Pressable>

      <Text style={styles.headerSaveText}>{props.title}</Text>

      <Pressable
        onPress={() => props.function(props.navigation)}
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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: normalize(5),
    marginBottom: normalize(20),
    marginLeft: normalize(18),
    width: "100%",
  },
  headerBackButton: {
    width: normalize(20),
    height: normalize(20),
  },
  headerText: {
    fontSize: normalize(20),
    fontWeight: "700",
    marginLeft: normalize(10),
  },
  headerSaveText: {
    fontSize: normalize(18),
    fontWeight: "700",
    marginLeft: normalize(2),
    width: "60%",
  },
  SaveHeaderButtonBG: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 19,
    paddingRight: 19,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 30,
    marginLeft: normalize(10),
    boxSizing: "border-box",
    backgroundColor: "rgba(122,107,188,1)",
  },
  SaveText: {
    top: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default HeaderSave;
