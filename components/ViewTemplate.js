import firebasedb from "../firebase";
import { XIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/outline";
import firebase from "firebase";
import { useSession } from "next-auth/client";

function ViewTemplate({ id, title, isChecked, setEditing }) {
  const [session] = useSession();

  const deleteTodo = async () => {
    await firebasedb
      .collection("users")
      .doc(session.user.name)
      .collection("todos")
      .doc(id)
      .delete();
  };

  const toggleChecked = async () => {
    const boolCheck = isChecked ? false : true;
    await firebasedb
      .collection("users")
      .doc(session.user.name)
      .collection("todos")
      .doc(id)
      .update({
        isChecked: boolCheck,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  const handleDoubleClick = () => {
    setEditing(true);
  };

  return (
    <div className="flex items-center py-5 h-auto shadow-inner hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-150 ease-out">
      {!isChecked ? (
        <p
          tabIndex="1"
          onKeyPress={toggleChecked}
          className="h-5 w-5 border-2 border-gray-700 rounded-full ml-3 z-50 cursor-pointer opacity-80"
          onClick={toggleChecked}
        ></p>
      ) : (
        <CheckCircleIcon
          tabIndex="1"
          onKeyPress={toggleChecked}
          onClick={toggleChecked}
          className="h-5 w-5 text-green-500 ml-3 z-50 cursor-pointer"
        />
      )}
      <p
        className={`${
          isChecked &&
          "line-through text-black text-opacity-40 dark:text-white dark:text-opacity-40"
        } break-all flex-grow mx-3 text-black text-opacity-80 dark:text-white dark:text-opacity-80`}
        onDoubleClick={handleDoubleClick}
      >
        {title}
      </p>
      <div>
        <XIcon
          onClick={deleteTodo}
          className="h-5 mx-3 text-gray-500 cursor-pointer opacity-50"
        />
      </div>
    </div>
  );
}

export default ViewTemplate;
