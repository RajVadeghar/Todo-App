import { useSession } from "next-auth/client";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import Todo from "./Todo";
import Banner from "./Banner";
import Header from "./Header";
import AddTodoForm from "./AddTodoForm";
import firebasedb from "../firebase";
import Navigation from "./Navigation";
import { useState } from "react";
import { useTodos } from "../context/TodoContext";
import Footer from "./Footer";

function TodosHome() {
  const [session] = useSession();
  const [resourceType, setResourceType] = useState("todos");
  const { todos, activeTodos, completedTodos } = useTodos();

  const [todosSnapshot] = useCollection(
    firebasedb
      .collection("users")
      .doc(session?.user?.name)
      .collection("todos")
      .orderBy("createdAt")
  );
  const [activeTodosSnapshot] = useCollection(
    firebasedb
      .collection("users")
      .doc(session?.user?.name)
      .collection("todos")
      .where("isChecked", "==", false)
      .orderBy("createdAt")
  );
  const [completedTodosSnapshot] = useCollection(
    firebasedb
      .collection("users")
      .doc(session?.user?.name)
      .collection("todos")
      .where("isChecked", "==", true)
      .orderBy("createdAt")
  );
  const [length, setLength] = useState(todosSnapshot?.docs.length);

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

  const showActiveTodos = () => {
    if (activeTodosSnapshot) {
      return activeTodosSnapshot.docs.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.data().title}
          isChecked={todo.data().isChecked}
          editTodo={editTodo}
        />
      ));
    } else {
      return activeTodos.map((todo) => (
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

  const showCompletedTodos = () => {
    if (completedTodosSnapshot) {
      return completedTodosSnapshot.docs.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.data().title}
          isChecked={todo.data().isChecked}
          editTodo={editTodo}
        />
      ));
    } else {
      return completedTodos.map((todo) => (
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
      <Banner />

      <div className="text-white z-30 flex-grow mt-[-200px] p-3 w-full md:w-2/3 lg:w-1/3 ">
        <Header />
        <AddTodoForm />
        <div className="shadow-2xl drop-shadow-2xl">
          <div className="bg-gray-50 dark:bg-gray-800 w-full rounded-sm">
            <Navigation
              setLength={setLength}
              resourceType={resourceType}
              setResourceType={setResourceType}
            />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 w-full rounded-sm max-h-full md:max-h-96 md:overflow-auto scroll">
            {resourceType === "todos" && showTodos()}
            {resourceType === "activeTodos" && showActiveTodos()}
            {resourceType === "completedTodos" && showCompletedTodos()}
          </div>
          <div className="block lg:hidden bg-gray-50 dark:bg-gray-800 w-full rounded-sm">
            <Footer length={length} />
          </div>
        </div>
      </div>

      <p className="text-center text-black text-opacity-40 dark:text-white dark:text-opacity-40 mb-5">
        Coded by{" "}
        <a href="https://github.com/RajVadeghar" target="_blank">
          RajVadeghar
        </a>
        . Source from{" "}
        <a
          href="https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW"
          target="_blank"
        >
          frontendmentor
        </a>
      </p>
    </div>
  );
}

export default TodosHome;
