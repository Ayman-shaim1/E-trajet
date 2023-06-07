import app from "../firebase/config";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getFirestore,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { Alert } from "../services";
const firestore = getFirestore(app);

class Trip {
  constructor() {
    this.db = collection(firestore, "trips");
  }

  async creatTrip(tripData) {
    try {
      const docRef = await addDoc(this.db, {
        ...tripData,
        createdAt: serverTimestamp(),
      });
      return docRef;
    } catch (error) {
      console.log(String(error));
      Alert.open({
        title: "Create trip error",
        message: String(error),
        type: "danger",
      });
    }
  }

  getAllUserTrips(userId, callback) {
    try {
      const userTripsQuery = query(
        this.db,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      return onSnapshot(userTripsQuery, querySnapshot => {
        const trips = [];
        querySnapshot.forEach(doc => {
          const tripData = { id: doc.id, ...doc.data() };
          trips.push(tripData);
        });
        callback(trips);
      });
    } catch (error) {
      Alert.open({
        title: "Error",
        message: String(error),
        type: "danger",
      });
      console.log(String(error));
    }
  }
}

export default Trip;
