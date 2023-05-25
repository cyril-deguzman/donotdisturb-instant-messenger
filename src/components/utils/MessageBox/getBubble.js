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
import formatTime from "./formatTime";

const getBubble = (
  name,
  type,
  setBubbleIndicator,
  setBubbleTime,
  setIndicatorRef,
  unsubscribeAll
) => {
  const userRef = doc(database, "users", auth.currentUser.uid);
  const q = query(
    collection(database, "bubbles"),
    where("creatorID", "==", userRef),
    orderBy("lastChanged", "desc")
  );

  // need to handle changes on doc if statusID is tracking a different osi
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    if (querySnapshot.empty) return;
    let isLatest = false;

    querySnapshot.forEach(async (bubble) => {
      const bubbleRef = doc(database, "bubbles", bubble.id);

      if (type == "Direct") {
        const friend = await getUserByName(name);
        const friendRef = doc(database, "users", friend.id);
        const q = query(
          collection(database, "bubble_members"),
          where("bubbleID", "==", bubbleRef),
          where("memberID", "==", friendRef)
        );

        const bubbleSnap = await getDocs(q);

        if (!bubbleSnap.empty && !isLatest) {
          isLatest = true;
          loadBubbleIndicator(
            bubbleRef,
            setBubbleIndicator,
            setBubbleTime,
            setIndicatorRef,
            unsubscribeAll
          );
        }
      }

      if (type == "Group") {
        if (bubble.data().title == name) {
          isLatest = true;
          loadBubbleIndicator(
            bubbleRef,
            setBubbleIndicator,
            setBubbleTime,
            setIndicatorRef,
            unsubscribeAll
          );
        }
      }
    });
  });

  unsubscribeAll.push(unsubscribe);
};

const loadBubbleIndicator = async (
  bubbleRef,
  setBubbleIndicator,
  setBubbleTime,
  setIndicatorRef,
  unsubscribeAll
) => {
  const bubble = await getDoc(bubbleRef);
  const indicatorRef = bubble.data().statusID;

  setIndicatorRef(indicatorRef);

  const unsubscribe = onSnapshot(indicatorRef, (indicator) => {
    const expiry = indicator.data().expiry
      ? formatTime(indicator.data().expiry.toDate())
      : "changed";

    setBubbleIndicator(dictionary[indicator.data().osi]);
    setBubbleTime(expiry);
  });

  unsubscribeAll.push(unsubscribe);
};

/**
 * NOTE: Problem will occur if there are similar names, need to do this in a safer way.
 * POSSIBLE SOLUTION: Validation on register where the property "name" must be unique.
 */
const getUserByName = async (name) => {
  let user;

  const q = query(
    collection(database, "users"),
    where("name", "==", name),
    limit(1)
  );

  const userSnap = await getDocs(q);
  userSnap.forEach((u) => {
    user = u;
  });

  return user;
};

const dictionary = {
  "Open to Chat": "openToChat",
  "Be Right Back": "idle",
  "Do Not Disturb": "doNotDisturb",
  Invisible: "invisible",
};

export default getBubble;
