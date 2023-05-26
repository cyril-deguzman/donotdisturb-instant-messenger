import React, { useState, useLayoutEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../../../config/firebase";

import {
  collection,
  query,
  where,
  getDoc,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, database } from "../../../config/firebase";

import Header from "../../components/Header";

import useBackground from "../../hooks/useBackground";
import useIcon from "../../hooks/useIcon";
import messagesStyles from "./utils/messagesStyles";
import statusForSpecificAudienceStyles from "./utils/statusForSpecificAudienceStyles";
import AudienceBox from "../../components/AudienceBox";
import ResetPopup from "../../components/ResetPopup";
import useFetchBubbleMembers from "../../hooks/useFetchBubbleMembers";

const StatusForSpecificAudience = ({ navigation }) => {
  const bgImg = useBackground("topBubbles");

  const [bubbles, setBubbles] = useState([]);
  const [selectedBubble, setSelectedBubble] = useState(null);
  const [selectedBubbleTitle, setSelectedBubbleTitle] = useState("");

  const [defaultStatus, setDefaultStatus] = useState(null);

  const [isResetModalVisible, setResetModalVisible] = useState(false);

  const resetStatusFunction = async () => {
    console.log("----------Reset Start-----");
    const bubbleRef = doc(database, "bubbles", selectedBubble);
    console.log("Bubbldsdsdsd!" + selectedBubble);
    const data = await getDoc(bubbleRef);
    const currentTime = serverTimestamp();
    await updateDoc(bubbleRef, {
      statusID: defaultStatus,
      lastChanged: currentTime,
    })
      .then(() => {
        console.log("Bubble status reset!");
      })
      .catch((error) => console.error(error));
  };

  useLayoutEffect(() => {
    const initialUpdate = async () => {
      const userRef = doc(database, "users", auth.currentUser.uid);
      const docSnap = await getDoc(userRef);
      setDefaultStatus(docSnap.data().statusID);
    };

    initialUpdate();
  }, []);

  useLayoutEffect(() => {
    const userRef = doc(database, "users", auth.currentUser.uid);
    const q = query(
      collection(database, "bubbles"),
      where("creatorID", "==", userRef)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bubblesArray = [];
      let counter = 0;
      if (querySnapshot.empty) return;

      querySnapshot.forEach((doc) => {
        counter++;

        bubblesArray.push({
          bubbleID: doc.id,
          title: doc.data().title,
          indicator: doc.data().statusID,
          computerGenerated: doc.data().computerGenerated,
        });

        if (querySnapshot.size == counter) {
          setBubbles(bubblesArray);
          console.log("bubbleArray: ", bubblesArray[0]);
        }
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <ResetPopup
        isResetModalVisible={isResetModalVisible}
        setResetModalVisible={setResetModalVisible}
        resetStatusFunction={resetStatusFunction}
        title={selectedBubbleTitle}
      />
      <SafeAreaView style={statusForSpecificAudienceStyles.container}>
        <Image source={bgImg} style={messagesStyles.bgImg} />
        <Header title="Status for Specific Audience" navigation={navigation} />

        <View style={statusForSpecificAudienceStyles.bgContainer}>
          <View style={statusForSpecificAudienceStyles.descriptionContainer}>
            <View
              style={statusForSpecificAudienceStyles.descriptionTextContainer}
            >
              <Text
                style={statusForSpecificAudienceStyles.descriptionTextHeader}
              >
                Set Status to Specific Audience
              </Text>
              <Text
                style={statusForSpecificAudienceStyles.descriptionTextContent}
              >
                You can create an audience to set them to a specific status that
                is different from your default status. If a duration is set,
                your status for that audience will return to your default status
                after the set duration.
              </Text>
            </View>
          </View>

          <View style={statusForSpecificAudienceStyles.audienceContainer}>
            <View
              style={statusForSpecificAudienceStyles.audienceContainerHeader}
            >
              <Text
                style={
                  statusForSpecificAudienceStyles.audienceContainerTextHeader
                }
              >
                Select Audience
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CreateAudience");
                }}
              >
                <View>
                  <Text>+ ADD</Text>
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {bubbles.map((item) => {
                if (
                  JSON.stringify(item.indicator) !=
                  JSON.stringify(defaultStatus)
                ) {
                  let routeName = "";
                  item.computerGenerated
                    ? (routeName = "ChangeStatusGroup")
                    : (routeName = "EditBubble");

                  return (
                    <AudienceBox
                      key={item.bubbleID}
                      audienceIndicator={item.indicator}
                      title={item.title}
                      bubbleID={item.bubbleID}
                      resetModal={setResetModalVisible}
                      bubbleSelectedFunction={setSelectedBubble}
                      bubbleTitleSelectedFunction={setSelectedBubbleTitle}
                      navigation={navigation}
                      route={routeName}
                    />
                  );
                }
              })}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default StatusForSpecificAudience;
