import {
  collection,
  query,
  where,
  onSnapshot,
  limit,
  orderBy,
} from "firebase/firestore";
import { auth, database } from "../../../../config/firebase";
import formatTime from "./formatTime";

const getFirstMessage = (
  dataSnap,
  setMsgTime,
  setMsgPreview,
  unsubscribeAll
) => {
  try {
    const q = query(
      collection(database, "messages"),
      where("conversationID", "==", dataSnap?.convRef),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) return;

      querySnapshot.forEach((doc) => {
        const date = doc.data().createdAt.toDate();
        const time = formatTime(date);
        setMsgPreview(doc.data().text);
        setMsgTime(time);
      });
    });

    unsubscribeAll.push(unsubscribe);
  } catch (err) {
    console.log(err);
  }
};

export default getFirstMessage;
