import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, database } from "../../config/firebase";

/**
 * useFetchUsers hook
 * @returns users except for the currently logged in user.
 */
const useFetchUsers = async () => {
  const users = [];
  const dataSnap = await getDocs(
    query(
      collection(database, "users"),
      where("name", "!=", auth.currentUser.displayName)
    )
  );

  dataSnap.forEach((user) => {
    users.push({
      ...user.data(),
      id: user.id,
    });
  });

  return users;
};

export default useFetchUsers;
