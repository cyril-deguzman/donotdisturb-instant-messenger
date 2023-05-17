import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";

const useFetchBubbleMembers = async (bubbleRef, memberID) => {
  const bubbles = [];

  const q = query(
    collection(database, "bubble_members"),
    where("memberID", "==", memberID),
    where("bubbleID", "!=", bubbleRef)
  );

  const bubbleMemberSnapshot = await getDocs(q);

  await Promise.all(
    bubbleMemberSnapshot.docs.map(async (doc) => {
      const bubbleRef = doc.data().bubbleID;
      const bubble = await getDoc(bubbleRef);

      if (bubble.exists())
        bubbles.push({
          ...bubble.data(),
          id: bubble.data().bubbleID,
        });
    })
  );

  return bubbles;
};

export default useFetchBubbleMembers;
