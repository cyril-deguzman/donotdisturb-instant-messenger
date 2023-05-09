import React, { useState, useLayoutEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import settingsStyles from "./utils/settingsStyles";
import { ScrollView } from "react-native-gesture-handler";

import OptionBox from "../../components/OptionBox";
import OptionHeaderBox from "../../components/OptionHeaderBox";
import Header from "../../components/Header";

import useIndicator from "../../hooks/useIndicator";
import useBackground from "../../hooks/useBackground";
import useIcon from "../../hooks/useIcon";
import messagesStyles from "./utils/messagesStyles";

import {
  collection,
  query,
  where,
  getDoc,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

import { auth, database } from "../../../config/firebase";

const profileImg = require("../../assets/profile-picture.png");

const Settings = ({ navigation }) => {
  const bgImg = useBackground("topBubbles");

  const defaultStatusIcon = useIcon("defaultStatusIcon");
  const specificStatusIcon = useIcon("specificStatusIcon");
  const notificationSoundsIcon = useIcon("notificationSoundsIcon");
  const accessibilityIcon = useIcon("accessibilityIcon");
  const privacySafetyIcon = useIcon("privacySafetyIcon");
  const logoutIcon = useIcon("logoutIcon");

  const [option, setOption] = useState(null);
  const [customMessageValue, onChangeText] = useState(null);
  const [name, updateName] = useState("");

  const dictionary = {
    "Open to Chat": "openToChat",
    "Be Right Back": "idle",
    "Do Not Disturb": "doNotDisturb",
    Invisible: "invisible",
  };

  useLayoutEffect(() => {
    const initialUpdate = async () => {
      console.log(auth.currentUser.uid);
      const userRef = doc(database, "users", auth.currentUser.uid);
      const dataSnap = await getDoc(userRef);

      console.log(dataSnap.data());

      updateName(dataSnap.data().name);

      const dataOSISnap = await getDoc(dataSnap.data().statusID);
      console.log(dataOSISnap.data());
      setOption(dataOSISnap.data().osi);
      onChangeText(dataOSISnap.data().message);
    };

    initialUpdate();
  }, []);

  return (
    <SafeAreaView style={settingsStyles.container}>
      <Image source={bgImg} style={messagesStyles.bgImg} />
      <Header title="Settings" navigation={navigation} />

      <ScrollView>
        <View style={settingsStyles.bgContainer}>
          <View style={settingsStyles.userProfileContainer}>
            <Image source={profileImg} style={settingsStyles.userImage} />
            <Image
              source={useIndicator(dictionary[option])}
              style={settingsStyles.userOSI}
            />
          </View>

          <View style={settingsStyles.userTextContainerShadow}>
            <View style={settingsStyles.userTextContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("DefaultStatus")}
                style={settingsStyles.userTextContainerTouchable}
              >
                <Text style={settingsStyles.userTextName}>{name}</Text>

                <Text style={settingsStyles.userTextStatus}>
                  {customMessageValue}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={settingsStyles.settingsContainer}>
            <>
              <OptionHeaderBox header="Online Status" />
              <OptionBox
                icon={defaultStatusIcon}
                name="Default Status"
                navigation={navigation}
                routeName={"DefaultStatus"}
              />
              <OptionBox
                icon={specificStatusIcon}
                name="Status for Specific Audience"
                navigation={navigation}
                routeName={"StatusForSpecificAudience"}
              />
              <Text>{"\n"}</Text>

              <OptionHeaderBox header="Preferences" />
              <OptionBox
                icon={notificationSoundsIcon}
                name="Notifications & Sounds"
                navigation={navigation}
                routeName={"Settings"}
              />
              <OptionBox
                icon={accessibilityIcon}
                name="Accessibility"
                navigation={navigation}
                routeName={"Settings"}
              />
              <OptionBox
                icon={privacySafetyIcon}
                name="Privacy & Safety"
                navigation={navigation}
                routeName={"Settings"}
              />
              <Text>{"\n"}</Text>

              <OptionHeaderBox header="Account" />
              <OptionBox
                icon={logoutIcon}
                name="Log out"
                navigation={navigation}
                routeName={"Settings"}
              />
              <Text>{"\n"}</Text>
            </>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
