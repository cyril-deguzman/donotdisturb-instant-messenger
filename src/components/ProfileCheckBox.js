import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import useIndicator from "../hooks/useIndicator";

const profileImg = require("../assets/profile-picture.png");
const checkboxIcon = require("../assets/icons/checkbox-icon.png");

const ProfileCheckBox = ({ userStatus }) => {
    const indicator = useIndicator(userStatus);

  return (

    <View style={styles.rowSpace}>
        <View style={styles.together}>
            <View>
                <Image source={profileImg} style={styles.profileImg} />
                <Image source={indicator} style={styles.indicator} />
            </View>
            <Text style={{ fontSize: 18, color: "#4F457C", paddingLeft: 20 }} >Leana Hyacinth Rebong</Text>
        </View>
        <Image source={checkboxIcon} style={{width: 30, height: 30}} />
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: 20,
    height: 20,
    position: "absolute",
    bottom: -5,
    right: -5
  },
  rowSpace: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent:"space-between"
  },
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  together: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default ProfileCheckBox;