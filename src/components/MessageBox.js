import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { ListItem, Avatar } from "@rneui/base";
import {
  collection,
  query,
  where,
  onSnapshot,
  limit,
  orderBy,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";

import styles from "./utils/styles";
import useIndicator from "../hooks/useIndicator";
import QuickAccessViewModal from "./QuickAccessViewModal";
import { Pressable, TouchableHighlight, TouchableOpacity } from "react-native";

const profileImg = require("../assets/profile-picture.png");

const MessageBox = ({
  navigation,
  userStatus,
  friendStatus,
  dataSnap,
  isPrevModalVisible,
  setPrevModalVisible,
}) => {
  const [msgPreview, setMsgPreview] = useState("Say Hi!");
  const userIndicator = useIndicator(userStatus);
  const friendIndicator = useIndicator(friendStatus);

  /** TODO: optimize by utilizing colors.js */
  const borderColors = {
    openToChat: "#1EE33E",
    idle: "#D49A00",
    doNotDisturb: "#F62447",
    invisible: "#818181",
  };

  useEffect(() => {
    try {
      const q = query(
        collection(database, "messages"),
        where("conversationID", "==", dataSnap?.convRef),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) return;

        querySnapshot.forEach((doc) => {
          setMsgPreview(doc.data().text);
        });
      });

      return () => unsubscribe();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isIndividialModal, setIndividualModal] = useState(true);

  return (
    <TouchableHighlight
      onLongPress={() => setModalVisible(!isModalVisible)}
      onPress={() => {
        navigation.navigate("Chat", {
          convID: dataSnap?.convRef.id,
          title: dataSnap?.title,
        });
        setPrevModalVisible(false);
      }}
      delayLongPress={100}
      underlayColor={"rgba(217, 217, 217, 0.5)"}
    >
      <View>
        <QuickAccessViewModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          isIndividualModal={isIndividialModal}
          setIndividualModal={setIndividualModal}
        />

        <ListItem
          //onPress={() => navigation.navigate("Chat")}
          containerStyle={styles.listContainer}
        >
          {/** TODO: optimize by converting into a component with small, medium, and large options */}
          <View>
            <Avatar size={61} rounded source={profileImg} />
            <Image source={friendIndicator} style={styles.indicator} />
          </View>
          {/** END OF TODO */}
          <ListItem.Content style={styles.wholePreview}>
            <ListItem.Content style={styles.row}>
              <ListItem.Title numberOfLines={1} style={styles.name}>
                {dataSnap?.title}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.time}>
                11:10 PM
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content>
              <ListItem.Subtitle
                style={styles.messagePreview}
                numberOfLines={1}
              >
                {msgPreview}
              </ListItem.Subtitle>
              <ListItem.Subtitle
                style={{
                  ...styles.statusIndicatorText,
                  borderColor: borderColors[userStatus],
                }}
                numberOfLines={1}
              >
                They see you as{" "}
                <Image source={userIndicator} style={styles.smallIndicator} />{" "}
                until tomorrow 8:30pm
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem.Content>
        </ListItem>
      </View>
    </TouchableHighlight>
  );
};

export default MessageBox;
