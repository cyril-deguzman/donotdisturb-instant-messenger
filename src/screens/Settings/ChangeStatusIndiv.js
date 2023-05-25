import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  collection,
  getDocs,
  getDoc,
  query,
  addDoc,
  doc,
  updateDoc,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { auth, database } from "../../../config/firebase";
import HeaderSave from "../../components/HeaderSave";
import useBackground from "../../hooks/useBackground";
import messagesStyles from "../Home/utils/messagesStyles";
import defaultStatusStyles from "../Home/utils/defaultStatusStyles";
import settingsStyles from "../Home/utils/settingsStyles";
import RadioButton from "../../components/RadioButton";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ChangeStatusGroupStyles from "../Home/utils/changeStatusGroupStyles";
import StatusBox from "../../components/StatusBox";
import {
  initDropdownItems,
  handleConfirm,
  radioData,
  styles,
} from "./utils/ChangeStatusUtils";
import useIndicator from "../../hooks/useIndicator";
const profileImg = require("../../assets/profile-picture.png");

const ChangeStatusIndiv = ({ route, navigation }) => {
  const { title, bubble, convID } = route.params.children;
  const [option, setOption] = useState(null);
  const [customMessageValue, onChangeText] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("Never");
  const [dropdownItems, setDropdownItems] = useState(initDropdownItems);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const indicatorID = bubble ? bubble.id : "none";

  const bgImg = useBackground("topBubbles");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const createPersonalBubble = async (convRef) => {
    let memberID;
    const userRef = doc(database, "users", auth.currentUser.uid);
    const dateNow = new Date();

    const q = query(
      collection(database, "user_conversations"),
      where("userID", "!=", userRef),
      where("conversationID", "==", convRef)
    );

    const conversationSnap = await getDocs(q);

    conversationSnap.forEach((convo) => {
      memberID = convo.data().userID;
    });

    const osi = await addDoc(collection(database, "online_statuses"), {
      expiry: null,
      message: customMessageValue,
      osi: option,
      toggleTime: false,
    });

    const bubble = await addDoc(collection(database, "bubbles"), {
      computerGenerated: true,
      creatorID: userRef,
      conversationID: convRef,
      lastChanged: dateNow,
      statusID: osi,
      title: title,
    });

    await addDoc(collection(database, "bubble_members"), {
      bubbleID: bubble,
      memberID: memberID,
    });
  };

  const updateBubble = async (bubbleSnap) => {
    let bubbleID;

    bubbleSnap.forEach((bubble) => {
      bubbleID = bubble.id;
    });

    const bubbleRef = doc(database, "bubbles", bubbleID);
    const bubbleDoc = await getDoc(bubbleRef);
    const osiRef = bubbleDoc.data().statusID;
    const dateNow = new Date();

    await updateDoc(osiRef, {
      osi: option,
      message: customMessageValue,
    });

    await updateDoc(bubbleRef, {
      lastChanged: dateNow,
    });
  };

  const handleSave = async () => {
    const convRef = doc(database, "conversations", convID);
    const q = query(
      collection(database, "bubbles"),
      where("conversationID", "==", convRef)
    );

    const bubbleSnap = await getDocs(q);

    if (bubbleSnap.empty) createPersonalBubble(convRef);
    else updateBubble(bubbleSnap);

    navigation.goBack();
  };

  useEffect(() => {
    const unsubscribeAll = [];

    const fetchIndicator = async () => {
      let indicatorRef;

      if (indicatorID == "none") {
        const userRef = doc(database, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        indicatorRef = userSnap.data().statusID;
      } else indicatorRef = doc(database, "online_statuses", indicatorID);

      const unsubscribe = onSnapshot(indicatorRef, (indicatorSnap) => {
        onChangeText(indicatorSnap.data().message);
        setOption(indicatorSnap.data().osi);
      });

      unsubscribeAll.push(unsubscribe);
    };

    fetchIndicator();
    return () => unsubscribeAll.forEach((unsubscribe) => unsubscribe());
  }, []);

  return (
    <SafeAreaView style={ChangeStatusGroupStyles.HomeDefaultStatusInvisible}>
      <Image source={bgImg} style={messagesStyles.bgImg} />

      <HeaderSave
        title={route.params.headerTitle}
        navigation={navigation}
        function={() => handleSave()}
      />

      <View style={styles.userInfoContainer}>
        <View style={styles.userProfileContainer}>
          <Image source={profileImg} style={styles.userImage} />
          <Image source={useIndicator("idle")} style={styles.userOSI} />
        </View>

        <View style={styles.chatInfoTextContainer}>
          <Text style={styles.userTextName}>{title}</Text>

          <StatusBox id={indicatorID} />
        </View>
      </View>

      <View style={ChangeStatusGroupStyles.BottomHalf}>
        <Text style={ChangeStatusGroupStyles.SetYourDefaultStatusText}>
          Change how they see you
        </Text>

        <View style={defaultStatusStyles.Osilist}>
          <RadioButton
            key={radioData.id}
            data={radioData}
            onSelect={(value) => setOption(value)}
            current={option}
          />
        </View>

        <View style={ChangeStatusGroupStyles.SetStatusMessageGroup}>
          <View style={ChangeStatusGroupStyles.SetStatusMessageGroupHeader}>
            <Text style={ChangeStatusGroupStyles.SetStatusMessageText}>
              Status message they see
            </Text>
            <Text style={ChangeStatusGroupStyles.OptionalText}>(optional)</Text>
          </View>
          <TextInput
            style={ChangeStatusGroupStyles.SetStatusMessageTextBox}
            editable
            multiline
            numberOfLines={1}
            maxLength={40}
            onChangeText={(text) => onChangeText(text)}
            value={customMessageValue}
          />

          <View style={ChangeStatusGroupStyles.ClearAfterHeader}>
            <Text style={ChangeStatusGroupStyles.SetStatusMessageText}>
              Clear after
            </Text>
            <Text style={ChangeStatusGroupStyles.ClearAfterDesc}>
              If a duration is set, your status for that audience will return to
              your default status after the set duration. Duration can be only
              set up to 24 hours.
            </Text>
          </View>
          <DropDownPicker
            open={openDropdown}
            value={dropdownValue}
            items={dropdownItems}
            setOpen={setOpenDropdown}
            setValue={setDropdownValue}
            setItems={setDropdownItems}
            dropDownDirection="TOP"
            selectedItemContainerStyle={{
              backgroundColor: "rgba(217, 217, 217, 0.5)",
            }}
            selectedItemLabelStyle={{
              fontWeight: "600",
            }}
            style={{ backgroundColor: "transparent", marginTop: 20 }}
            onChangeValue={() => {
              dropdownValue == "Custom" ? showDatePicker() : hideDatePicker;
            }}
          />

          {isDatePickerVisible ? (
            <View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={() =>
                  handleConfirm(
                    date,
                    setDropdownItems,
                    setDropdownValue,
                    hideDatePicker
                  )
                }
                onCancel={hideDatePicker}
                is24Hour={true}
              />
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangeStatusIndiv;
