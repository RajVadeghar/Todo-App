import { getSession } from "next-auth/client";
import firebase from "firebase";
import firebasedb from "../../../firebase";

export default async (req, res) => {
  const session = await getSession({ req });

  const { id } = req.query;
  if (req.method === "PUT") {
    if (session) {
      try {
        const response = await firebasedb
          .collection("users")
          .doc(session.user.email)
          .collection("todos")
          .doc(id)
          .update({
            ...req.body,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });

        res.satus(200).json(response);
      } catch (err) {
        res.satus(404).json("cannot update task");
      }
    } else {
      res.satus(500).json("You must login first");
    }
  }

  if (req.method === "DELETE") {
    if (session) {
      try {
        await firebasedb
          .collection("users")
          .doc(session.user.email)
          .collection("todos")
          .doc(id)
          .delete();

        res.satus(200).json("deleted task successfully");
      } catch (err) {
        res.satus(404).json("cannot update task");
      }
    } else {
      res.satus(500).json("You must login first");
    }
  }
};
