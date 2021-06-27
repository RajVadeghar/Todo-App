import { LogoutIcon } from "@heroicons/react/outline";
import { signOut } from "next-auth/client";
import { useCollection } from "react-firebase-hooks/firestore";
import firebasedb from "../firebase";
import firebase from "firebase";
import Todo from "./Todo";
import Banner from "./Banner";
import Header from "./Header";
import AddTodoForm from "./AddTodoForm";
import { useSession } from "next-auth/client";

function TodosHome({ isDark, handleDarkMode, todos }) {
  const [session] = useSession();

  const [todosSnapshot] = useCollection(
    firebasedb
      .collection("users")
      .doc(session.user.name)
      .collection("todos")
      .orderBy("createdAt")
  );

  const editTodo = async (id, newName) => {
    const response = await firebasedb
      .collection("users")
      .doc(session.user.name)
      .collection("todos")
      .doc(id)
      .update({
        title: newName,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  const showTodos = () => {
    if (todosSnapshot) {
      return todosSnapshot.docs.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.data().title}
          isChecked={todo.data().isChecked}
          editTodo={editTodo}
        />
      ));
    } else {
      return todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          isChecked={todo.isChecked}
          editTodo={editTodo}
        />
      ));
    }
  };

  return (
    <div className="relative w-full min-h-screen h-auto bg-gray-200 dark:bg-gray-900 flex flex-col justify-center items-center">
      <LogoutIcon
        onClick={() => signOut()}
        className="hidden md:inline-block h-7 absolute top-5 right-10 text-white cursor-pointer"
      />
      <Banner />

      <div className="text-white z-30 flex-grow mt-[-200px] m-10 p-3 w-full md:w-2/3 lg:w-1/3 ">
        <Header isDark={isDark} handleDarkMode={handleDarkMode} />
        <AddTodoForm />
        <div className="bg-gray-100 dark:bg-gray-800 shadow-2xl drop-shadow-2xl w-full rounded-sm max-h-full md:max-h-96 mb-20 md:overflow-auto scroll">
          {showTodos()}
        </div>
      </div>
    </div>
  );
}

export default TodosHome;
