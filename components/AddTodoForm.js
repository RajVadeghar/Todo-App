import { useState } from "react";
import axios from "../axios";
import { useSession } from "next-auth/client";

function AddTodoForm() {
  const [title, setTitle] = useState("");
  const [session] = useSession();

  const addTodo = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/todos", {
        username: session?.user?.name,
        title,
      })
      .then(() => {
        setTitle("");
      });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form
      className="flex items-center bg-gray-100 dark:bg-gray-800 mb-5 shadow-2xl drop-shadow-2xl w-full rounded-sm"
      onSubmit={addTodo}
    >
      <p className="h-5 w-5 border-2 border-gray-700 rounded-full ml-3 z-50 opacity-80" />
      <input
        className="mx-3 pr-3 w-full h-16 bg-transparent bg-opacity-100 focus:outline-none active:bg-transparent text-black text-opacity-50 dark:text-white dark:text-opacity-50"
        value={title}
        onChange={handleTitleChange}
        placeholder="create a new TODO..."
        name="title"
        type="text"
      />
      <button
        disabled={!title}
        className="hidden btn mt-3"
        onClick={addTodo}
        type="submit"
      >
        + Add
      </button>
    </form>
  );
}

export default AddTodoForm;
