import { getSession } from "next-auth/client";
import firebasedb from "../../../firebase";

export default async (req, res) => {
  const session = await getSession({ req });

  if (req.method === "GET") {
    try {
      const activeCollection = await firebasedb
        .collection("users")
        .doc(session?.user?.name)
        .collection("todos")
        .where("isChecked", "==", false)
        .orderBy("createdAt")
        .get();

      const activeCollectionData = activeCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(activeCollectionData);
    } catch (err) {
      res.status(404).json("data not found");
    }
  } else {
    res.status(500).json("request method not found");
  }
};
