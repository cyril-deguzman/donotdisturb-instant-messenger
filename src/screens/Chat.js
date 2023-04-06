import React, { useState, useLayoutEffect, useCallback } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { GiftedChat, InputToolbar, Bubble } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  where,
  doc,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";
import ChatHeader from "../components/ChatHeader";
import useBackground from "../hooks/useBackground";
import chatStyles from "./utils/chatStyles";

export default function Chat({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  const bgImg = useBackground("bubbles");
  const { convID, title } = route.params;

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: chatStyles.bubbleText,
          left: chatStyles.bubbleText,
        }}
        wrapperStyle={{
          left: chatStyles.leftBubbleBG,
          right: chatStyles.rightBubbleBG,
        }}
      />
    );
  };

  const inputToolbarContainer = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={chatStyles.inputToolbar}
      ></InputToolbar>
    );
  };

  useLayoutEffect(() => {
    const conversationID = doc(database, "conversations", convID);

    const q = query(
      collection(database, "messages"),
      where("conversationID", "==", conversationID),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
          conversationID: doc.data().conversationID,
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    const conversationID = doc(database, "conversations", convID);

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "messages"), {
      _id,
      createdAt,
      text,
      user,
      conversationID,
    });
  }, []);

  return (
    <View style={chatStyles.container}>
      <ChatHeader title={title} navigation={navigation} />
      <ImageBackground source={bgImg} style={{ flex: 10 }}>
        <GiftedChat
          wrapInSafeArea={false}
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          onSend={(messages) => onSend(messages)}
          messagesContainerStyle={chatStyles.msgContainer}
          textInputStyle={chatStyles.textInput}
          renderInputToolbar={(props) => inputToolbarContainer(props)}
          renderBubble={(props) => renderBubble(props)}
          user={{
            _id: auth?.currentUser?.displayName,
            avatar: "https://i.pravatar.cc/300",
          }}
        />
      </ImageBackground>
    </View>
  );
}
