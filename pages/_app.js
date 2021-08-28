import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { ThemeProvider } from "../context/ThemeContext";
import { TodoProvider } from "../context/TodoContext";
import { SnapshotProvider } from "../context/SnapshotContext";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider>
        <TodoProvider>
          <SnapshotProvider>
            <Component {...pageProps} />
          </SnapshotProvider>
        </TodoProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
