import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import normalize from "react-native-normalize";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import useIcon from "../hooks/useIcon";

import useIndicator from "../hooks/useIndicator";

import {
  collection,
  query,
  where,
  getDoc,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";

const profileImg = require("../assets/profile-picture.png");

const ProfileDeleteBox = ({
  userName,
  userStatus,
  navigation,
  routeName,
  userID,
  isConv = true,
  convID,
}) => {
  const redDeleteIcon = useIcon("redDeleteIcon");

  const [status, setStatus] = useState(null);

  const dictionary = {
    "Open to Chat": "openToChat",
    "Be Right Back": "idle",
    "Do Not Disturb": "doNotDisturb",
    Invisible: "invisible",
  };

  const deleteMemberFunction = async () => {
    const memberRef = doc(database, "users", userID);
    if (isConv) {
      const convRef = doc(database, "conversations", convID);
      const q = query(
        collection(database, "user_conversations"),
        where("conversationID", "==", convRef),
        where("userID", "==", memberRef)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc);
      });
    } else {
      const bubbleRef = doc(database, "bubbles", convID);
      const q = query(
        collection(database, "bubble_members"),
        where("bubbleID", "==", bubbleRef),
        where("memberID", "==", memberRef)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc);
      });
    }
  };

  useLayoutEffect(() => {
    const initialUpdate = async () => {
      const dataSnap = await getDoc(userStatus);

      console.log(dataSnap.data().osi);

      // const dataOSISnap = await getDoc(dataSnap.data().statusID);
      // console.log(dataOSISnap.data());
      setStatus(dataSnap.data().osi);
      // onChangeText(dataOSISnap.data().message);
    };

    initialUpdate();
  }, []);

  return (
    <TouchableOpacity onPress={() => deleteMemberFunction()}>
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
              fontSize: normalize(18),
              color: "#4F457C",
              paddingLeft: normalize(20),
            }}
          >
            {userName}
          </Text>
        </View>

        <Image
          source={redDeleteIcon}
          style={{ height: normalize(36), width: normalize(33) }}
        />
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

export default ProfileDeleteBox;
