import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import useIcon from "../hooks/useIcon";
import bubbleStyles from "../screens/Home/utils/bubbleStyles";
import MessageBox from "./MessageBox";
import normalize from "react-native-normalize";
import MiniBubbleSeeAllModal from "./MiniBubbleSeeAllModal";

import {
  collection,
  query,
  where,
  getDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";

const MiniBubble = (props) => {
  const openIcon = useIcon("openIcon");
  const closeIcon = useIcon("closeIcon");
  const editIcon = useIcon("editIcon");

  const [openMiniBubble, setOpenMiniBubble] = useState(true);
  const openCloseIcon = openMiniBubble ? openIcon : closeIcon;

  const [isModalVisible, setModalVisible] = useState(false);

  const [bubbleMembers, setBubbleMembers] = useState([]);

  useEffect(() => {
    const bubbleRef = doc(database, "bubbles", props.bubbleID);
    const q = query(
      collection(database, "bubble_members"),
      where("bubbleID", "==", bubbleRef)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bubblesMembersArray = [];
      let counter = 0;
      if (querySnapshot.empty) return;

      querySnapshot.forEach(async (doc) => {
        counter++;

        bubblesMembersArray.push(doc.data().memberID);

        if (querySnapshot.size == counter)
          setBubbleMembers(bubblesMembersArray);
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={bubbleStyles.miniBubbleContainer}>
      <MiniBubbleSeeAllModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />

      <TouchableWithoutFeedback
        onPress={() => setOpenMiniBubble(!openMiniBubble)}
        style={{ borderRadius: normalize(50) }}
        underlayColor="rgba(217, 217, 217, 0.5)"
      >
        <View style={bubbleStyles.miniBubbleHeader}>
          <View style={bubbleStyles.miniBubbleOpenCloseButtonContainer}>
            <Image
              source={openCloseIcon}
              style={bubbleStyles.miniBubbleOpenCloseButton}
            />
          </View>

          <Text style={bubbleStyles.miniBubbleHeaderText}>
            {props.bubbleName}
          </Text>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("EditBubble", {
                bubbleID: props.bubbleID,
                bubbleTitle: props.bubbleName,
              })
            }
          >
            <View style={bubbleStyles.miniBubbleEditButtonContainer}>
              <Image
                source={editIcon}
                style={bubbleStyles.miniBubbleEditButton}
              />

              <Text style={bubbleStyles.miniBubbleEditButtonText}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      {openMiniBubble ? (
        <View style={bubbleStyles.bubblePeopleContainer}>
          <MessageBox userStatus="idle" friendStatus="openToChat" />
          <MessageBox userStatus="openToChat" friendStatus="doNotDisturb" />
          <MessageBox userStatus="invisible" friendStatus="idle" />

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            activeOpacity={0.5}
          >
            <View style={bubbleStyles.seeAllButtonContainer}>
              <Text style={bubbleStyles.seeAllButtonText}>See all</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default MiniBubble;
