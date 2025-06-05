import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, app, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const registerUserGoogle = async (username, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const docRef = await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
                uid: user.uid,
            });

            const taskdocRef = await setDoc(doc(db, "taskboard", user.email.split("@")[0]), {
                taskboards: []
            });

            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error registering user:", errorCode, errorMessage);
            throw new Error(errorMessage);
        });
}

const loginUserGoogle = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            localStorage.setItem("arakoouser", JSON.stringify({
                uid: user.uid,
                email: user.email,
            }));
            
            const taskdocRef = await getDoc(doc(db, "taskboard", user.email.split("@")[0]));
            if (taskdocRef.exists()) {
                localStorage.setItem("taskboard", JSON.stringify(taskdocRef.data()));
            }
            else {
                console.log("No such taskboard document!");
            }

            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error logging in user:", errorCode, errorMessage);
            throw new Error(errorMessage);
        });
}
    
export { registerUserGoogle, loginUserGoogle };