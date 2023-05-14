import React, { useState, useLayoutEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../../../config/firebase";

import {
  collection,
  query,
  where,
  getDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { auth, database } from "../../../config/firebase";

import { ScrollView } from "react-native-gesture-handler";

import Header from "../../components/Header";

import useBackground from "../../hooks/useBackground";
import useIcon from "../../hooks/useIcon";
import messagesStyles from "./utils/messagesStyles";
import statusForSpecificAudienceStyles from "./utils/statusForSpecificAudienceStyles";
import AudienceBox from "../../components/AudienceBox";

const StatusForSpecificAudience = ({ navigation }) => {
  const bgImg = useBackground("topBubbles");

  const [bubbles, setBubbles] = useState([]);

  const [defaultStatus, setDefaultStatus] = useState(null);

  // useLayoutEffect(async () => {
  //   const userRef = doc(database, "users", auth.currentUser.uid);

  //   const docSnap = await getDoc(userRef);

  //   if (!docSnap.empty) setDefaultStatus(docSnap.data().statusID);

  //   return () => unsubscribe();
  // }, []);

  useLayoutEffect(() => {
    const initialUpdate = async () => {
      const userRef = doc(database, "users", auth.currentUser.uid);
      const docSnap = await getDoc(userRef);
      setDefaultStatus(docSnap.data().statusID);
    };

    initialUpdate();
  }, []);

  // useLayoutEffect(() => {
  //   const userRef = doc(database, "users", auth.currentUser.uid);
  //   const q = query(
  //     collection(database, "bubbles"),
  //     where("creatorID", "==", userRef)
  //   );

  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const bubblesArray = [];
  //     let counter = 0;
  //     if (querySnapshot.empty) return;

  //     querySnapshot.forEach(async (doc) => {
  //       counter++;

  //       // const bubbleSnap = await getDoc(doc.data().bubbleID);
  //       const dataSnap = await getDoc(doc.data().statusID);
  //       console.log("dataSnap.data()");
  //       console.log(dataSnap.data());

  //       bubblesArray.push({
  //         bubbleID: doc.data().bubbleID,
  //         title: doc.data().title,
  //         indicator: doc.data().statusID,
  //       });

  //       if (querySnapshot.size == counter) setBubbles(bubblesArray);

  //       console.log("BUBBLES: " + bubblesArray);
  //     });
  //   });

  //   return () => unsubscribe();
  // }, []);

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
          bubbleID: doc.data().bubbleID,
          title: doc.data().title,
          indicator: doc.data().statusID,
        });

        if (querySnapshot.size == counter) setBubbles(bubblesArray);
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={statusForSpecificAudienceStyles.container}>
      <Image source={bgImg} style={messagesStyles.bgImg} />
      <Header title="Status for Specific Audience" navigation={navigation} />

      <View style={statusForSpecificAudienceStyles.bgContainer}>
        <View style={statusForSpecificAudienceStyles.descriptionContainer}>
          <View
            style={statusForSpecificAudienceStyles.descriptionTextContainer}
          >
            <Text style={statusForSpecificAudienceStyles.descriptionTextHeader}>
              Set Status to Specific Audience
            </Text>
            <Text
              style={statusForSpecificAudienceStyles.descriptionTextContent}
            >
              You can create an audience to set them to a specific status that
              is different from your default status. If a duration is set, your
              status for that audience will return to your default status after
              the set duration.
            </Text>
          </View>
        </View>

        <View style={statusForSpecificAudienceStyles.audienceContainer}>
          <View style={statusForSpecificAudienceStyles.audienceContainerHeader}>
            <Text
              style={
                statusForSpecificAudienceStyles.audienceContainerTextHeader
              }
            >
              Select Audience
            </Text>

            <TouchableOpacity>
              <View>
                <Text>+ ADD</Text>
              </View>
            </TouchableOpacity>
          </View>

          {bubbles.map((item) => {
            if (
              JSON.stringify(item.indicator) != JSON.stringify(defaultStatus)
            ) {
              return (
                <AudienceBox
                  key={item.title}
                  audienceIndicator={item.indicator}
                  title={item.title}
                  bubbleID={item.bubbleID}
                />
              );
            }
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StatusForSpecificAudience;
