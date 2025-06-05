import { db } from "../../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";


const createTaskboard = async (email, taskboardData) => {
    const taskboardRef = doc(db, "taskboard", email.split("@")[0]);
    const taskboard = {
        taskboards: taskboardData.taskboards || []
    };

    try {
        await setDoc(taskboardRef, taskboard, { merge: true });
        console.log("Taskboard created successfully for:", email);
    } catch (error) {
        console.error("Error creating taskboard:", error);
        throw new Error("Failed to create taskboard");
    }
}

const addTaskToTaskboard = async (email, task) => {
    const taskboardRef = doc(db, "taskboard", email.split("@")[0]);

    try {
        await updateDoc(taskboardRef, {
            taskboards: arrayUnion(task)
        });
        console.log("Task added successfully to taskboard for:", email);
    } catch (error) {
        console.error("Error adding task to taskboard:", error);
        throw new Error("Failed to add task to taskboard");
    }
}

const getTaskboard = async (email) => {
    const taskboardRef = doc(db, "taskboard", email.split("@")[0]);

    try {
        const taskboardDoc = await getDoc(taskboardRef);
        if (taskboardDoc.exists()) {
            return taskboardDoc.data();
        } else {
            console.log("No such taskboard document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching taskboard:", error);
        throw new Error("Failed to fetch taskboard");
    }
}

export { createTaskboard, addTaskToTaskboard, getTaskboard };