import firebasedb from "../../firebase";
import firebase from "firebase";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession(req);
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

      res.status(200).json(response);
    } catch (err) {
      res.status(404).json("data not sufficient");
    }
  } else {
    res.status(500).json("req_method not valid");
  }
};
