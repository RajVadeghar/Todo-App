import { getSession } from "next-auth/client";
import firebasedb from "../../firebase";
import firebase from "firebase";

export default async (req, res) => {
  const session = await getSession({ req });

  if (req.method === "POST") {
    if (session) {
      try {
        const data = {
          ...req.body,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          isChecked: false,
        };

        await firebasedb
          .collection("users")
          .doc(session.user.email)
          .collection("todos")
          .add(data);

        res.status(200).json("data added successfully");
      } catch (e) {
        res.status(404).json("Insufficient data");
      }
    } else {
      res.status(500).json("You must login first");
    }
  } else if (req.method === "GET") {
    if (session) {
      try {
        const collection = await firebasedb
          .collection("users")
          .doc(session.user.email)
          .collection("todos")
          .orderBy("createdAt")
          .get();

        const firebaseData = collection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        res.status(200).json(firebaseData);
      } catch (err) {
        res.status(404).json("data not found");
      }
    } else {
      res.status(500).json("You must login first");
    }
  } else if (req.method === "DELETE") {
    if (session) {
      try {
        const completedCollection = await firebasedb
          .collection("users")
          .doc(session?.user?.email)
          .collection("todos")
          .where("isChecked", "==", true)
          .get();

        const batchSize = completedCollection.size;

        if (batchSize === 0) {
          resolve();
          return;
        }

        const batch = firebasedb.batch();

        completedCollection.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();

        res.status(200).json("deleted completed tasks");
      } catch (err) {
        res.status(404).json("data not found");
      }
    } else {
      res.status(500).json("You must login first");
    }
  } else {
    res.status(500).json("requested method not found");
  }
};
