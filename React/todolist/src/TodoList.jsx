import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./TodoList.css";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState(""); // Use state for input field

  // Function to add a new task
  const addTask = () => {
    if (taskInput.trim() === "") return; // Prevent adding empty tasks
    setTasks([...tasks, { id: uuid(), task: taskInput, completed: false }]);
    setTaskInput(""); // Reset input field
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Function to toggle task completion status
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to generate snowflakes at random positions
  const generateSnowflakes = () => {
    const snowflakeContainer = document.querySelector(".mainContainer");
    const numberOfSnowflakes = 30;

    for (let i = 0; i < numberOfSnowflakes; i++) {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`;
      snowflakeContainer.appendChild(snowflake);
    }
  };

  // Cleanup snowflakes when component unmounts
  useEffect(() => {
    generateSnowflakes();

    return () => {
      const snowflakes = document.querySelectorAll(".snowflake");
      snowflakes.forEach((snowflake) => snowflake.remove());
    };
  }, []);

  return (
    <div className="mainContainer">
      <p>Add tasks & get it done</p>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Enter a task"
          value={taskInput} // Controlled component
          onChange={(e) => setTaskInput(e.target.value)} // Update input state
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="taskContainer">
        <ul className="TaskListed">
          {tasks.map((task) => (
            <li key={task.id} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              <span>
                <FontAwesomeIcon
                  onClick={() => toggleTaskCompletion(task.id)}
                  icon={faCheck}
                  style={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    marginRight: "15px",
                    color: task.completed ? "#888" : "#00ff87",
                  }}
                />
                {task.task}
              </span>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => deleteTask(task.id)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>Built with 💚 using React</p>
      </footer>
    </div>
  );
}
