import { useSession } from "next-auth/client";
import { useEffect } from "react";
import { useSnapshot } from "../context/SnapshotContext";

function Navigation({
  length,
  setLength,
  resourceType,
  setResourceType,
  deleteCompletedTodos,
}) {
  const { todosSnapshot, activeTodosSnapshot, completedTodosSnapshot } =
    useSnapshot();

  useEffect(() => {
    const newLength =
      resourceType == "todos"
        ? todosSnapshot?.docs.length
        : resourceType == "activeTodos"
        ? activeTodosSnapshot?.docs.length
        : completedTodosSnapshot?.docs.length;
    setLength(newLength);
  }, [
    todosSnapshot,
    activeTodosSnapshot,
    completedTodosSnapshot,
    resourceType,
  ]);

  return (
    <div className="mx-3 py-3 flex justify-around items-center">
      <p className="hidden lg:block text-black text-opacity-50 dark:text-white dark:text-opacity-50 text-sm w-auto">
        {length} items left
      </p>
      <div className="grid grid-cols-3 gap-4 place-content-center justify-items-center">
        <p
          tabIndex="1"
          onKeyPress={() => setResourceType("todos")}
          className={`${
            resourceType == "todos" && "navActive"
          } text-black text-opacity-80 dark:text-white dark:text-opacity-80 link`}
          onClick={() => setResourceType("todos")}
        >
          All
        </p>
        <p
          tabIndex="1"
          onKeyPress={() => setResourceType("activeTodos")}
          className={`${
            resourceType == "activeTodos" && "navActive"
          } text-black text-opacity-80 dark:text-white dark:text-opacity-80 link`}
          onClick={() => setResourceType("activeTodos")}
        >
          Active
        </p>
        <p
          tabIndex="1"
          onKeyPress={() => setResourceType("completedTodos")}
          className={`${
            resourceType == "completedTodos" && "navActive"
          } text-black text-opacity-80 dark:text-white dark:text-opacity-80 link`}
          onClick={() => setResourceType("completedTodos")}
        >
          Completed
        </p>
      </div>
      <p
        tabIndex="1"
        onKeyPress={deleteCompletedTodos}
        onClick={deleteCompletedTodos}
        className="hidden lg:block clearCompleted"
      >
        clear completed
      </p>
    </div>
  );
}

export default Navigation;
