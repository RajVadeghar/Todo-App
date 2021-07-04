import { useState } from "react";
import EditingTemplate from "./EditingTemplate";
import ViewTemplate from "./ViewTemplate";

function Todo({ id, title, isChecked, editTodo }) {
  const [isEditing, setEditing] = useState(false);

  return isEditing ? (
    <EditingTemplate
      id={id}
      editTodo={editTodo}
      setEditing={setEditing}
      title={title}
    />
  ) : (
    <ViewTemplate
      id={id}
      title={title}
      isChecked={isChecked}
      setEditing={setEditing}
    />
  );
}

export default Todo;
