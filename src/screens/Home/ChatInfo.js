import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

import ChatInfoOptionBox from "../../components/ChatInfoOptionBox";
import OptionHeaderBox from "../../components/OptionHeaderBox";
import Header from "../../components/Header";
import SwitchBox from "../../components/SwitchBox";
import StatusBox from "../../components/StatusBox";

import useIndicator from "../../hooks/useIndicator";
import useBackground from "../../hooks/useBackground";
import useIcon from "../../hooks/useIcon";

import messagesStyles from "./utils/messagesStyles";
import settingsStyles from "./utils/settingsStyles";

const profilePic = require("../../assets/profile-picture.png");

const ChatInfo = ({ route, navigation }) => {
  const { convID, title, bubble } = route.params;
  const bgImg = useBackground("topBubbles");
  const indicator = useIndicator("openToChat");
  const muteIcon = useIcon("muteIcon");
  const changeStatusIcon = useIcon("changeStatusIcon");
  const blockIcon = useIcon("blockIcon");
  const deleteIcon = useIcon("deleteIcon");
  const bubbleIndicator = bubble ? bubble.indicator : "none";
  const bubbleTime = bubble ? bubble.time : "changed";
  const indicatorID = bubble ? bubble.id : "none";

  return (
    <SafeAreaView style={settingsStyles.container}>
      <Image source={bgImg} style={messagesStyles.bgImg} />
      <Header title={title} navigation={navigation} />

      <ScrollView>
        <View style={settingsStyles.bgContainer}>
          <View style={settingsStyles.userInfoContainer}>
            <View style={settingsStyles.userProfileContainer}>
              <Image source={profilePic} style={settingsStyles.userImage} />
              <Image source={indicator} style={settingsStyles.userOSI} />
            </View>

            <View style={settingsStyles.chatInfoTextContainer}>
              <Text style={settingsStyles.userTextName}>{title}</Text>
              {/* <Text style={settingsStyles.userTextStatus}>
                Set Status Message
              </Text> */}

              <StatusBox
                userStatus={bubbleIndicator}
                time={bubbleTime}
                id={indicatorID}
              />
            </View>
          </View>

          <View style={settingsStyles.chatInfoContainer}>
            <>
              <OptionHeaderBox header="Actions" />
              <SwitchBox
                icon={muteIcon}
                name="Mute chat"
                navigation={navigation}
                route={"ChatInfo"}
              />
              <ChatInfoOptionBox
                icon={changeStatusIcon}
                name="Change how they see you"
                navigation={navigation}
                route={"ChangeStatusIndiv"}
                children={{
                  title: title,
                  bubble: bubble,
                  convID: convID,
                }}
              />
              <ChatInfoOptionBox
                icon={blockIcon}
                name="Block this contact"
                navigation={navigation}
                route={"ChatInfo"}
              />
              <ChatInfoOptionBox
                icon={deleteIcon}
                name="Delete this chat"
                navigation={navigation}
                route={"ChatInfo"}
              />
            </>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatInfo;
