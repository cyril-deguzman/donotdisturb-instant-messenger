import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";

const useFetchConversationUsers = async (
  conversationID,
  includeUser = true
) => {
  const users = [];
  const loggedUser = doc(database, "users", auth.currentUser.uid);

  console.log("useFetchConvoID  " + conversationID);
  const convRef = doc(database, "conversations", conversationID);

  var q;
  if (includeUser)
    q = query(
      collection(database, "user_conversations"),
      where("conversationID", "==", convRef)
    );
  else
    q = query(
      collection(database, "user_conversations"),
      where("conversationID", "==", convRef),
      where("userID", "!=", loggedUser)
    );
  const conversationSnapshot = await getDocs(q);

  await Promise.all(
    conversationSnapshot.docs.map(async (doc) => {
      const userRef = doc.data().userID;
      const user = await getDoc(userRef);

      if (user.exists())
        users.push({
          ...user.data(),
          id: user.id,
        });
    })
  );

  return users;
};

export default useFetchConversationUsers;
