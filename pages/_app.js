import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { ThemeProvider } from "../context/ThemeContext";
import { TodoProvider } from "../context/TodoContext";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider>
        <TodoProvider>
          <Component {...pageProps} />
        </TodoProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
