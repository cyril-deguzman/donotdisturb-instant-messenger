import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import normalize from "react-native-normalize";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

import useIndicator from "../hooks/useIndicator";

const profileImg = require("../assets/profile-picture.png");

const ProfileBox = ({ navigation, dataSnap }) => {
  const indicator = useIndicator("openToChat");
  const { name } = dataSnap;

  return (
    <TouchableOpacity onPress={() => navigation.navigate("SeeMembers")}>
      <View style={styles.rowSpace}>
        <View style={styles.together}>
          <View>
            <Image source={profileImg} style={styles.profileImg} />
            <Image source={indicator} style={styles.indicator} />
          </View>
          <Text
            style={{
              fontFamily: "Inter",
              fontSize: normalize(16),
              fontWeight: "500",
              color: "#4F457C",
              paddingLeft: normalize(20),
            }}
          >
            {name}
          </Text>
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
});

export default ProfileBox;
