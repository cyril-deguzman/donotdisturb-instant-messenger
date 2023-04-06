import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import normalize from "react-native-normalize";
import { CheckBox } from "@rneui/themed";

import useIndicator from "../hooks/useIndicator";

const profileImg = require("../assets/profile-picture.png");

const ProfileCheckBox = ({
  userStatus = "",
  user,
  handleAdd,
  handleRemove,
}) => {
  const indicator = useIndicator(userStatus);
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    if (check) handleRemove(user.name);
    else handleAdd(user.name);

    setCheck(!check);
  };

  return (
    <View style={styles.rowSpace}>
      <View style={styles.together}>
        <View>
          <Image source={profileImg} style={styles.profileImg} />
          <Image source={indicator} style={styles.indicator} />
        </View>
        <Text style={styles.text}>{user.name}</Text>
      </View>
      <CheckBox
        checked={check}
        onPress={handleCheck}
        size={normalize(35)}
        iconType="material-community"
        checkedIcon="checkbox-marked"
        uncheckedIcon="checkbox-blank-outline"
        checkedColor="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: normalize(17),
    fontWeight: "500",
    color: "#7A6BBC",
    paddingLeft: normalize(20),
  },
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProfileCheckBox;
