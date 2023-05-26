import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";

const useFetchBubbleMembers = async (bubbleRef, memberID = null) => {
  const listBubblesOrMembers = [];

  let q;

  if (memberID)
    q = query(
      collection(database, "bubble_members"),
      where("memberID", "==", memberID),
      where("bubbleID", "!=", bubbleRef)
    );
  else {
    const ref = doc(database, "bubbles", bubbleRef);
    q = query(
      collection(database, "bubble_members"),
      where("bubbleID", "==", ref)
    );
  }

  const bubbleMemberSnapshot = await getDocs(q);

  await Promise.all(
    bubbleMemberSnapshot.docs.map(async (doc) => {
      if (memberID) {
        const bubbleRef = doc.data().bubbleID;
        const bubble = await getDoc(bubbleRef);

        if (bubble.exists())
          listBubblesOrMembers.push({
            ...bubble.data(),
            id: bubble.id,
          });
      } else {
        const member = await getDoc(doc.data().memberID);

        if (member.exists())
          listBubblesOrMembers.push({
            ...member.data(),
            id: member.data().userID,
          });
      }
    })
  );

  return listBubblesOrMembers;
};

export default useFetchBubbleMembers;
