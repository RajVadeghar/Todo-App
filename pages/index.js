import Head from "next/head";
import { signIn, useSession } from "next-auth/client";
import TodosHome from "../components/TodosHome";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const [session, loading] = useSession();
  const darkTheme = useTheme();

  return loading ? (
    <div className="grid place-items-center h-screen bg-gray-800">
      <p className="uppercase font-bold text-2xl tracking-widest z-40 text-white">
        Todo
      </p>
    </div>
  ) : (
    <div className={`${darkTheme && "dark"}`}>
      <Head>
        <title>TODO App</title>
      </Head>

      {!session && signIn()}

      {session && <TodosHome />}
    </div>
  );
}
