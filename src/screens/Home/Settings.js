import React, {useState} from "react";
import { View, Text, Image} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import settingsStyles from "./utils/settingsStyles";
import { ScrollView } from "react-native-gesture-handler";

import OptionBox from "../../components/OptionBox";
import OptionHeaderBox from "../../components/OptionHeaderBox";
import Header from "../../components/Header";

import useIndicator from "../../hooks/useIndicator";
import useBackground from "../../hooks/useBackground";
import useIcon from "../../hooks/useIcon";
import messagesStyles from "./utils/messagesStyles";


const profileImg = require("../../assets/profile-picture.png");

const Settings = ({navigation}) => {
  const bgImg = useBackground("topBubbles");
  const indicator = useIndicator("openToChat");

  const defaultStatusIcon = useIcon("defaultStatusIcon");
  const specificStatusIcon = useIcon("specificStatusIcon");
  const notificationSoundsIcon = useIcon("notificationSoundsIcon");
  const accessibilityIcon = useIcon("accessibilityIcon");
  const privacySafetyIcon = useIcon("privacySafetyIcon");
  const logoutIcon = useIcon("logoutIcon");


  return (
    <SafeAreaView style={settingsStyles.container}>
      <Image source={bgImg} style={messagesStyles.bgImg} />
      <Header title="Settings" navigation={navigation}/>

      <ScrollView>
        <View style={settingsStyles.bgContainer}>
          
          
          <View style={settingsStyles.userProfileContainer}>
            <Image
              source={profileImg}
              style={settingsStyles.userImage}
            />
            <Image
              source={indicator}
              style={settingsStyles.userOSI}
            />
          </View>
          
          <View style={settingsStyles.userTextContainerShadow}>
            <View style={settingsStyles.userTextContainer}>
              <Text style={settingsStyles.userTextName}>Person LastName</Text>
              <Text style={settingsStyles.userTextStatus}>Set Status Message</Text>
            </View>
          
          </View>
          
          <View style={settingsStyles.settingsContainer}>
              <>
                <OptionHeaderBox header="Online Status"/>
                <OptionBox icon={defaultStatusIcon} name="Default Status" navigation={navigation} routeName={"DefaultStatus"}/>
                <OptionBox icon={specificStatusIcon} name="Status for Specific Audience" navigation={navigation} routeName={"StatusForSpecificAudience"}/>
                <Text>{'\n'}</Text>

                <OptionHeaderBox header="Preferences"/>
                <OptionBox icon={notificationSoundsIcon} name="Notifications & Sounds" navigation={navigation} routeName={"Settings"}/>
                <OptionBox icon={accessibilityIcon} name="Accessibility" navigation={navigation} routeName={"Settings"}/>
                <OptionBox icon={privacySafetyIcon} name="Privacy & Safety" navigation={navigation} routeName={"Settings"}/>
                <Text>{'\n'}</Text>

                <OptionHeaderBox header="Account"/>
                <OptionBox icon={logoutIcon} name="Log out" navigation={navigation} routeName={"Settings"}/>
                <Text>{'\n'}</Text>
              </>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export default Settings;
