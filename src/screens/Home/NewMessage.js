import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import useBackground from "../../hooks/useBackground";
import WhiteSearchBox from "../../components/WhiteSearchBox";
import ProfileCheckBox from "../../components/ProfileCheckBox";
import newMessageStyles from "./utils/newMessageStyles";
import handleNextButton from "./utils/NewMessage/handleNextButton";
import useFetchUsers from "../../hooks/useFetchUsers";
import GroupNamePopup from "../../components/GroupNamePopup";

const backIcon = require("../../assets/icons/back-icon.png");
const nextButton = require("../../assets/icons/next-button.png");

const NewMessage = ({ navigation }) => {
  const bgImg = useBackground("topBubbles");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isGroupNameModalVisible, setGroupNameModalVisible] = useState(false);

  const addToSelectedUsers = (name) => {
    const updatedSelectedUsers = [...selectedUsers];
    updatedSelectedUsers.push(name);
    setSelectedUsers(updatedSelectedUsers);
  };

  const removeFromSelectedUsers = (name) => {
    const updatedSelectedUsers = selectedUsers.filter((user) => user !== name);
    setSelectedUsers(updatedSelectedUsers);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await useFetchUsers();
      setUsers(data);
    };

    fetchData();
  }, []);

  return (
    <View style={newMessageStyles.container}>
      <Image source={bgImg} style={newMessageStyles.backImage} />

      <GroupNamePopup
        isGroupNameModalVisible={isGroupNameModalVisible}
        setGroupNameModalVisible={setGroupNameModalVisible}
        GroupNameHeader={"Group Chat Name (required)"}
        handleNextButton={handleNextButton}
        handleNextParams={[users, selectedUsers, navigation]}
      />
      <View style={newMessageStyles.topContainer}>
        <View style={newMessageStyles.row}>
          <View style={newMessageStyles.together}>
            <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
              <Image source={backIcon} style={newMessageStyles.backIcon} />
            </TouchableOpacity>
            <Text style={newMessageStyles.label}>New Message</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (selectedUsers.length == 1)
                handleNextButton("Direct", users, selectedUsers, navigation);
              else setGroupNameModalVisible(true);
            }}
          >
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
