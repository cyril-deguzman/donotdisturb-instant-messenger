import React, { useState, useLayoutEffect, useCallback } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GiftedChat, InputToolbar, Bubble } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, database } from "../../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../colors";
import ChatHeader from "../components/ChatHeader";
import useBackground from "../hooks/useBackground";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const bgImg = useBackground("bubbles");

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            fontFamily: "Inter",
            fontSize: 14,
          },
          left: {
            fontFamily: "Inter",
            fontSize: 14,
          },
        }}
        wrapperStyle={{
          left: { backgroundColor: "white" },
          right: { backgroundColor: "#AE6FFF" },
        }}
      />
    );
  };

  const inputToolbarContainer = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
      ></InputToolbar>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <View style={styles.container}>
      <ChatHeader title="Cyril de Guzman" navigation={navigation} />
      <ImageBackground source={bgImg} style={{ flex: 10 }}>
        <GiftedChat
          wrapInSafeArea={false}
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          onSend={(messages) => onSend(messages)}
          messagesContainerStyle={styles.msgContainer}
          textInputStyle={styles.textInput}
          renderInputToolbar={(props) => inputToolbarContainer(props)}
          renderBubble={(props) => renderBubble(props)}
          user={{
            _id: auth?.currentUser?.email,
            avatar: "https://i.pravatar.cc/300",
          }}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  msgContainer: {
    fontFamily: "Inter",
  },
  inputToolbar: {
    backgroundColor: "white",
  },
  textInput: {
    fontFamily: "Inter",
    fontSize: 14,
    marginTop: 5,
    marginRight: 10,
    paddingLeft: 10,
    backgroundColor: "#E1E2FF",
    borderRadius: 10,
    width: 50,
    height: 20,
  },
});
