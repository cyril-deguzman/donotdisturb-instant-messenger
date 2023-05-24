import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScrollView } from "react-native-gesture-handler";

import Header from "../../components/Header";

import useIndicator from "../../hooks/useIndicator";
import useBackground from "../../hooks/useBackground";
import useIcon from "../../hooks/useIcon";
import messagesStyles from "./utils/messagesStyles";
import statusForSpecificAudienceStyles from "./utils/statusForSpecificAudienceStyles";
import AudienceBox from "../../components/AudienceBox";
import OptionHeaderBox from "../../components/OptionHeaderBox";
import settingsStyles from "./utils/settingsStyles";
import ChatInfoOptionBox from "../../components/ChatInfoOptionBox";
import ChatInfoStatusBox from "../../components/ChatInfoStatusBox";
import DeleteAlertPopup from "../../components/DeleteAlertPopup";
import GroupNamePopup from "../../components/GroupNamePopup";

import {
  collection,
  query,
  where,
  getDoc,
  updateDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { auth, database } from "../../../config/firebase";

const EditBubble = ({ route, navigation }) => {
  const bgImg = useBackground("topBubbles");
  const indicator = useIndicator("idle");

  const changeStatusIcon = useIcon("changeStatusIcon");
  const deleteIcon = useIcon("deleteIcon");
  const seeMembersIcon = useIcon("seeMembersIcon");
  const changeGroupNameIcon = useIcon("changeGroupNameIcon");
  const editMembersIcon = useIcon("editMembersIcon");

  const [isGroupNameModalVisible, setGroupNameModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [bubbleName, updateBubbleName] = useState(route.params.bubbleTitle);

  const setNameFunction = async (newTitle) => {
    const bubbleRef = doc(database, "bubbles", route.params.bubbleID);

    const data = await updateDoc(bubbleRef, {
      title: newTitle,
    })
      .then(() => {
        updateBubbleName(newTitle);
        console.log("Bubble updated!");
      })
      .catch((error) => console.error(error));
  };

  const deleteBubbleFunction = async () => {
    const bubbleRef = doc(database, "bubbles", route.params.bubbleID);

    const data = await deleteDoc(bubbleRef)
      .then(() => {
        console.log("Bubble deleted!");
        navigation.goBack();
      })
      .catch((error) => console.error(error));
  };

  console.log(route.params.bubbleID);
  return (
    <>
      <GroupNamePopup
        isGroupNameModalVisible={isGroupNameModalVisible}
        setGroupNameModalVisible={setGroupNameModalVisible}
        GroupNameHeader={"Edit Bubble Name"}
        setNameFunction={setNameFunction}
      />
      <DeleteAlertPopup
        is2ndModalVisible={isDeleteModalVisible}
        set2ndModalVisible={setDeleteModalVisible}
        set1stModalVisible={setDeleteModalVisible}
        deleteWhatText={bubbleName + " bubble"}
        deleteFunction={deleteBubbleFunction}
      />

      <SafeAreaView style={statusForSpecificAudienceStyles.container}>
        <ScrollView>
          <Image source={bgImg} style={messagesStyles.bgImg} />
          <Header title={bubbleName} navigation={navigation} />

          <View style={statusForSpecificAudienceStyles.bgContainer}>
            <View style={statusForSpecificAudienceStyles.descriptionContainer}>
              <View
                style={statusForSpecificAudienceStyles.descriptionTextContainer}
              >
                <Text
                  style={statusForSpecificAudienceStyles.descriptionTextHeader}
                >
                  Edit Bubble
                </Text>
                <Text
                  style={statusForSpecificAudienceStyles.descriptionTextContent}
                >
                  You can edit in this section the name of your Bubble, edit the
                  members within your Bubble and see the members within your
                  Bubble. You are also able to edit how your Bubble sees you.
                </Text>
              </View>
            </View>

            <View style={settingsStyles.chatInfoGroupContainer}>
              <OptionHeaderBox header="Audience Info" />
              <ChatInfoOptionBox
                icon={changeGroupNameIcon}
                name="Change group name"
                convID={route.params.bubbleID}
                modalFunction={setGroupNameModalVisible}
              />
              <ChatInfoOptionBox
                icon={editMembersIcon}
                name="Edit members"
                navigation={navigation}
                route={"EditMembers"}
                convID={route.params.bubbleID}
                isConv={false}
              />
              <ChatInfoOptionBox
                icon={seeMembersIcon}
                name="See members"
                navigation={navigation}
                route={"SeeMembers"}
                convID={route.params.bubbleID}
                isConv={false}
              />
              <Text>{"\n"}</Text>

              <OptionHeaderBox header="More Actions" />
              <ChatInfoStatusBox
                icon={changeStatusIcon}
                name="Change how they see you"
                navigation={navigation}
                routeName={"ChangeStatusGroup"}
                userStatus={"idle"}
                bubbleID={route.params.bubbleID}
                headerTitle={"Change how they see you"}
                bubbleTitle={bubbleName}
              />
              <ChatInfoOptionBox
                icon={deleteIcon}
                name="Delete audience"
                modalFunction={setDeleteModalVisible}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default EditBubble;
