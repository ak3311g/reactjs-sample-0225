import { addTaskToTaskboard } from "../apis/taskboard";

export default function TaskForm({setShowTaskForm,taskBoardId}) {

    const addTask = (event) => {
        event.preventDefault();
        const taskName = event.target[0].value.trim();
        const taskDescription = event.target[1].value.trim();
        const taskDate = event.target[2].value;

        if (!taskName || !taskDescription || !taskDate) {
            alert("Please fill in all fields.");
            return;
        }

        const taskBoardData = JSON.parse(localStorage.getItem("taskboard")) || {
            taskList: [],
        };

        const taskListId = taskBoardId; // Assuming taskBoardId is passed as a prop
        const taskList = taskBoardData.taskList.find(list => list.id === parseInt(taskListId));
        if (!taskList) {
            alert("Task list not found.");
            return;
        }
        const newTask = {
            id: taskList?.tasks?.length + 1,
            name: taskName,
            description: taskDescription,
            date: taskDate,
        };

        // Add the new task to the specific task list
        taskList.tasks.push(newTask);

        const email = JSON.parse(localStorage.getItem("arakoouser")).email;

        addTaskToTaskboard(email, newTask, taskListId);

        localStorage.setItem("taskboard", JSON.stringify(taskBoardData));
        alert("Task added successfully!");
        setShowTaskForm({ show: false, taskListId: null });
    }

    return (
        <>
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                <form onSubmit={addTask} className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4 text-black">Add New Task</h2>
                    <input
                        type="text"
                        placeholder="Enter task title"
                        className="w-full p-2 border text-black border-gray-300 rounded mb-4"
                        required
                    />
                    <textarea
                        placeholder="Enter task description"
                        className="w-full p-2 border text-black border-gray-300 rounded mb-4"
                        rows="3"
                        required
                    ></textarea>
                    <input
                        type="date"
                        className="w-full p-2 border text-black border-gray-300 rounded mb-4"
                        required
                    />
                    <button
                        className="bg-fuchsia-600 text-white p-2 rounded hover:bg-fuchsia-700 transition duration-200"
                        type="submit"
                    >
                        Add Task
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 p-2 rounded ml-2 hover:bg-gray-400 transition duration-200"
                        type="button"
                        onClick={() => setShowTaskForm({ show: false, taskListId: null })}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </>
    )
}