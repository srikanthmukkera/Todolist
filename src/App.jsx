import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useMemo, useRef, useState } from "react";
import { deleteItem, insertItem, updateItem } from "./reducers/ListReducer";

function App() {
  const todolist = useSelector((state) => state.todolist.value);
  const dispatch = useDispatch();
  const [item, setItem] = useState({});
  const [filter, setFilter] = useState("");
  const inputRef = useRef({});
  const filteredList = useMemo(() => {
    return filter === "Completed"
      ? (todolist || []).filter((item) => item.isCompleted)
      : filter === "Pending"
      ? (todolist || []).filter(
          (item) => item.isCompleted === null || !item.isCompleted
        )
      : todolist;
  }, [todolist, filter]);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="h-[80%] aspect-square bg-black rounded-md flex flex-col">
        <div className="w-full bg-white h-[10%] flex justify-between items-center">
          <input
            ref={inputRef}
            className="p-2 border border-[#d5d5d5] rounded"
            value={item.task}
            onChange={(e) => setItem({ ...item, task: e.target.value })}
          />
          <button
            className="bg-cyan-400 text-white px-3 h-[40px] rounded"
            onClick={() => {
              if (todolist.find((_item) => item.task === _item.task)) {
                alert("Already Task Listed");
                return;
              }
              dispatch(insertItem({ ...item, id: todolist?.length || 0 }));
              setItem({});
              inputRef.current.value = null;
            }}
          >
            Create
          </button>
        </div>
        <div className="w-full bg-white h-[10%] flex justify-between items-center">
          <select
            className="border text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value={"Pending"}>Pending</option>
            <option value={"Completed"}>Completed</option>
          </select>
        </div>

        <div className="w-full p-2 overflow-y-scroll">
          <div className="w-full p-2 h-fit flex flex-col gap-y-2 ">
            {(filteredList || []).map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-white w-full h-[50px] flex items-center justify-between  p-2 rounded-xl"
                >
                  <div className="flex gap-x-2 items-center">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={(e) => {
                        dispatch(
                          updateItem({ ...item, isCompleted: e.target.checked })
                        );
                      }}
                    />
                    <div>{item.task}</div>
                  </div>
                  <div
                    className="text-red-600"
                    onClick={() => {
                      dispatch(deleteItem(item));
                    }}
                  >
                    Delete
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
