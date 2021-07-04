import Head from "next/head";
import { signIn, useSession } from "next-auth/client";
import TodosHome from "../components/TodosHome";
import { useTheme } from "../context/ThemeContext";
import LoadingScreen from "../screens/LoadingScreen";

export default function Home() {
  const [session, loading] = useSession();
  const darkTheme = useTheme();

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className={`${darkTheme && "dark"}`}>
      <Head>
        <title>TODO App</title>
      </Head>

      {!session ? signIn() : <TodosHome />}
    </div>
  );
}
