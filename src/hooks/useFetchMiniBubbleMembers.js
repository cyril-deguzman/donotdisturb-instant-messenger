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

    const userConversations = await getUserConversations();
    const filteredConversations = await filterUserConversations(
      userConversations,
      bubblesMembersArray
    );

    setConversations(filteredConversations);
  });

  unsubscribeAll.push(unsubscribe);
};

const getUserConversations = async () => {
  const user_conversations = [];
  const userRef = doc(database, "users", auth.currentUser.uid);
  const q = query(
    collection(database, "user_conversations"),
    where("userID", "==", userRef)
  );

  const dataSnap = await getDocs(q);

  dataSnap.forEach((user_conversation) => {
    user_conversations.push(user_conversation.data().conversationID);
  });

  return user_conversations;
};

const filterUserConversations = async (userConversations, members) => {
  const filteredConversationIDs = [];
  const userRef = doc(database, "users", auth.currentUser.uid);

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

      if (convoSnap.empty) {
        const convRef = await addDoc(collection(database, "conversations"), {
          type: "Direct",
          title: memberInfo.data().name,
          altTitle: auth.currentUser.displayName,
        });

        await addDoc(collection(database, "user_conversations"), {
          conversationID: convRef,
          userID: member,
        });

        await addDoc(collection(database, "user_conversations"), {
          conversationID: convRef,
          userID: userRef,
        });

        filteredConversationIDs.push({
          convRef: convRef,
          id: convRef.id,
          type: "Direct",
          title: memberInfo.data().name,
          altTitle: auth.currentUser.displayName,
        });
      } else {
        const convRef = doc(database, "conversations", convoSnap.docs[0].id);

        filteredConversationIDs.push({
          convRef: convRef,
          id: convoSnap.docs[0].id,
          ...convoSnap.docs[0].data(),
        });
      }
    })
  );

  return filteredConversationIDs;
};

const createUserConversation = () => {};

export default useFetchMiniBubbleMembers;
