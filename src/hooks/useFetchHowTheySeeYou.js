import formatTime from "../components/utils/MessageBox/formatTime";

const fetchIndicator = async (id, setExpiry, setIndicator, unsubscribeAll) => {
  let indicatorRef;

  if (id == "none") {
    const userRef = doc(database, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    indicatorRef = userSnap.data().statusID;
  } else indicatorRef = doc(database, "online_statuses", id);

  const unsubscribe = onSnapshot(indicatorRef, (indicatorSnap) => {
    const formatExpiry = indicatorSnap.data().expiry
      ? formatTime(indicatorSnap.data().expiry.toDate())
      : "changed";

    setExpiry(formatExpiry);
    setIndicator(dictionary[indicatorSnap.data().osi]);
  });

  unsubscribeAll.push(unsubscribe);
};
