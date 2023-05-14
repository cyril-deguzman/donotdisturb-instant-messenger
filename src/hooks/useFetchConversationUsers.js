import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";

const useFetchConversationUsers = async (conversationID) => {
  const users = [];
  console.log("useFethc  " + conversationID);
  const convRef = doc(database, "conversations", conversationID);
  const q = query(
    collection(database, "user_conversations"),
    where("conversationID", "==", convRef)
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
