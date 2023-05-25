import React, { useState, useLayoutEffect } from "react";
import {
  Image,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
  limit,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";
import useIcon from "../hooks/useIcon";
import { Overlay } from "react-native-elements";
import modalStyles from "./utils/modalStyles";
import GestureRecognizer from "react-native-swipe-gestures";
import OSIOptionBox from "./OSIOptionBox";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ModalDropdown from "react-native-modal-dropdown";
import useFetchBubbleMembers from "../hooks/useFetchBubbleMembers";
import defaultStatusStyles from "../screens/Home/utils/defaultStatusStyles";
import useIndicator from "../hooks/useIndicator";
import RadioButton from "../components/RadioButton";

const ChangeHowTheySeeYouModal = (props) => {
  const slideUpDownIcon = useIcon("slideUpDownIcon");
  const toggleOffIcon = useIcon("toggleOffIcon");
  const toggleOnIcon = useIcon("toggleOnIcon");

  const [isToggledOn, setToggledOn] = useState(false);
  const [bubble, setBubble] = useState(null);
  const [option, setOption] = useState(null);
  const [customMessageValue, onChangeText] = useState(null);
  const [members, setMembers] = useState([]);
  const toggleIcon = isToggledOn ? toggleOnIcon : toggleOffIcon;

  const isModalVisible = props.is2ndModalVisible;
  const setModalVisible = props.set2ndModalVisible;

  const radioData = [
    {
      id: "Open to Chat",
      value: "Open to Chat",
      indicator: useIndicator("openToChat"),
      useIndicator,
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

  const [openDropdown, setOpenDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("1 hour");
  const [dropdownItems, setDropdownItems] = useState([
    { label: "1 hour", value: "1 hour", labelStyle: { color: "#4F457C" } },
    {
      label: "30 minutes",
      value: "30 minutes",
      labelStyle: { color: "#4F457C" },
    },
    { label: "6 hours", value: "6 hours", labelStyle: { color: "#4F457C" } },
    { label: "12 hours", value: "12 hours", labelStyle: { color: "#4F457C" } },
    { label: "1 day", value: "1 day", labelStyle: { color: "#4F457C" } },
    { label: "Never", value: "Never", labelStyle: { color: "#4F457C" } },
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
    //console.warn("A date has been picked: ", date);
    //setDropdownValue("3hours");

    const customDuration =
      date.getHours().toString() +
      " hours and " +
      date.getMinutes().toString() +
      " minutes";

    //setDropdownValue(date);
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

  function updateUserStatusFunction() {
    const updateStatus = async () => {
      const userRef = doc(database, "users", auth.currentUser.uid);
      const dataDefaultSnap = await getDoc(userRef);
      const currentTime = serverTimestamp();
      var bubbleRef = bubble;

      //Bubble making if there is no bubble
      if (!bubble) {
        console.log("No bubble");
        bubbleRef = await addDoc(collection(database, "bubbles"), {
          computerGenerated: true,
          creatorID: userRef,
          lastChanged: currentTime,
          statusID: dataDefaultSnap.data().statusID,
          title: props.bubbleTitle,
          conversationID: doc(database, "conversations", props.convoID),
        });

        console.log("bubbleref", bubbleRef);
        members.map(async (member) => {
          var memberRef = doc(database, "users", member.id);
          await addDoc(collection(database, "bubble_members"), {
            bubbleID: bubbleRef,
            memberID: memberRef,
          });
        });

        console.log("Members added!");

        setBubble(bubbleRef);
      }

      const dataSnap = await getDoc(bubbleRef);

      if (
        JSON.stringify(dataDefaultSnap.data().statusID) ==
        JSON.stringify(dataSnap.data().statusID)
      ) {
        console.log("Equal");
        const dataOSISnap = await addDoc(
          collection(database, "online_statuses"),
          {
            expiry: null,
            message: customMessageValue,
            osi: option,
            toggleTime: false,
          }
        )
          .then(async (docRef) => {
            await updateDoc(bubbleRef, {
              lastChanged: currentTime,
              statusID: docRef,
            }).catch((error) => console.error(error));

            console.log("Added and updated");
          })
          .catch((error) => console.error(error));
      } else {
        const dataOSISnap = await updateDoc(dataSnap.data().statusID, {
          osi: option,
          message: customMessageValue,
        })
          .then(() => {
            console.log("Status updated!");
          })
          .catch((error) => console.error(error));
      }
    };

    updateStatus();
  }

  useLayoutEffect(() => {
    const initialUpdate = async () => {
      const userRef = doc(database, "users", auth.currentUser.uid);
      var bubbleRef;
      var q;

      //Look for bubble, either through bubbleID or through convoID
      console.log("There is no bubble: " + props.convoID);
      const conversationRef = doc(database, "conversations", props.convoID);

      q = query(
        collection(database, "bubbles"),
        where("creatorID", "==", userRef),
        where("conversationID", "==", conversationRef),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (convBubble) => {
        console.log("There is a convo bubble", convBubble.id);
        bubbleRef = doc(database, "bubbles", convBubble.id);

        setBubble(bubbleRef);
        const docSnap = await getDoc(bubbleRef);
        //Get members
        const bubbleMembers = await useFetchBubbleMembers(docSnap.id);
        setMembers(bubbleMembers);

        //Set default options
        const dataOSISnap = await getDoc(docSnap.data().statusID);
        setOption(dataOSISnap.data().osi);
        onChangeText(dataOSISnap.data().message);
      });

      //If there are no bubbles for the conversation
      if (querySnapshot.empty) {
        console.log("There is no bubble at all");
        const docSnap = await getDoc(userRef);

        //Get members
        const conversationMembers = await useFetchConversationUsers(
          props.convoID,
          false
        );
        setMembers(conversationMembers);

        //Set default options
        const dataOSISnap = await getDoc(docSnap.data().statusID);
        setOption(dataOSISnap.data().osi);
        onChangeText(dataOSISnap.data().message);
      }
    };

    initialUpdate();
  }, []);

  return (
    <View style={modalStyles.modalStatusContainer}>
      <GestureRecognizer onSwipeDown={() => props.set1stModalVisible(false)}>
        <Overlay
          isVisible={isModalVisible}
          onBackdropPress={() => {
            props.set1stModalVisible(false);
          }}
          children={Modal}
          overlayStyle={modalStyles.modalStatusContainer}
          animationType="slide"
          backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        >
          <TouchableWithoutFeedback
            onPress={() => props.set1stModalVisible(false)}
          >
            <View style={modalStyles.modalSlideUpDownContainer}>
              <Image
                source={slideUpDownIcon}
                style={modalStyles.modalSlideUpDownButton}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              setOpenDropdown(false);
            }}
            accessible={false}
          >
            <View>
              <Text style={modalStyles.modalHeaderText}>Your Status</Text>
              <Text style={modalStyles.modalHeaderSubtext}>
                for {props.title}
              </Text>

              <View style={modalStyles.optionOSIContainer}>
                <RadioButton
                  key={radioData}
                  data={radioData}
                  onSelect={(value) => setOption(value)}
                  current={option}
                />
              </View>
              {/* <OSIOptionBox
                value={item.value}
                indicator={item.indicator}
                name={item.name}
                selected={item.selected}
                key={item.id}
                onPress={() => onRadioBtnClick(item)}
              /> */}

              <View>
                <View style={modalStyles.modalSubheaderTextContainer}>
                  <Text style={modalStyles.modalSubheaderText}>
                    Set Custom Messsage
                  </Text>
                  <Text style={modalStyles.modalSubheaderNoteText}>
                    (optional)
                  </Text>
                </View>

                <View style={modalStyles.modalTextInputContainer}>
                  <TextInput
                    editable
                    multiline
                    numberOfLines={1}
                    maxLength={40}
                    onChangeText={(text) => onChangeText(text)}
                    value={customMessageValue}
                    style={{ padding: 8 }}
                  />
                </View>
              </View>

              <View style={modalStyles.modalSubheaderTextContainer}>
                <Text style={modalStyles.modalSubheaderText}>Clear After</Text>
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
                style={{ backgroundColor: "transparent" }}
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

              {/* TO DO display to others the clear time */}
              {/* <TouchableOpacity onPress={() => setToggledOn(!isToggledOn)}>
                <View style={modalStyles.modalSubheaderTextContainer}>
                  <Text style={modalStyles.modalSubheaderSubtext}>
                    Display duration of status to others?
                  </Text>
                  <Image
                    source={toggleIcon}
                    style={modalStyles.modalToggleIcon}
                  />
                </View>
              </TouchableOpacity> */}

              <TouchableOpacity
                onPress={() => {
                  updateUserStatusFunction();
                  props.set1stModalVisible(false);
                }}
                activeOpacity={0.5}
                style={modalStyles.modalSaveButtonContainer}
              >
                <Text style={modalStyles.modalSaveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Overlay>
      </GestureRecognizer>
    </View>
  );
};

export default ChangeHowTheySeeYouModal;
