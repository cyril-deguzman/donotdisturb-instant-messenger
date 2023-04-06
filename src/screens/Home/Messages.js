import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MessageBox from "../../components/MessageBox";
import SearchBox from "../../components/SearchBox";
import useIndicator from "../../hooks/useIndicator";
import useBackground from "../../hooks/useBackground";
import useIcon from "../../hooks/useIcon";
import messagesStyles from "./utils/messagesStyles";

const profileImg = require("../../assets/profile-picture.png");

const Messages = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const indicator = useIndicator("openToChat");
  const bgImg = useBackground("topBubbles");
  const pencilIcon = useIcon("messagePencilIcon");

  return (
    <View style={messagesStyles.container}>
      <Image source={bgImg} style={messagesStyles.bgImg} />
      <View style={messagesStyles.row}>
        <View style={messagesStyles.statusBar}>
          <View style={messagesStyles.leftStatusBar}>
            <Image source={profileImg} style={messagesStyles.profileImg} />
            <Image source={indicator} style={messagesStyles.indicator} />
          </View>
          <View style={messagesStyles.rightStatusBar}>
            <Text style={messagesStyles.name}>Leana Hyacinth Rebong</Text>
            <Text style={messagesStyles.customMessage}>Set Custom Message</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("NewMessage")}>
          <Image style={messagesStyles.pencilIcon} source={pencilIcon} />
        </TouchableOpacity>
      </View>
      <View style={messagesStyles.messageContainer}>
        <Text style={messagesStyles.tabLabel}>Messages</Text>
        <SearchBox setValue={setSearchQuery} value={searchQuery} />

        {/** TODO: convert to flatlist when working on backend */}
        <View style={{ marginTop: 15 }}>
          <MessageBox userStatus="idle" friendStatus="openToChat" navigation={navigation}/>
          <MessageBox userStatus="openToChat" friendStatus="doNotDisturb" navigation={navigation}/>
          <MessageBox userStatus="invisible" friendStatus="idle" navigation={navigation}/>
          <MessageBox userStatus="doNotDisturb" friendStatus="invisible" navigation={navigation}/>
        </View>
      </View>
    </View>
  );
};

export default Messages;
