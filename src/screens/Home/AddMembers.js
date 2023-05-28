import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import useBackground from "../../hooks/useBackground";
import WhiteSearchBox from "../../components/WhiteSearchBox";
import ProfileCheckBox from "../../components/ProfileCheckBox";
import normalize from "react-native-normalize";
import useFetchConversationUsers from "../../hooks/useFetchConversationUsers";
import useFetchUsers from "../../hooks/useFetchUsers";
import addMembersStyles from "./utils/addMembersStyles";
import handleSaveButton from "./utils/AddMembers/handleSaveButton";
import useFetchBubbleMembers from "../../hooks/useFetchBubbleMembers";

const backIcon = require("../../assets/icons/back-icon.png");
const saveButton = require("../../assets/icons/save-button.png");

const AddMembers = ({ navigation, route }) => {
  const { convID, type, isConv } = route.params;
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const bgImg = useBackground("topBubbles");
  const [searchQuery, setSearchQuery] = useState("");

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
    const fetchSuggestedMembers = async () => {
      const allUsers = await useFetchUsers(true);

      var members;

      if (isConv) members = await useFetchConversationUsers(convID, false);
      else members = await useFetchBubbleMembers(convID);

      const memberNames = members.map((m) => m.name);

      const filteredUsers = allUsers.filter(
        (user) => !memberNames.includes(user.name)
      );

      setSuggestedUsers(filteredUsers);
    };

    fetchSuggestedMembers();
  }, []);

  return (
    <View style={addMembersStyles.container}>
      <Image source={bgImg} style={addMembersStyles.backImage} />

      <View style={addMembersStyles.topContainer}>
        <View style={addMembersStyles.row}>
          <View style={addMembersStyles.together}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={backIcon} style={addMembersStyles.backIcon} />
            </TouchableOpacity>
            <Text style={addMembersStyles.label}>Add Members</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              handleSaveButton(
                convID,
                suggestedUsers,
                selectedUsers,
                navigation,
                isConv
              )
            }
          >
            <Image source={saveButton} style={addMembersStyles.nextButton} />
          </TouchableOpacity>
        </View>

        <View
          style={{ marginTop: normalize(15), marginHorizontal: normalize(10) }}
        >
          <WhiteSearchBox setValue={setSearchQuery} value={searchQuery} />
        </View>
      </View>

      <View style={addMembersStyles.messageContainer}>
        <Text style={addMembersStyles.containerLabel}>Suggested</Text>
        <FlatList
          data={suggestedUsers}
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

export default AddMembers;
