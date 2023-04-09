import React from "react";
import { Image, View } from "react-native";
import { ListItem, Avatar } from "@rneui/base";

import styles from "./utils/styles";
import useIndicator from "../hooks/useIndicator";

const profileImg = require("../assets/profile-picture.png");

const MessageBox = ({ navigation, userStatus, friendStatus }) => {
  const userIndicator = useIndicator(userStatus);
  const friendIndicator = useIndicator(friendStatus);

  /** TODO: optimize by utilizing colors.js */
  const borderColors = {
    openToChat: "#1EE33E",
    idle: "#D49A00",
    doNotDisturb: "#F62447",
    invisible: "#818181",
  };

  return (
    <ListItem
      onPress={() => navigation.navigate("Chat")}
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
            Cyril de Guzman
          </ListItem.Title>
          <ListItem.Subtitle style={styles.time}>11:10 PM</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content>
          <ListItem.Subtitle style={styles.messagePreview} numberOfLines={1}>
            Them: trying his best
          </ListItem.Subtitle>

{/* THEY SEE YOU AS */}
          <ListItem.Subtitle
            style={{
              ...styles.statusIndicatorText,
              borderColor: borderColors[userStatus],
            }}
            numberOfLines={1}
          >
            They see you as{" "}
            <Image source={userIndicator} style={styles.smallIndicator} /> until
            tomorrow 8:30pm
          </ListItem.Subtitle>
          
        </ListItem.Content>
      </ListItem.Content>
    </ListItem>
  );
};

export default MessageBox;
