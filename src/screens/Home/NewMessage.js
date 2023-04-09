import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from "react-native";
import useBackground from "../../hooks/useBackground";
import WhiteSearchBox from "../../components/WhiteSearchBox";
import ProfileCheckBox from "../../components/ProfileCheckBox";
import newMessageStyles from "./utils/newMessageStyles";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore";
import { auth, database } from "../../../config/firebase";

const backIcon = require("../../assets/icons/back-icon.png");
const nextButton = require("../../assets/icons/next-button.png");

const NewMessage = ({ navigation }) => {
  const bgImg = useBackground("topBubbles");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const addToSelectedUsers = (name) => {
    const updatedSelectedUsers = [...selectedUsers];
    updatedSelectedUsers.push(name);
    setSelectedUsers(updatedSelectedUsers);
  };

  const removeFromSelectedUsers = (name) => {
    const updatedSelectedUsers = selectedUsers.filter((user) => user !== name);
    setSelectedUsers(updatedSelectedUsers);
  };

  const handleNextButton = async () => {
    if (!selectedUsers.length) {
      ToastAndroid.show("Select a user", ToastAndroid.SHORT);
      return;
    }

    if (selectedUsers.length == 1) {
      const friendSnap = users.filter((user) => user.name === selectedUsers[0]);
      const userRef = doc(database, "users", auth.currentUser.uid);
      const friendRef = doc(database, "users", friendSnap[0].userID);

      /** Convert to Hook */
      const convRef = await addDoc(collection(database, "conversations"), {
        title: friendSnap[0].name,
      });

      await addDoc(collection(database, "user_conversations"), {
        conversationID: convRef,
        userID: userRef,
      });

      await addDoc(collection(database, "user_conversations"), {
        conversationID: convRef,
        userID: friendRef,
      });

      navigation.navigate("Chat", {
        convID: convRef.id,
        title: friendSnap[0].name,
      });
      return;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const cleanData = [];
      const dataSnap = await getDocs(
        query(
          collection(database, "users"),
          where("name", "!=", auth.currentUser.displayName)
        )
      );

      dataSnap.forEach((user) => {
        cleanData.push({
          ...user.data(),
          id: user.id,
        });
      });

      setUsers(cleanData);
    };

    fetchUsers();
  }, []);

  return (
    <View style={newMessageStyles.container}>
      <Image source={bgImg} style={newMessageStyles.backImage} />

      <View style={newMessageStyles.topContainer}>
        <View style={newMessageStyles.row}>
          <View style={newMessageStyles.together}>
            <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
              <Image source={backIcon} style={newMessageStyles.backIcon} />
            </TouchableOpacity>
            <Text style={newMessageStyles.label}>New Message</Text>
          </View>
          <TouchableOpacity onPress={handleNextButton}>
            <Image source={nextButton} style={newMessageStyles.nextButton} />
          </TouchableOpacity>
        </View>
        <View style={newMessageStyles.searchBox}>
          <WhiteSearchBox setValue={setSearchQuery} value={searchQuery} />
        </View>
      </View>

      <View style={newMessageStyles.messageContainer}>
        <Text style={newMessageStyles.containerLabel}>Suggested</Text>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <ProfileCheckBox
              user={{ ...item }}
              handleAdd={addToSelectedUsers}
              handleRemove={removeFromSelectedUsers}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default NewMessage;
