import { ToastAndroid } from "react-native";
import { collection, doc, addDoc } from "firebase/firestore";
import { auth, database } from "../../../../../config/firebase";

const handleNextButton = async (name, users, selectedUsers, navigation) => {
  if (name.trim().length == 0) {
    ToastAndroid.show("Name is required", ToastAndroid.SHORT);
    return;
  }

  if (!selectedUsers.length) {
    ToastAndroid.show("Select a user", ToastAndroid.SHORT);
    return;
  }

  const dateNow = new Date();
  const userRef = doc(database, "users", auth.currentUser.uid);

  const osi = await addDoc(collection(database, "online_statuses"), {
    expiry: null,
    message: "",
    osi: "Invisible",
    toggleTime: false,
  });

  const bubble = await addDoc(collection(database, "bubbles"), {
    computerGenerated: false,
    creatorID: userRef,
    lastChanged: dateNow,
    statusID: osi,
    title: name,
  });

  selectedUsers.forEach(async (member) => {
    const memberSnap = users.filter((user) => user.name === member);
    const memberRef = doc(database, "users", memberSnap[0].userID);

    await addDoc(collection(database, "bubble_members"), {
      bubbleID: bubble,
      memberID: memberRef,
    });
  });

  navigation.navigate("Bubble");
};

export default handleNextButton;
