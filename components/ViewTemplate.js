import { XIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/outline";
import axios from "axios";

function ViewTemplate({ id, title, isChecked, setEditing }) {
  const deleteTodo = async () => {
    try {
      await axios.delete(`/api/todo/${id}`);
    } catch (e) {
      console.warn(e.response.data);
    }
  };

  const toggleChecked = async () => {
    const boolCheck = isChecked ? false : true;
    try {
      await axios.put(`/api/todo/${id}`, {
        isChecked: boolCheck,
      });
    } catch (error) {
      console.warn(error.response.data);
    }
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
        onDoubleClick={() => setEditing(true)}
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
