import React from "react";

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

import { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";

import useBackground from "../../hooks/useBackground";
import defaultStatusStyles from "./utils/defaultStatusStyles";
import HeaderSave from "../../components/HeaderSave";
import messagesStyles from "./utils/messagesStyles";

import RadioButton from "../../components/RadioButton";
import useIndicator from "../../hooks/useIndicator";

const profileImg = require("../../assets/profile-picture.png");

const DefaultStatus = ({ navigation }) => {
  const bgImg = useBackground("topBubbles");

  const [option, setOption] = useState(null);
  const [customMessageValue, onChangeText] = useState(null);
  const [name, updateName] = useState("");

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

  const radioData = [
    { value: "Open to Chat", indicator: useIndicator("openToChat") },
    { value: "Be Right Back", indicator: useIndicator("idle") },
    { value: "Do Not Disturb", indicator: useIndicator("doNotDisturb") },
    { value: "Invisible", indicator: useIndicator("invisible") },
  ];

  const dictionary = {
    "Open to Chat": "openToChat",
    "Be Right Back": "idle",
    "Do Not Disturb": "doNotDisturb",
    Invisible: "invisible",
  };

  function updateUserStatusFunction(navigation) {
    const updateStatus = async () => {
      console.log(auth.currentUser.uid);
      const userRef = doc(database, "users", auth.currentUser.uid);
      const dataSnap = await getDoc(userRef);

      console.log(dataSnap.data());

      const dataOSISnap = await updateDoc(dataSnap.data().statusID, {
        osi: option,
        message: customMessageValue,
      })
        .then(() => {
          console.log("Status updated!");
          navigation.goBack();
        })
        .catch((error) => console.error(error));
    };

    updateStatus();
  }

  return (
    <View style={defaultStatusStyles.HomeDefaultStatusInvisible}>
      <Image source={bgImg} style={messagesStyles.bgImg} />

      <HeaderSave
        title="Default Status"
        navigation={navigation}
        function={updateUserStatusFunction}
      />
      <View style={defaultStatusStyles.TopHalf}>
        <View style={defaultStatusStyles.CurrentStatus}>
          <Image
            style={defaultStatusStyles.HeaderBG}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/n74etfy6woq-1300%3A15161?alt=media&token=cd037038-523d-4f2c-9e9d-2dcd78c5b6cd",
            }}
          />

          <Image style={defaultStatusStyles.ProfilePic} source={profileImg} />

          {/* {renderElement()} */}
          <Image
            style={defaultStatusStyles.CurrentStatusOSI}
            source={useIndicator(dictionary[option])}
          />

          <Text style={defaultStatusStyles.UserName}>{name}</Text>
          <Text style={defaultStatusStyles.UserCustomMessage}>
            {customMessageValue}
          </Text>
        </View>
      </View>

      <View style={defaultStatusStyles.BottomHalf}>
        <Text style={defaultStatusStyles.SetYourDefaultStatusText}>
          Set Your Default Status
        </Text>
        <Text style={defaultStatusStyles.SetYourDefaultStatusDesc}>
          Lorem ipsum explanation, etc, etc. Lorem ipsum explanation, etc, etc.
          Lorem ipsum{" "}
        </Text>
        <Text style={defaultStatusStyles.DefaultStatusText}>
          Default Status
        </Text>

        {/* /RADIO  BUTTON*/}
        <View style={defaultStatusStyles.Osilist}>
          <RadioButton
            data={radioData}
            onSelect={(value) => setOption(value)}
            current={option}
          />
        </View>

        <View style={defaultStatusStyles.SetStatusMessageGroup}>
          <View style={defaultStatusStyles.SetStatusMessageGroupHeader}>
            <Text style={defaultStatusStyles.SetStatusMessageText}>
              Set Status Message
            </Text>
            <Text style={defaultStatusStyles.OptionalText}>(optional)</Text>
          </View>

          <TextInput
            style={defaultStatusStyles.SetStatusMessageTextBox}
            editable
            multiline
            numberOfLines={1}
            maxLength={40}
            onChangeText={(text) => onChangeText(text)}
            value={customMessageValue}
          />
        </View>
      </View>
    </View>
  );
};

export default DefaultStatus;
