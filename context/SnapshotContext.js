import { useSession } from "next-auth/client";
import React, { createContext, useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebasedb from "../firebase";

export const SnapshotContext = createContext();

export const useSnapshot = () => useContext(SnapshotContext);

export const SnapshotProvider = ({ children }) => {
  const [session] = useSession();

  const [todosSnapshot] = useCollection(
    firebasedb
      .collection("users")
      .doc(session?.user?.email)
      .collection("todos")
      .orderBy("createdAt")
  );
  const [activeTodosSnapshot] = useCollection(
    firebasedb
      .collection("users")
      .doc(session?.user?.email)
      .collection("todos")
      .where("isChecked", "==", false)
      .orderBy("createdAt")
  );
  const [completedTodosSnapshot] = useCollection(
    firebasedb
      .collection("users")
      .doc(session?.user?.email)
      .collection("todos")
      .where("isChecked", "==", true)
      .orderBy("createdAt")
  );

  const value = {
    todosSnapshot,
    activeTodosSnapshot,
    completedTodosSnapshot,
  };

  return (
    <SnapshotContext.Provider value={value}>
      {children}
    </SnapshotContext.Provider>
  );
};
