import { useState } from "react";
import Button from "../components/common/button";
import { createTaskboard } from "../apis/taskboard";
import TaskForm from "../components/taskForm";

export default function TaskBoard() {
  const [showTaskListForm, setShowTaskListForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState({
    show: false,
    taskListId: null,
  });
  const email = JSON.parse(localStorage.getItem("arakoouser")).email;

  const handleAddTaskList = (event) => {
    event.preventDefault();

    const taskBoardName = event.target[0].value.trim();
    if (!taskBoardName) {
      alert("Please enter a valid taskboard name.");
      return;
    }

    const taskBoardData = JSON.parse(localStorage.getItem("taskboard")) || {
      taskList: [],
    };
    taskBoardData.taskList.push({
      name: taskBoardName,
      id: taskBoardData.taskList.length + 1,
      tasks: [],
    });
    localStorage.setItem("taskboard", JSON.stringify(taskBoardData));

    createTaskboard(email, taskBoardData)
      .then(() => {
        alert("Task list added successfully!");
      })
      .catch((error) => {
        console.error("Error adding task list:", error);
        alert("Failed to add task list. Please try again.");
      });

    setShowTaskListForm(false);
  };

  const taskBoardData = JSON.parse(localStorage.getItem("taskboard")) || {
    taskList: [],
  };

  return (
    <div className="w-screen h-screen bg-fuchsia-700 p-4">
      {!!showTaskListForm && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleAddTaskList}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-xl font-bold mb-4 text-black">
              Add New Task List
            </h2>
            <input
              type="text"
              placeholder="Enter task description"
              className="w-full p-2 border text-black border-gray-300 rounded mb-4"
            />
            <Button
              className="bg-fuchsia-600 text-white p-2 rounded hover:bg-fuchsia-700 transition duration-200"
              type="submit"
            >
              Add Task
            </Button>
            <Button
              className="bg-gray-300 text-gray-700 p-2 rounded ml-2 hover:bg-gray-400 transition duration-200"
              onClick={() => setShowTaskListForm(false)}
            >
              Cancel
            </Button>
          </form>
        </div>
      )}

      {
        showTaskForm.show && (
          <TaskForm 
            setShowTaskForm={setShowTaskForm}
            taskBoardId={showTaskForm.taskListId}
            />
        )
      }

      <h1 className="text-white text-3xl text-center mb-6">Task Board</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
        {taskBoardData?.taskList?.length > 0 ? (
          <ul className="space-y-4">
            <li className="flex items-center justify-between mb-4">
                <Button
                    className="bg-fuchsia-600 text-white p-2 rounded hover:bg-fuchsia-700 transition duration-200"
                    onClick={() => setShowTaskListForm(true)}
                >
                    Add Task List
                </Button>
            </li>
            {taskBoardData.taskList.map((taskList) => (
              <li
                key={taskList.id}
                className="bg-gray text-fuchsia-700 p-4 rounded shadow"
              >
                <h3 className="text-lg font-semibold">{taskList.name}</h3>
                {taskList?.tasks?.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    <li className="text-gray-500">
                        Tasks ({taskList.tasks.length}):
                    </li>
                    {taskList.tasks.map((task) => (
                      <li key={task.id} className="text-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold">{task.name}</h4>
                                <p className="text-sm">{task.description}</p>
                                <p className="text-xs text-gray-500">
                                Due: {task.date}
                                </p>
                            </div>
                        </div>
                      </li>
                    ))}
                    <Button
                      className="bg-fuchsia-600 text-white p-2 rounded hover:bg-fuchsia-700 transition duration-200 mt-2"
                      onClick={() => setShowTaskForm({ show: true, taskListId: taskList.id })}
                    >
                        Add Task
                    </Button>
                  </ul>
                ) : (
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-gray-500">
                      No tasks available in this list.
                    </p>
                    <Button
                      className="bg-fuchsia-600 text-white p-2 rounded hover:bg-fuchsia-700 transition duration-200"
                      onClick={() => setShowTaskForm({ show: true, taskListId: taskList.id })}
                    >
                      Add Task
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-gray-500">
              No tasks available. Please add a task list.
            </p>
            <Button
              className="bg-fuchsia-600 text-white p-2 rounded hover:bg-fuchsia-700 transition duration-200 mt-4"
              onClick={() => setShowTaskListForm(true)}
            >
              Add Task List
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
