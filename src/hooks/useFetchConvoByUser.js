import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";

const useFetchConvoByUser = async (friendID) => {
  if (friendID == auth.currentUser.uid) return null;

  const userRef = doc(database, "users", auth.currentUser.uid);
  const friendRef = doc(database, "users", friendID);

  const userConvos = await getUserConv(userRef);
  const friendConvos = await getUserConv(friendRef);
  const conversationID = await getDirectConv(
    userConvos.docs,
    friendConvos.docs
  );

  return conversationID;
};

const getUserConv = async (userRef) => {
  const q = query(
    collection(database, "user_conversations"),
    where("userID", "==", userRef)
  );
  const userConvoSnap = await getDocs(q);
  return userConvoSnap;
};

const getDirectConv = async (userConvosSnap, friendConvosSnap) => {
  const userConvos = userConvosSnap.map((userConv) => userConv.data());
  const friendConvos = friendConvosSnap.map((userConv) => userConv.data());
  const matchedConvos = userConvos.filter((userConvo) => {
    return friendConvos.some((friendConvo) => {
      return userConvo.conversationID.id == friendConvo.conversationID.id;
    });
  });

  let directConv = null;

  await Promise.all(
    matchedConvos.map(async (userConvo) => {
      const convoSnap = await getDoc(userConvo.conversationID);

      if (convoSnap.data().type == "Direct") directConv = convoSnap.id;
    })
  );

  return directConv;
};

export default useFetchConvoByUser;
