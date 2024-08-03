import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, editTodo } from "../features/todo/todoSlice";
import { useState } from "react";

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [isUpdate, setIsUpdate] = useState({ status: false });

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (isUpdate.status) {
      const text = input;
      dispatch(editTodo({id:isUpdate.id, text}));
      console.log(isUpdate.id, text);
      setIsUpdate({ status: false });
      setInput("");
      return;
    }
    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <>
      {/* add todo part */}
      <form className="space-x-3 mt-12">
        <input
          type="text"
          className="bg-gray-800 rounded border border-gray-700 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-3 leadingi-0 transition-colors duration-200 ease-in-out"
          placeholder="Enter a Todo.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={addTodoHandler}
          type="submit"
          className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          {isUpdate.status ? "Update" : "Add todo"}
        </button>
      </form>
      {/* show todo part */}
      <div className="max-w-md mx-auto mt-8 bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
        <h2 className="text-2xl font-bold text-slate-100 p-4 bg-gradient-to-r from-purple-500 to-pink-500">
          Todos
        </h2>
        <ul className="divide-y divide-slate-700">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-4 hover:bg-slate-700 transition-colors duration-200"
            >
              <span className="text-slate-300">{todo.text}</span>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setInput(todo.text);
                    setIsUpdate({ status: true, id: todo.id });
                  }}
                  className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-900 rounded-full transition-all duration-200"
                >
                  <i className="ri-pencil-line text-lg"></i>
                </button>
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="p-2 text-pink-400 hover:text-pink-300 hover:bg-pink-900 rounded-full transition-all duration-200"
                >
                  <i className="ri-delete-bin-line text-lg"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todos;
