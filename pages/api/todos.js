import { getSession } from "next-auth/client";
import firebasedb from "../../firebase";
import firebase from "firebase";

export default async (req, res) => {
  const session = await getSession({ req });

  if (req.method === "POST") {
    try {
      const data = {
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        username: req.body.username,
        title: req.body.title,
        isChecked: false,
      };

      const response = await firebasedb
        .collection("users")
        .doc(req.body.username)
        .collection("todos")
        .add(data);

      res.status(200).json("data added successfully");
    } catch (e) {
      res.status(404).json("Insufficient data");
    }
  } else if (req.method === "GET") {
    try {
      const collection = await firebasedb
        .collection("users")
        .doc(session.user.name)
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
  }
};
