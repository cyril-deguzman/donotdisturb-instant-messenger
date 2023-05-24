import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
  addDoc,
  limit,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";

const useFetchMiniBubbleMembers = (
  bubbleID,
  setConversations,
  unsubscribeAll
) => {
  const bubbleRef = doc(database, "bubbles", bubbleID);
  const q = query(
    collection(database, "bubble_members"),
    where("bubbleID", "==", bubbleRef)
  );

  const unsubscribe = onSnapshot(q, async (querySnapshot) => {
    const bubblesMembersArray = [];
    if (querySnapshot.empty) return;

    querySnapshot.forEach((doc) => {
      bubblesMembersArray.push(doc.data().memberID);
    });

    const filteredConversations = await filterUserConversations(
      bubblesMembersArray
    );

    setConversations(filteredConversations);
  });

  unsubscribeAll.push(unsubscribe);
};

const filterUserConversations = async (members) => {
  const filteredConversationIDs = [];

  await Promise.all(
    members.map(async (member) => {
      const memberInfo = await getDoc(member);
      const q = query(
        collection(database, "conversations"),
        where("title", "==", memberInfo.data().name),
        where("altTitle", "==", auth.currentUser.displayName),
        where("type", "==", "Direct"),
        limit(1)
      );

      const convoSnap = await getDocs(q);

      const convRef = doc(database, "conversations", convoSnap.docs[0].id);

      filteredConversationIDs.push({
        convRef: convRef,
        id: convoSnap.docs[0].id,
        ...convoSnap.docs[0].data(),
      });
    })
  );

  return filteredConversationIDs;
};

const createUserConversation = () => {};

export default useFetchMiniBubbleMembers;
