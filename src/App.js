import { useState, useEffect } from "react";
import ToDo from "./components/ToDo";
import {
  addTodo,
  getAlltodo,
  updateTodo,
  deleteTodo,
} from "./components/Utils/HandleAPI";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setisUpdating] = useState(false);
  const [todoID, settodoID] = useState();

  // mounts the fetched data on to the screen
  useEffect(() => {
    getAlltodo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setisUpdating(true);
    setText(text);
    settodoID(_id);
  };

  const deleteAll = () => {
    setToDo([]);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add your Daily Task here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateTodo(todoID, setisUpdating, text, setText, setToDo)
                : () => addTodo(text, setText, setToDo)
            }
          >
            {isUpdating ? "Update Task" : "Add Task"}
          </div>
          <div className="Deleteall" onClick={deleteAll}>
            Delete All
          </div>
        </div>
        {/* mapping out the data for rendering  */}
        <div className="List">
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteTodo={() => deleteTodo(item._id, setToDo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
