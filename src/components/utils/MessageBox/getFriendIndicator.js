import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import { auth, database } from "../../../../config/firebase";
import useIndicator from "../../../hooks/useIndicator";

// - user is the person who is logged in
// - friend is user's friend

// 1. get friend ref
// 2. get bubbles in desc order
// 3. iterate bubble snapshot where bubble_members should have bubbleID == bubbleRef and memberID == userRef
// 4. if match get statusRef of bubble and display that
const getFriendIndicator = async (
  convRef,
  type,
  setFriendIndicator,
  unsubscribeAll
) => {
  if (type == "Group") {
    setFriendIndicator(useIndicator(null));
    return;
  }

  const userRef = doc(database, "users", auth.currentUser.uid);
  const q = query(
    collection(database, "user_conversations"),
    where("userID", "!=", userRef),
    where("conversationID", "==", convRef),
    limit(1)
  );
  const dataSnap = await getDocs(q);

  let friendRef;
  dataSnap.docs.forEach((docu) => {
    friendRef = docu.data().userID;
  });

  await getFriendIndicatorReference(
    friendRef,
    setFriendIndicator,
    unsubscribeAll
  );
};

const getFriendIndicatorReference = async (
  friendRef,
  setFriendIndicator,
  unsubscribeAll
) => {
  const friend = await getDoc(friendRef);
  const osi = onSnapshot(friend.data().statusID, (osiSnap) => {
    setFriendIndicator(useIndicator(dictionary[osiSnap.data().osi]));
  });

  unsubscribeAll.push(osi);
};

const dictionary = {
  "Open to Chat": "openToChat",
  "Be Right Back": "idle",
  "Do Not Disturb": "doNotDisturb",
  Invisible: "invisible",
};

export default getFriendIndicator;
