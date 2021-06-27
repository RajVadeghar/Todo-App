import Head from "next/head";
import { getSession, signIn, useSession } from "next-auth/client";
import TodosHome from "../components/TodosHome";
import firebasedb from "../firebase";
import { useState } from "react";

export default function Home({ todos }) {
  const [session, loading] = useSession();
  const [isDark, setDark] = useState(false);

  console.log(todos);

  const handleDarkMode = () => {
    const mode = isDark ? false : true;
    setDark(mode);
  };

  return loading ? (
    <div className="grid h-screen place-items-center">loading...</div>
  ) : (
    <div className={isDark && "dark"}>
      <Head>
        <title>TODO App</title>
      </Head>

      {!session && <>{signIn()}</>}
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
  // const firebaseData = await axios.get("/api/get/todos");
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
    props: { todos },
  };
}
