import { ToastAndroid } from "react-native";
import {
  collection,
  doc,
  addDoc,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
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

    await createUserConversation(memberSnap[0].name, memberRef, userRef);
    await addDoc(collection(database, "bubble_members"), {
      bubbleID: bubble,
      memberID: memberRef,
    });
  });

  navigation.navigate("ChangeStatusGroup", {
    bubbleID: bubble.id,
    headerTitle: "Change how they see you",
    bubbleTitle: name,
  });
};

const createUserConversation = async (memberName, memberRef, userRef) => {
  const q = query(
    collection(database, "conversations"),
    where("title", "==", memberName),
    where("altTitle", "==", auth.currentUser.displayName),
    where("type", "==", "Direct"),
    limit(1)
  );

  const convoSnap = await getDocs(q);

  if (convoSnap.empty) {
    const convRef = await addDoc(collection(database, "conversations"), {
      type: "Direct",
      title: memberName,
      altTitle: auth.currentUser.displayName,
    });

    await addDoc(collection(database, "user_conversations"), {
      conversationID: convRef,
      userID: memberRef,
    });

    await addDoc(collection(database, "user_conversations"), {
      conversationID: convRef,
      userID: userRef,
    });
  }
};

export default handleNextButton;
