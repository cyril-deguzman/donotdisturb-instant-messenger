import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import normalize from "react-native-normalize";
import { onSnapshot, doc, getDoc } from "firebase/firestore";
import { auth, database } from "../../config/firebase";
import useIndicator from "../hooks/useIndicator";
import formatTime from "./utils/MessageBox/formatTime";

const StatusBox = ({ userStatus = "none", time = "changed", id = "none" }) => {
  const [expiry, setExpiry] = useState(time);
  const [indicator, setIndicator] = useState(userStatus);

  useEffect(() => {
    const unsubscribeAll = [];

    const fetchIndicator = async () => {
      let indicatorRef;

      if (id == "none") {
        const userRef = doc(database, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        indicatorRef = userSnap.data().statusID;
      } else indicatorRef = doc(database, "online_statuses", id);

      const unsubscribe = onSnapshot(indicatorRef, (indicatorSnap) => {
        const formatExpiry = indicatorSnap.data().expiry
          ? formatTime(indicatorSnap.data().expiry.toDate())
          : "changed";

        setExpiry(formatExpiry);
        setIndicator(dictionary[indicatorSnap.data().osi]);
      });

      unsubscribeAll.push(unsubscribe);
    };
    fetchIndicator();

    return () => unsubscribeAll.forEach((unsubscribe) => unsubscribe());
  }, []);

  return (
    <View style={{ ...styles.container, borderColor: borderColors[indicator] }}>
      <Text style={styles.text}>
        They see you as{" "}
        <Image source={useIndicator(indicator)} style={styles.image} /> until{" "}
        {expiry}
      </Text>
      {/* <Text style={styles.text}>"Only Acads 4ever"</Text> */}
    </View>
  );
};

const dictionary = {
  "Open to Chat": "openToChat",
  "Be Right Back": "idle",
  "Do Not Disturb": "doNotDisturb",
  Invisible: "invisible",
};

/** TODO: optimize by utilizing colors.js */
const borderColors = {
  openToChat: "#1EE33E",
  idle: "#D49A00",
  doNotDisturb: "#F62447",
  invisible: "#818181",
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 30,
  },
  text: {
    fontSize: normalize(14),
    color: "#818181",
    textAlign: "center",
  },
  image: { width: normalize(15), height: normalize(15) },
});

export default StatusBox;
