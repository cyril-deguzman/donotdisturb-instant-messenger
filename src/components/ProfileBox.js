import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { getDoc } from "firebase/firestore";
import normalize from "react-native-normalize";
import useIndicator from "../hooks/useIndicator";
import useFetchConvoByUser from "../hooks/useFetchConvoByUser";
const profileImg = require("../assets/profile-picture.png");

const ProfileBox = ({ navigation, dataSnap }) => {
  const { name, statusID, id } = dataSnap;
  const [status, setStatus] = useState(null);
  const [convID, setConvID] = useState(null);

  const dictionary = {
    "Open to Chat": "openToChat",
    "Be Right Back": "idle",
    "Do Not Disturb": "doNotDisturb",
    Invisible: "invisible",
  };

  useLayoutEffect(() => {
    const initialUpdate = async () => {
      const statusData = await getDoc(statusID);
      const conversationID = await useFetchConvoByUser(id);
      console.log("profileBoxConvoID", conversationID);
      setStatus(statusData.data().osi);
      setConvID(conversationID);
    };

    initialUpdate();
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        convID
          ? navigation.navigate("Chat", {
              convID: convID,
              title: name,
              type: "Direct",
            })
          : console.log("no convo")
      }
    >
      <View style={styles.rowSpace}>
        <View style={styles.together}>
          <View>
            <Image source={profileImg} style={styles.profileImg} />
            <Image
              source={useIndicator(dictionary[status])}
              style={styles.indicator}
            />
          </View>
          <Text style={styles.nameText}>{name}</Text>
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
  nameText: {
    fontFamily: "Inter",
    fontSize: normalize(16),
    fontWeight: "500",
    color: "#4F457C",
    paddingLeft: normalize(20),
  },
});

export default ProfileBox;
