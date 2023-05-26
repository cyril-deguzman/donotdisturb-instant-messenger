import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import normalize from "react-native-normalize";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

import useIndicator from "../hooks/useIndicator";

const profileImg = require("../assets/profile-picture.png");

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";

const ProfileBox = ({ navigation, dataSnap }) => {
  const indicator = useIndicator("openToChat");
  const { name } = dataSnap;
  const { statusID } = dataSnap;

  console.log("Name for profileox: " + name);

  const [status, setStatus] = useState(null);

  const dictionary = {
    "Open to Chat": "openToChat",
    "Be Right Back": "idle",
    "Do Not Disturb": "doNotDisturb",
    Invisible: "invisible",
  };

  useLayoutEffect(() => {
    const initialUpdate = async () => {
      console.log("statusData  " + statusID);
      const statusData = await getDoc(statusID);

      console.log(statusData.data().osi);

      setStatus(statusData.data().osi);
    };

    initialUpdate();
  }, []);

  return (
    <TouchableOpacity onPress={() => navigation.navigate("SeeMembers")}>
      <View style={styles.rowSpace}>
        <View style={styles.together}>
          <View>
            <Image source={profileImg} style={styles.profileImg} />
            <Image
              source={useIndicator(dictionary[status])}
              style={styles.indicator}
            />
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
