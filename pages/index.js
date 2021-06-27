import Head from "next/head";
import { getSession, signIn, useSession } from "next-auth/client";
import firebasedb from "../firebase";
import { useState } from "react";
import TodosHome from "../components/TodosHome";

export default function Home({ todos, activeTodos, completedTodos }) {
  const [session, loading] = useSession();
  const [isDark, setDark] = useState(false);

  const handleDarkMode = () => {
    const mode = isDark ? false : true;
    setDark(mode);
  };
  

  return loading ? (
    <div className="grid place-items-center h-screen bg-gray-800">
      <p className="uppercase font-bold text-2xl tracking-widest z-40 text-white">
        Todo
      </p>
    </div>
  ) : (
    <div className={`${isDark && "dark"}`}>
      <Head>
        <title>TODO App</title>
      </Head>

      {!session && signIn()}

      {session && (
        <TodosHome
          isDark={isDark}
          todos={todos}
          activeTodos={activeTodos}
          completedTodos={completedTodos}
          handleDarkMode={handleDarkMode}
        />
      )}
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req });

  const collection = await firebasedb
    .collection("users")
    .doc(session?.user?.name)
    .collection("todos")
    .orderBy("createdAt")
    .get();

  const firebaseData = collection.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const todos = JSON.parse(JSON.stringify(firebaseData));

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

  const activeTodos = JSON.parse(JSON.stringify(activeCollectionData));

  const completedCollection = await firebasedb
    .collection("users")
    .doc(session?.user?.name)
    .collection("todos")
    .where("isChecked", "==", true)
    .orderBy("createdAt")
    .get();

  const completedCollectionData = completedCollection.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const completedTodos = JSON.parse(JSON.stringify(completedCollectionData));

  return {
    props: { todos, activeTodos, completedTodos },
  };
}
