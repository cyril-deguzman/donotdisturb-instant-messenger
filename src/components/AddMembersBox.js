import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import normalize from "react-native-normalize";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import useIcon from "../hooks/useIcon";

import useIndicator from "../hooks/useIndicator";

const profileImg = require("../assets/profile-picture.png");

const AddMembersBox = ({
  navigation,
  routeName,
  conversationID,
  isConv = true,
}) => {
  const addMembersIcon = useIcon("addMembersIcon");

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(routeName, {
          convID: conversationID,
          isConv: isConv,
        })
      }
    >
      <View style={styles.rowSpace}>
        <View style={styles.together}>
          <Image
            source={addMembersIcon}
            style={{
              height: normalize(50),
              width: normalize(50),
              marginStart: normalize(5),
              marginEnd: normalize(30),
            }}
          />
          <Text style={styles.text}>Add member</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: normalize(20),
    height: normalize(20),
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  rowSpace: {
    flexDirection: "row",
    marginTop: normalize(20),
    marginRight: normalize(25),
    marginLeft: normalize(8),
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImg: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(50),
  },
  together: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: normalize(18),
    fontWeight: "800",
    color: "#4F457C",
  },
});

export default AddMembersBox;
