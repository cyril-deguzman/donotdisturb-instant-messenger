import React, { useLayoutEffect, useState } from "react";
import { Image, View, TouchableHighlight } from "react-native";
import { ListItem, Avatar } from "@rneui/base";
import { auth } from "../../config/firebase";
import QuickAccessViewModal from "./QuickAccessViewModal";
import useIndicator from "../hooks/useIndicator";
import styles from "./utils/styles";
import getFirstMessage from "./utils/MessageBox/getFirstMessage";
import getBubble from "./utils/MessageBox/getBubble";
import getFriendIndicator from "./utils/MessageBox/getFriendIndicator";
const profileImg = require("../assets/profile-picture.png");

const MessageBox = ({
  navigation,
  userStatus = "none",
  dataSnap,
  isPrevModalVisible,
  setPrevModalVisible,
}) => {
  const [msgPreview, setMsgPreview] = useState("Say Hi!");
  const [msgTime, setMsgTime] = useState("");
  const [bubbleIndicator, setBubbleIndicator] = useState(userStatus);
  const [bubbleTime, setBubbleTime] = useState("tomorrow");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isIndividialModal, setIndividualModal] = useState(true);
  const [friendIndicator, setFriendIndicator] = useState(useIndicator(null));
  const [indicatorRef, setIndicatorRef] = useState();
  const title =
    dataSnap?.title == auth.currentUser.displayName
      ? dataSnap?.altTitle
      : dataSnap?.title;
  const type = dataSnap?.type;

  /** TODO: optimize by utilizing colors.js */
  const borderColors = {
    openToChat: "#1EE33E",
    idle: "#D49A00",
    doNotDisturb: "#F62447",
    invisible: "#818181",
    none: "#ffffff00",
  };

  useLayoutEffect(() => {
    const unsubscribeAll = [];

    try {
      getFirstMessage(dataSnap, setMsgTime, setMsgPreview, unsubscribeAll);
      getBubble(
        title,
        type,
        setBubbleIndicator,
        setBubbleTime,
        setIndicatorRef,
        unsubscribeAll
      );
      getFriendIndicator(
        dataSnap.convRef,
        type,
        setFriendIndicator,
        unsubscribeAll
      );
    } catch (error) {}

    return () => {
      unsubscribeAll.forEach((unsubscribe) => {
        unsubscribe();
      });
    };
  }, []);

  return (
    <TouchableHighlight
      onLongPress={() => setModalVisible(!isModalVisible)}
      onPress={() => {
        navigation.navigate("Chat", {
          convID: dataSnap?.convRef.id,
          title: title,
          type: dataSnap?.type,
          bubble: {
            id: indicatorRef ? indicatorRef.id : "none",
            indicator: bubbleIndicator,
            time: bubbleTime,
          },
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
          convoID={dataSnap?.convRef.id}
          title={title}
        />

        <ListItem containerStyle={styles.listContainer}>
          {/** TODO: optimize by converting into a component with small, medium, and large options */}
          <View>
            <Avatar size={61} rounded source={profileImg} />
            <Image source={friendIndicator} style={styles.indicator} />
          </View>
          {/** END OF TODO */}
          <ListItem.Content style={styles.wholePreview}>
            <ListItem.Content style={styles.row}>
              <ListItem.Title numberOfLines={1} style={styles.name}>
                {title ? title : "Bubble User"}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.time}>
                {msgTime}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content>
              <ListItem.Subtitle
                style={styles.messagePreview}
                numberOfLines={1}
              >
                {msgPreview}
              </ListItem.Subtitle>
              {bubbleIndicator == "none" ? (
                <ListItem.Subtitle
                  style={{
                    ...styles.statusIndicatorText,
                    borderColor: borderColors[bubbleIndicator],
                    color: "#ffffff00",
                  }}
                  numberOfLines={1}
                >
                  {"They see you as "}
                  <Image
                    source={useIndicator(bubbleIndicator)}
                    style={{ ...styles.smallIndicator, width: 0, height: 0 }}
                  />
                  {" until "}
                  {bubbleTime}
                </ListItem.Subtitle>
              ) : (
                <ListItem.Subtitle
                  style={{
                    ...styles.statusIndicatorText,
                    borderColor: borderColors[bubbleIndicator],
                  }}
                  numberOfLines={1}
                >
                  {"They see you as "}
                  <Image
                    source={useIndicator(bubbleIndicator)}
                    style={styles.smallIndicator}
                  />
                  {" until "}
                  {bubbleTime}
                </ListItem.Subtitle>
              )}
            </ListItem.Content>
          </ListItem.Content>
        </ListItem>
      </View>
    </TouchableHighlight>
  );
};

export default MessageBox;
