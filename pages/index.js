import Head from "next/head";
import { getSession, signIn } from "next-auth/client";
import TodosHome from "../components/TodosHome";
import firebasedb from "../firebase";
import { useState } from "react";

export default function Home({ todos, session }) {
  const [isDark, setDark] = useState(false);

  const handleDarkMode = () => {
    const mode = isDark ? false : true;
    setDark(mode);
  };

  return (
    <div className={`${isDark && "dark"}`}>
      <Head>
        <title>TODO App</title>
      </Head>

      {!session && (
        <div>
          <button onClick={() => signIn()}>Sign In</button>
        </div>
      )}
      {session && (
        <TodosHome
          isDark={isDark}
          handleDarkMode={handleDarkMode}
          todos={todos}
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

  return {
    props: { todos, session },
  };
}
