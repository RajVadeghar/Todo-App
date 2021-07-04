import Todo from "./Todo";
import Banner from "./Banner";
import Header from "./Header";
import AddTodoForm from "./AddTodoForm";
import Navigation from "./Navigation";
import { useState } from "react";
import { useTodos } from "../context/TodoContext";
import Footer from "./Footer";
import axios from "axios";
import { useSnapshot } from "../context/SnapshotContext";

function TodosHome() {
  const [resourceType, setResourceType] = useState("todos");
  const { todos, activeTodos, completedTodos } = useTodos();
  const { todosSnapshot, activeTodosSnapshot, completedTodosSnapshot } =
    useSnapshot();
  const [length, setLength] = useState(todosSnapshot?.docs.length);

  const editTodo = async (id, title) => {
    try {
      await axios.put(`/api/todo/${id}`, {
        title,
      });
    } catch (error) {
      console.warn(error.response.data);
    }
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

  const deleteCompletedTodos = async () => {
    await axios.delete("/api/todos");
  };

  return (
    <div className="relative w-full min-h-screen h-auto bg-gray-200 dark:bg-gray-900 flex flex-col justify-center items-center">
      <Banner />

      <div className="text-white z-30 flex-grow mt-[-230px] md:mt-[-200px] mb-11 p-3 w-full md:w-2/3 lg:w-1/3 ">
        <Header />
        <AddTodoForm />
        <div className="shadow-2xl drop-shadow-2xl">
          <div className="bg-gray-50 dark:bg-gray-800 w-full rounded-sm">
            <Navigation
              length={length}
              setLength={setLength}
              resourceType={resourceType}
              setResourceType={setResourceType}
              deleteCompletedTodos={deleteCompletedTodos}
            />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 w-full rounded-sm max-h-full md:max-h-96 md:overflow-auto scroll">
            {resourceType === "todos" && showTodos()}
            {resourceType === "activeTodos" && showActiveTodos()}
            {resourceType === "completedTodos" && showCompletedTodos()}
          </div>
          <div className="block lg:hidden bg-gray-50 dark:bg-gray-800 w-full rounded-sm">
            <Footer
              length={length}
              deleteCompletedTodos={deleteCompletedTodos}
            />
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
