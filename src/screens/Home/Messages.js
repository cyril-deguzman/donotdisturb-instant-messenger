import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import MessageBox from "../../components/MessageBox";
import SearchBox from "../../components/SearchBox";
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
} from "firebase/firestore";
import { auth, database } from "../../../config/firebase";

const profileImg = require("../../assets/profile-picture.png");

const Messages = ({ navigation }) => {
  const [isPrevModalVisible, setPrevModalVisible] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const bgImg = useBackground("topBubbles");
  const pencilIcon = useIcon("messagePencilIcon");

  const [option, setOption] = useState(null);
  const [customMessageValue, setCustomMessage] = useState("");

  const dictionary = {
    "Open to Chat": "openToChat",
    "Be Right Back": "idle",
    "Do Not Disturb": "doNotDisturb",
    Invisible: "invisible",
  };

  useLayoutEffect(() => {
    const unsubscribeAll = [];

    const initialUpdate = async () => {
      const userRef = doc(database, "users", auth.currentUser.uid);
      const user = await getDoc(userRef);
      const unsubscribe = onSnapshot(user.data().statusID, (indicator) => {
        setOption(indicator.data().osi);
        setCustomMessage(indicator.data().message);
      });

      unsubscribeAll.push(unsubscribe);
    };

    initialUpdate();

    return () => unsubscribeAll.forEach((unsubscribe) => unsubscribe());
  }, []);

  useEffect(() => {
    const userRef = doc(database, "users", auth.currentUser.uid);
    const q = query(
      collection(database, "user_conversations"),
      where("userID", "==", userRef)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const conversationsArray = [];
      let counter = 0;
      if (querySnapshot.empty) return;

      querySnapshot.forEach(async (doc) => {
        const convRef = doc.data().conversationID;
        const dataSnap = await getDoc(convRef);
        counter++;

        conversationsArray.push({
          convRef,
          id: dataSnap.id,
          ...dataSnap.data(),
        });

        if (querySnapshot.size == counter) setConversations(conversationsArray);
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={messagesStyles.container}>
      <Image source={bgImg} style={messagesStyles.bgImg} />
      <View style={messagesStyles.row}>
        <View style={messagesStyles.statusBar}>
          <View style={messagesStyles.leftStatusBar}>
            <Image source={profileImg} style={messagesStyles.profileImg} />
            <Image
              source={useIndicator(dictionary[option])}
              style={messagesStyles.indicator}
            />
          </View>
          <View style={messagesStyles.rightStatusBar}>
            <TouchableOpacity
              onPress={() => navigation.navigate("DefaultStatus")}
            >
              <Text style={messagesStyles.name}>
                {auth.currentUser.displayName}
              </Text>

              <Text style={messagesStyles.customMessage}>
                {customMessageValue}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("NewMessage")}>
          <Image style={messagesStyles.pencilIcon} source={pencilIcon} />
        </TouchableOpacity>
      </View>
      <View style={messagesStyles.messageContainer}>
        <Text style={messagesStyles.tabLabel}>Messages</Text>
        <SearchBox setValue={setSearchQuery} value={searchQuery} />

        {conversations.length ? (
          <FlatList
            data={conversations}
            renderItem={({ item }) => (
              <MessageBox
                navigation={navigation}
                dataSnap={{ ...item }}
                isPrevModalVisible={isPrevModalVisible}
                setPrevModalVisible={setPrevModalVisible}
              />
            )}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 15 }}
          />
        ) : (
          <View style={messagesStyles.emptyInbox}>
            <Text style={messagesStyles.emptyInboxText}>
              You have no messages.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Messages;
