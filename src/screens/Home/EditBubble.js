import React, {useState} from "react";
import { View, Text, Image, TouchableOpacity} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScrollView } from "react-native-gesture-handler";

import Header from "../../components/Header";

import useIndicator from "../../hooks/useIndicator";
import useBackground from "../../hooks/useBackground";
import useIcon from "../../hooks/useIcon";
import messagesStyles from "./utils/messagesStyles";
import statusForSpecificAudienceStyles from "./utils/statusForSpecificAudienceStyles"
import AudienceBox from "../../components/AudienceBox";
import OptionHeaderBox from "../../components/OptionHeaderBox";
import settingsStyles from "./utils/settingsStyles";
import ChatInfoOptionBox from "../../components/ChatInfoOptionBox";
import ChatInfoStatusBox from "../../components/ChatInfoStatusBox";

const EditBubble = ({navigation}) => {
  const bgImg = useBackground("topBubbles");
  const indicator = useIndicator("idle");

  const changeStatusIcon = useIcon("changeStatusIcon");
  const deleteIcon = useIcon("deleteIcon");
  const seeMembersIcon = useIcon("seeMembersIcon");
  const changeGroupNameIcon = useIcon("changeGroupNameIcon");
  const editMembersIcon = useIcon("editMembersIcon");

  return (
    <SafeAreaView style={statusForSpecificAudienceStyles.container}>
      <Image source={bgImg} style={messagesStyles.bgImg} />
      <Header title="Some Group Name" navigation={navigation}/>

 
        <View style={statusForSpecificAudienceStyles.bgContainer}>
          
          
            <View style={statusForSpecificAudienceStyles.descriptionContainer}>
              <View style={statusForSpecificAudienceStyles.descriptionTextContainer}>
                <Text style={statusForSpecificAudienceStyles.descriptionTextHeader}>Edit Members</Text>
                <Text style={statusForSpecificAudienceStyles.descriptionTextContent}>
                    You can edit in this section the name of your Bubble, edit the members within your Bubble and see the members within your Bubble. You are also able to edit how your Bubble sees you.</Text>
              </View>
            </View>
        
          
            <View style={settingsStyles.chatInfoGroupContainer}>
                <OptionHeaderBox header="Audience Info" />
                <ChatInfoOptionBox
                icon={changeGroupNameIcon}
                name="Change group name"
                navigation={navigation}
                routeName={"EditBubble"}
              />
              <ChatInfoOptionBox
                icon={editMembersIcon}
                name="Edit members"
                navigation={navigation}
                routeName={"EditMembers"}
              />
              <ChatInfoOptionBox
                icon={seeMembersIcon}
                name="See members"
                navigation={navigation}
                routeName={"SeeMembers"}
              />
              <Text>{'\n'}</Text>

              <OptionHeaderBox header="More Actions" />
              <ChatInfoStatusBox
                icon={changeStatusIcon}
                name="Change how they see you"
                navigation={navigation}
                routeName={"EditBubble"}
                userStatus={"idle"}
              />
              <ChatInfoOptionBox
                icon={deleteIcon}
                name="Delete audience"
                navigation={navigation}
                routeName={"EditBubble"}
              />
              
              

            </View>
        </View>
    
    </SafeAreaView>
  )
};

export default EditBubble;
