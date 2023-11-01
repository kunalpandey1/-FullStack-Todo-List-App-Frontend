import axios from "axios";

const baseUrl = "http://localhost:5000/todos";
//https://fullstack-todo-list-app-backend.onrender.com"

// fetching the TODO from Database

const getAlltodo = async (setToDo) => {
  try {
    const { data } = await axios.get(baseUrl);
    console.log(data);
    setToDo(data); // Assuming setTodo is defined elsewhere
  } catch (error) {
    console.error("Error fetching todos: ", error);
  }
};

// Adding the TODO to the Database and after adding just calling the fetch function

const addTodo = async (text, setText, setToDo) => {
  try {
    const response = await axios.post(`${baseUrl}/save`, { text });
    console.log(response.data);
    setText("");
    getAlltodo(setToDo);
  } catch (error) {
    console.error("Error adding todos: ", error);
  }
};

const updateTodo = async (todoId, setisUpdating, text, setText, setToDo) => {
  try {
    const response = await axios.post(`${baseUrl}/update`, {
      _id: todoId,
      text,
    });
    console.log(response.data);
    setText("");
    setisUpdating(false);
    getAlltodo(setToDo);
  } catch (error) {
    console.error("Error adding todos: ", error);
  }
};
const deleteTodo = async (todoId, setToDo) => {
  try {
    const response = await axios.post(`${baseUrl}/delete`, {
      _id: todoId,
    });
    console.log(response.data);
    getAlltodo(setToDo);
  } catch (error) {
    console.error("Error adding todos: ", error);
  }
};

const deleteAll = async (setToDo) => {
  try {
    const response = await axios.post(`${baseUrl}/deleteAll`);
    console.log(response.data);
    setToDo([]); // Clear the toDo state after successful deletion
  } catch (error) {
    console.error("Error deleting all todos: ", error);
  }
};

export { getAlltodo, addTodo, updateTodo, deleteTodo, deleteAll };
