import { useEffect, useRef, useState } from "react";

function EditingTemplate({ id, editTodo, setEditing, title }) {
  const [newName, setNewName] = useState(title);
  const inputRef = useRef();

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(id, newName);
    setNewName("");
    setEditing(false);
  };

  return (
    <form
      className="flex items-center bg-gray-100 dark:bg-gray-800 w-full"
      onSubmit={handleSubmit}
    >
      <p className="h-5 w-5 border-2 border-gray-700 rounded-full ml-3 z-50" />
      <input
        ref={inputRef}
        className="mx-3 pr-3 w-full h-16 bg-transparent bg-opacity-100 focus:outline-none active:bg-transparent text-black text-opacity-50 dark:text-white dark:text-opacity-50"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        type="text"
      />
      <button className="hidden btn mt-3" onClick={handleSubmit} type="submit">
        Submit
      </button>
    </form>
  );
}

export default EditingTemplate;
