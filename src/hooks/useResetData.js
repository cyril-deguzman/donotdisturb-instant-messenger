import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";

const useResetData = () => {
  console.log("resetting data...");
};

export default useResetData;
