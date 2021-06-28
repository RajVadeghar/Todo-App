import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../axios";

export const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(async () => {
    await axios.get("/api/todos").then((res) => {
      setTodos(res.data);
    });
    await axios.get("/api/active/todos").then((res) => {
      setActiveTodos(res.data);
    });
    await axios.get("/api/completed/todos").then((res) => {
      setCompletedTodos(res.data);
    });
  }, []);

  const value = {
    todos,
    activeTodos,
    completedTodos,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
