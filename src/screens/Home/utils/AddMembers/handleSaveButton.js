import { ToastAndroid } from "react-native";
import { collection, doc, addDoc } from "firebase/firestore";
import { auth, database } from "../../../../../config/firebase";

const handleSaveButton = async (
  convID,
  suggestedUsers,
  selectedUsers,
  navigation,
  isConv = true
) => {
  if (!selectedUsers.length) {
    ToastAndroid.show("Select a user", ToastAndroid.SHORT);
    return;
  }

  var ref;

  if (isConv) ref = doc(database, "conversations", convID);
  else ref = doc(database, "bubbles", convID);

  selectedUsers.forEach(async (friend) => {
    const friendSnap = suggestedUsers.filter((user) => user.name === friend);
    const friendRef = doc(database, "users", friendSnap[0].userID);

    if (isConv)
      await addDoc(collection(database, "user_conversations"), {
        conversationID: ref,
        userID: friendRef,
      });
    else
      await addDoc(collection(database, "bubble_members"), {
        bubbleID: ref,
        memberID: friendRef,
      });
  });

  navigation.goBack();
};

export default handleSaveButton;
