import { ToastAndroid } from "react-native";
import { collection, doc, addDoc } from "firebase/firestore";
import { auth, database } from "../../../../../config/firebase";

const handleNextButton = async (users, selectedUsers, navigation) => {
  if (!selectedUsers.length) {
    ToastAndroid.show("Select a user", ToastAndroid.SHORT);
    return;
  }

  const userRef = doc(database, "users", auth.currentUser.uid);
  let title = selectedUsers[0];
  let type = "Direct";

  if (selectedUsers.length > 1) {
    title = "Hackathon GC";
    type = "Group";
  }

  const convRef = await addDoc(collection(database, "conversations"), {
    type: type,
    title: title,
    altTitle: auth.currentUser.displayName,
  });

  await addDoc(collection(database, "user_conversations"), {
    conversationID: convRef,
    userID: userRef,
  });

  selectedUsers.forEach(async (friend) => {
    const friendSnap = users.filter((user) => user.name === friend);
    const friendRef = doc(database, "users", friendSnap[0].userID);

    await addDoc(collection(database, "user_conversations"), {
      conversationID: convRef,
      userID: friendRef,
    });
  });

  navigation.navigate("Chat", {
    convID: convRef.id,
    title: title,
  });
};

export default handleNextButton;
