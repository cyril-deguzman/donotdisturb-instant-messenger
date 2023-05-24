import React, { useState, useLayoutEffect } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";

import {
  collection,
  query,
  where,
  getDoc,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, database } from "../../../config/firebase";

import HeaderSave from "../../components/HeaderSave";
import useBackground from "../../hooks/useBackground";
import messagesStyles from "./utils/messagesStyles";
import defaultStatusStyles from "./utils/defaultStatusStyles";
import RadioButton from "../../components/RadioButton";
import useIndicator from "../../hooks/useIndicator";

import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useIcon from "../../hooks/useIcon";
import ChangeStatusGroupStyles from "./utils/changeStatusGroupStyles";
import useFetchBubbleMembers from "../../hooks/useFetchBubbleMembers";

const Item = ({ title, image }) => (
  <TouchableOpacity style={ChangeStatusGroupStyles.OneGroup}>
    <Image
      style={ChangeStatusGroupStyles.Portrait}
      height={55}
      width={55}
      source={image}
    ></Image>
    <Text numberOfLines={1} style={ChangeStatusGroupStyles.Member}>
      {title}
    </Text>
  </TouchableOpacity>
);

const ChangeStatusGroup = ({ route, navigation }) => {
  const bgImg = useBackground("topBubbles");
  const profileImg = require("../../assets/profile-picture.png");

  const [option, setOption] = useState(null);
  const [customMessageValue, onChangeText] = useState(null);
  const [members, setMembers] = useState(false);

  const slideUpDownIcon = useIcon("slideUpDownIcon");
  const toggleOffIcon = useIcon("toggleOffIcon");
  const toggleOnIcon = useIcon("toggleOnIcon");

  const [isToggledOn, setToggledOn] = useState(false);
  const toggleIcon = isToggledOn ? toggleOnIcon : toggleOffIcon;

  const [openDropdown, setOpenDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("Never");
  const [dropdownItems, setDropdownItems] = useState([
    { label: "Never", value: "Never", labelStyle: { color: "#4F457C" } },
    {
      label: "30 minutes",
      value: "30 minutes",
      labelStyle: { color: "#4F457C" },
    },
    { label: "1 hour", value: "1 hour", labelStyle: { color: "#4F457C" } },

    { label: "6 hours", value: "6 hours", labelStyle: { color: "#4F457C" } },
    { label: "12 hours", value: "12 hours", labelStyle: { color: "#4F457C" } },
    { label: "1 day", value: "1 day", labelStyle: { color: "#4F457C" } },

    { label: "Custom", value: "Custom", labelStyle: { color: "#4F457C" } },
  ]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const customDuration =
      date.getHours().toString() +
      " hours and " +
      date.getMinutes().toString() +
      " minutes";

    setDropdownItems([
      {
        label: customDuration,
        value: customDuration,
        labelStyle: { color: "#4F457C" },
      },
      { label: "1 hour", value: "1 hour", labelStyle: { color: "#4F457C" } },
      {
        label: "30 minutes",
        value: "30 minutes",
        labelStyle: { color: "#4F457C" },
      },
      { label: "6 hours", value: "6 hours", labelStyle: { color: "#4F457C" } },
      {
        label: "12 hours",
        value: "12 hours",
        labelStyle: { color: "#4F457C" },
      },
      { label: "1 day", value: "1 day", labelStyle: { color: "#4F457C" } },
      { label: "Never", value: "Never", labelStyle: { color: "#4F457C" } },
      { label: "Custom", value: "Custom", labelStyle: { color: "#4F457C" } },
    ]);

    setDropdownValue(customDuration);

    hideDatePicker();
  };

  const timeOptions = [
    "30 minutes",
    "1 hour",
    "3 hours",
    "8 hours",
    "24 hours",
    "Custom",
  ];

  const radioData = [
    {
      id: "Open to Chat",
      value: "Open to Chat",
      indicator: useIndicator("openToChat"),
    },
    {
      id: "Be Right Back",
      value: "Be Right Back",
      indicator: useIndicator("idle"),
    },
    {
      id: "Do Not Disturb",
      value: "Do Not Disturb",
      indicator: useIndicator("doNotDisturb"),
    },
    {
      id: "Invisible",
      value: "Invisible",
      indicator: useIndicator("invisible"),
    },
  ];

  const dictionary = {
    "Open to Chat": "openToChat",
    "Be Right Back": "idle",
    "Do Not Disturb": "doNotDisturb",
    Invisible: "invisible",
  };

  function updateUserStatusFunction(navigation) {
    const updateStatus = async () => {
      const bubbleRef = doc(database, "bubbles", route.params.bubbleID);
      const bubbleSnap = await getDoc(bubbleRef);

      const userRef = doc(database, "users", auth.currentUser.uid);
      const dataDefaultSnap = await getDoc(userRef);
      const currentTime = serverTimestamp();

      if (
        JSON.stringify(dataDefaultSnap.data().statusID) ==
        JSON.stringify(bubbleSnap.data().statusID)
      ) {
        const osiRef = await addDoc(collection(database, "online_statuses"), {
          expiry: null,
          message: customMessageValue,
          osi: option,
          toggleTime: false,
        });

        await updateDoc(bubbleRef, {
          lastChanged: currentTime,
          statusID: osiRef,
        });
      } else {
        await updateDoc(bubbleRef, {
          lastChanged: currentTime,
        });

        await updateDoc(bubbleSnap.data().statusID, {
          osi: option,
          message: customMessageValue,
        });
      }

      navigation.navigate("Bubble");
    };

    updateStatus();
  }

  useLayoutEffect(() => {
    const initialUpdate = async () => {
      console.log("Inside layout effect: " + route.params.bubbleID);
      const bubbleRef = doc(database, "bubbles", route.params.bubbleID);

      const dataBubbleSnap = await getDoc(bubbleRef);

      console.log(dataBubbleSnap.data());

      const dataOSISnap = await getDoc(dataBubbleSnap.data().statusID);
      console.log(dataOSISnap.data());
      setOption(dataOSISnap.data().osi);
      onChangeText(dataOSISnap.data().message);
    };

    initialUpdate();
  }, []);

  useLayoutEffect(() => {
    const bubbleRef = doc(database, "bubbles", route.params.bubbleID);

    const q = query(
      collection(database, "bubble_members"),
      where("bubbleID", "==", bubbleRef)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const membersArray = [];
      let counter = 0;
      if (querySnapshot.empty) return;

      querySnapshot.forEach(async (doc) => {
        console.log("Insideddddd layout effect");
        const memberDoc = await getDoc(doc.data().memberID);
        counter++;

        membersArray.push({
          id: memberDoc.data().userID,
          name: memberDoc.data().name,
          image: profileImg,
        });

        if (querySnapshot.size == counter) setMembers(membersArray);
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={ChangeStatusGroupStyles.HomeDefaultStatusInvisible}>
      <Image source={bgImg} style={messagesStyles.bgImg} />

      <HeaderSave
        title={route.params.headerTitle}
        navigation={navigation}
        function={updateUserStatusFunction}
      />

      <View style={ChangeStatusGroupStyles.GroupListContainer}>
        <Image
          style={ChangeStatusGroupStyles.GroupListContainerBG}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/7i80d29n6ig-1486%3A22237?alt=media&token=e9fc4c14-4ad8-4994-83dd-e4fc08d66c67",
          }}
        />
        <View style={ChangeStatusGroupStyles.GroupListContainerHeader}>
          <Text style={ChangeStatusGroupStyles.GroupNameText}>
            {route.params.bubbleTitle}
          </Text>

          <TouchableOpacity
            style={ChangeStatusGroupStyles.ExcludeMembersContainer}
          >
            <Image
              style={ChangeStatusGroupStyles.MaterialSymbolsPersonRemoveRounded}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/sab4jk06yhs-1486%3A22257?alt=media&token=17e3bd3e-70f5-40f0-a8fc-33dda2758948",
              }}
            />
            <Text style={ChangeStatusGroupStyles.ExcludeMembers}>
              Exclude Members
            </Text>
          </TouchableOpacity>
        </View>

        <SafeAreaView style={ChangeStatusGroupStyles.GroupList}>
          {
            <FlatList
              data={members}
              renderItem={({ item }) => (
                <Item title={item.name} image={item.image} />
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
          }
        </SafeAreaView>
      </View>

      <View style={ChangeStatusGroupStyles.BottomHalf}>
        <Text style={ChangeStatusGroupStyles.SetYourDefaultStatusText}>
          Your Status for {route.params.bubbleTitle}
        </Text>
        {/* <Text style={styles.SetYourDefaultStatusDesc}>
          Lorem ipsum explanation, etc, etc. Lorem ipsum explanation, etc, etc.
          Lorem ipsum{" "}
        </Text> */}

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
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                is24Hour={true}
              />
            </View>
          ) : null}

          {/* <TouchableOpacity onPress={() => setToggledOn(!isToggledOn)}>
            <View style={modalStyles.modalSubheaderTextContainer}>
              <Text style={modalStyles.modalSubheaderSubtext}>
                Display duration of status to others?
              </Text>
              <Image source={toggleIcon} style={modalStyles.modalToggleIcon} />
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default ChangeStatusGroup;
