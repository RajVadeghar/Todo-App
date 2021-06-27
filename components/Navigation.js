import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import firebasedb from "../firebase";

function Navigation({
  todos,
  activeTodos,
  completedTodos,
  resourceType,
  setResourceType,
}) {
  const [session] = useSession();
  const [length, setLength] = useState(todos.length);

  useEffect(() => {
    const newLength =
      resourceType == "todos"
        ? todos.length
        : resourceType == "activeTodos"
        ? activeTodos.length
        : completedTodos.length;
    setLength(newLength);
  }, [resourceType]);

  const deleteCompletedTodos = async () => {
    const completedCollection = await firebasedb
      .collection("users")
      .doc(session?.user?.name)
      .collection("todos")
      .where("isChecked", "==", true)
      .get();

    const batchSize = completedCollection.size;

    if (batchSize === 0) {
      resolve();
      return;
    }

    const batch = firebasedb.batch();

    completedCollection.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  };

  return (
    <div className="mx-3 h-14 flex justify-around items-center">
      <p className="text-black text-opacity-50 dark:text-white dark:text-opacity-50 text-sm w-auto">
        {length} items left
      </p>
      <div className="grid grid-cols-3 gap-4 place-content-center justify-items-center">
        <p
          className={`${
            resourceType == "todos" && "navActive"
          } text-black text-opacity-80 dark:text-white dark:text-opacity-80 link`}
          onClick={() => setResourceType("todos")}
        >
          All
        </p>
        <p
          className={`${
            resourceType == "activeTodos" && "navActive"
          } text-black text-opacity-80 dark:text-white dark:text-opacity-80 link`}
          onClick={() => setResourceType("activeTodos")}
        >
          Active
        </p>
        <p
          className={`${
            resourceType == "completedTodos" && "navActive"
          } text-black text-opacity-80 dark:text-white dark:text-opacity-80 link`}
          onClick={() => setResourceType("completedTodos")}
        >
          Completed
        </p>
      </div>
      <p
        onClick={deleteCompletedTodos}
        className="text-black text-opacity-50 dark:text-white dark:text-opacity-50 text-sm link w-auto break-words"
      >
        clear completed
      </p>
    </div>
  );
}

export default Navigation;
