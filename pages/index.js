import Head from "next/head";
import { signIn, useSession } from "next-auth/client";
import TodosHome from "../components/TodosHome";
import { useTheme } from "../context/ThemeContext";
import Login from "../components/Login";

export default function Home() {
  const [session] = useSession();
  const darkTheme = useTheme();

  return (
    <div className={`${darkTheme && "dark"}`}>
      <Head>
        <title>TODO App</title>
      </Head>

      {!session ? <Login /> : <TodosHome />}
    </div>
  );
}
