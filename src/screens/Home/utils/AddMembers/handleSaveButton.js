import { ToastAndroid } from "react-native";
import { collection, doc, addDoc } from "firebase/firestore";
import { auth, database } from "../../../../../config/firebase";

const handleSaveButton = async (
  convID,
  suggestedUsers,
  selectedUsers,
  navigation
) => {
  if (!selectedUsers.length) {
    ToastAndroid.show("Select a user", ToastAndroid.SHORT);
    return;
  }

  const convRef = doc(database, "conversations", convID);

  selectedUsers.forEach(async (friend) => {
    const friendSnap = suggestedUsers.filter((user) => user.name === friend);
    const friendRef = doc(database, "users", friendSnap[0].userID);

    await addDoc(collection(database, "user_conversations"), {
      conversationID: convRef,
      userID: friendRef,
    });
  });

  navigation.goBack();
};

export default handleSaveButton;
