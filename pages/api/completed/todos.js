import { getSession } from "next-auth/client";
import firebasedb from "../../../firebase";

export default async (req, res) => {
  const session = await getSession({ req });

  if (req.method === "GET") {
    if (session) {
      try {
        const completedCollection = await firebasedb
          .collection("users")
          .doc(session.user.email)
          .collection("todos")
          .where("isChecked", "==", true)
          .orderBy("createdAt")
          .get();

        const completedCollectionData = completedCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        res.status(200).json(completedCollectionData);
      } catch (err) {
        res.status(404).json("data not found");
      }
    } else {
      res.status(500).json("You must login first");
    }
  } else {
    res.status(500).json("request method not found");
  }
};
