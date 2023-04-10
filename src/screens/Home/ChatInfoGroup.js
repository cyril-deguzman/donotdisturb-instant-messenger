import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import settingsStyles from "./utils/settingsStyles";
import { ScrollView } from "react-native-gesture-handler";

import ChatInfoOptionBox from "../../components/ChatInfoOptionBox";
import OptionHeaderBox from "../../components/OptionHeaderBox";
import Header from "../../components/Header";

import useIndicator from "../../hooks/useIndicator";
import useBackground from "../../hooks/useBackground";
import useIcon from "../../hooks/useIcon";
import messagesStyles from "./utils/messagesStyles";

import SwitchBox from "../../components/SwitchBox";

const profilePic = require("../../assets/profile-picture.png");

const ChatInfoGroup = ({ navigation }) => {
  const bgImg = useBackground("topBubbles");
  const indicator = useIndicator("openToChat");

  const muteIcon = useIcon("muteIcon");
  const changeStatusIcon = useIcon("changeStatusIcon");
  const blockIcon = useIcon("blockIcon");
  const deleteIcon = useIcon("deleteIcon");
  const addMembersIcon = useIcon("addMembersIcon");
  const seeMembersIcon = useIcon("seeMembersIcon");

  return (
    <SafeAreaView style={settingsStyles.container}>
      <Image source={bgImg} style={messagesStyles.bgImg} />
      <Header title="" navigation={navigation} />

      <ScrollView>
        <View style={settingsStyles.bgContainer}>
          <View style={settingsStyles.groupInfoContainer}>
            <View style={settingsStyles.userProfileContainer}>
              <Image source={profilePic} style={settingsStyles.userImage} />
              <Image source={indicator} style={settingsStyles.userOSI} />
            </View>

            <View style={settingsStyles.chatInfoTextContainer}>
              <Text style={settingsStyles.userTextName}>Some Group Name</Text>
              <Text style={settingsStyles.userTextStatus}>
                Set Status Message
              </Text>

              {/* <StatusBox userStatus={"doNotDisturb"} /> */}
            </View>
          </View>

          <View style={settingsStyles.chatInfoGroupContainer}>
            <>
              <OptionHeaderBox header="Actions" />
              <ChatInfoOptionBox
                icon={addMembersIcon}
                name="Add members"
                navigation={navigation}
                routeName={"AddMembers"}
              />
              <ChatInfoOptionBox
                icon={seeMembersIcon}
                name="See members"
                navigation={navigation}
                routeName={"SeeMembers"}
              />
              <Text>{"\n"}</Text>

              <OptionHeaderBox header="More actions" />
              <SwitchBox
                icon={muteIcon}
                name="Mute chat"
                navigation={navigation}
                routeName={"ChatInfoGroup"}
              />
              <ChatInfoOptionBox
                icon={changeStatusIcon}
                name="Change how they see you"
                navigation={navigation}
                routeName={"ChatInfoGroup"}
              />
              <ChatInfoOptionBox
                icon={blockIcon}
                name="Block this contact"
                navigation={navigation}
                routeName={"ChatInfoGroup"}
              />
              <ChatInfoOptionBox
                icon={deleteIcon}
                name="Delete this chat"
                navigation={navigation}
                routeName={"ChatInfoGroup"}
              />
              <Text>{"\n"}</Text>
            </>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatInfoGroup;
