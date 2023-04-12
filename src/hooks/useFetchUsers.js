import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, database } from "../../config/firebase";

/**
 * useFetchUsers hook
 * @params includeUser defaults to false. set to true if you want to include logged in user.
 * @returns users except for the currently logged in user by default.
 */
const useFetchUsers = async (includeUser = false) => {
  const users = [];
  const q = includeUser
    ? query(collection(database, "users"))
    : query(
        collection(database, "users"),
        where("name", "!=", auth.currentUser.displayName)
      );
  const dataSnap = await getDocs(q);

  dataSnap.forEach((user) => {
    users.push({
      ...user.data(),
      id: user.id,
    });
  });

  return users;
};

export default useFetchUsers;
