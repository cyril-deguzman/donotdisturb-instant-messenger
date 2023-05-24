import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import useBackground from "../../hooks/useBackground";
import WhiteSearchBox from "../../components/WhiteSearchBox";
import ProfileCheckBox from "../../components/ProfileCheckBox";
import useIcon from "../../hooks/useIcon";
import newMessageStyles from "./utils/newMessageStyles";
import useFetchUsers from "../../hooks/useFetchUsers";
import handleNextButton from "./utils/AddBubble/handleNextButton";
import GroupNamePopup from "../../components/GroupNamePopup";

const styles = newMessageStyles;

const AddBubble = ({ navigation }) => {
  const bgImg = useBackground("topBubbles");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [name, setName] = useState("");
  const [isGroupNameModalVisible, setGroupNameModalVisible] = useState(false);

  const saveButton = useIcon("saveButton");
  const backIcon = useIcon("backIcon");

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
    <View style={styles.container}>
      <Image source={bgImg} style={styles.backImage} />

      <GroupNamePopup
        isGroupNameModalVisible={isGroupNameModalVisible}
        setGroupNameModalVisible={setGroupNameModalVisible}
        GroupNameHeader={"Bubble Name (required)"}
        handleNextButton={handleNextButton}
        handleNextParams={[users, selectedUsers, navigation]}
      />
      <View style={styles.topContainer}>
        <View style={styles.row}>
          <View style={styles.together}>
            <TouchableOpacity onPress={() => navigation.navigate("Bubble")}>
              <Image source={backIcon} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.label}>Add Members</Text>
          </View>
          <TouchableOpacity onPress={() => setGroupNameModalVisible(true)}>
            <Image source={saveButton} style={styles.nextButton} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <WhiteSearchBox setValue={setSearchQuery} value={searchQuery} />
        </View>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.containerLabel}>Suggested</Text>
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

export default AddBubble;
