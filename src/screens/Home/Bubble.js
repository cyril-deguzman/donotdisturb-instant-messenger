import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";

import SearchBoxBrighter from "../../components/SeachBoxBrighter";
import useBackground from "../../hooks/useBackground";
import bubbleStyles from "./utils/bubbleStyles";
import { ScrollView } from "react-native-gesture-handler";
import useIcon from "../../hooks/useIcon";
import MiniBubble from "../../components/MiniBubble";

import {
  collection,
  query,
  where,
  getDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { auth, database } from "../../../config/firebase";

const Bubble = ({ navigation }) => {
  const bgImg = useBackground("bubbles");
  const addBubbleIcon = useIcon("addBubbleIcon");

  const [searchQuery, setSearchQuery] = useState("");
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const userRef = doc(database, "users", auth.currentUser.uid);
    const q = query(
      collection(database, "bubbles"),
      where("creatorID", "==", userRef)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bubblesArray = [];
      let counter = 0;
      if (querySnapshot.empty) return;

      querySnapshot.forEach(async (doc) => {
        counter++;

        //console.log("bubblee.data()");
        console.log(doc.data().bubbleID);

        bubblesArray.push({
          bubbleID: doc.data().bubbleID,
          title: doc.data().title,
        });

        if (querySnapshot.size == counter) setBubbles(bubblesArray);
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={bubbleStyles.container}>
      <Image source={bgImg} style={bubbleStyles.bgImg} />
      <View style={bubbleStyles.headerContainerShadow}>
        <View style={bubbleStyles.headerContainer}>
          <View style={bubbleStyles.headerTextContainer}>
            <Text style={bubbleStyles.headerText}>Bubbles</Text>
            <Text style={bubbleStyles.headerSubtext}>
              Categorize conveniently
            </Text>
          </View>
          <View style={bubbleStyles.headerAddButtonContainer}>
            <Image
              source={addBubbleIcon}
              style={bubbleStyles.headerAddButton}
            />
          </View>
        </View>
      </View>

      <View style={bubbleStyles.bubbleContainer}>
        <ScrollView>
          <View style={bubbleStyles.searchContainer}>
            <SearchBoxBrighter setValue={setSearchQuery} value={searchQuery} />
          </View>

          {bubbles.map((item) => {
            return (
              <MiniBubble
                key={item.bubbleID}
                bubbleName={item.title}
                bubbleID={item.bubbleID}
                navigation={navigation}
              />
            );
          })}

          {/* <MiniBubble bubbleName="DLSU Friends"/>
          <MiniBubble bubbleName="La Familia"/>
          <MiniBubble bubbleName="Work"/> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Bubble;
