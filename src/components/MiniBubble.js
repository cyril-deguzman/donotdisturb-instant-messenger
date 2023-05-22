import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
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
import useFetchMiniBubbleMembers from "../hooks/useFetchMiniBubbleMembers";

const MiniBubble = ({ bubbleName, bubbleID, navigation }) => {
  const openIcon = useIcon("openIcon");
  const closeIcon = useIcon("closeIcon");
  const editIcon = useIcon("editIcon");

  const [openMiniBubble, setOpenMiniBubble] = useState(true);
  const [isPrevModalVisible, setPrevModalVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [bubbleMembers, setBubbleMembers] = useState([]);
  const openCloseIcon = openMiniBubble ? openIcon : closeIcon;

  useEffect(() => {
    const unsubscribeAll = [];
    useFetchMiniBubbleMembers(bubbleID, setBubbleMembers, unsubscribeAll);

    return () => {
      unsubscribeAll.forEach((unsubscribe) => {
        unsubscribe();
      });
    };
  }, []);

  return (
    <View style={bubbleStyles.miniBubbleContainer}>
      <MiniBubbleSeeAllModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        isPrevModalVisible={isPrevModalVisible}
        setPrevModalVisible={setPrevModalVisible}
        bubbleMembers={bubbleMembers}
        navigation={navigation}
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

          <Text style={bubbleStyles.miniBubbleHeaderText}>{bubbleName}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("EditBubble", {
                bubbleID: bubbleID,
                bubbleTitle: bubbleName,
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
          {bubbleMembers.slice(0, 3).map((member) => {
            return (
              <MessageBox
                key={member.id}
                navigation={navigation}
                dataSnap={{ ...member }}
                isPrevModalVisible={isPrevModalVisible}
                setPrevModalVisible={setPrevModalVisible}
              />
            );
          })}

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
