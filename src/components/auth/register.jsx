import { useNavigate } from "react-router-dom";
import { registerUserGoogle } from "../../apis/auth";

export default function Register(){

    const navigate = useNavigate();

    const registerUser =async (event) => {
        event.preventDefault();
        try{
            const username = event.target.username.value;
            const email = event.target.email.value;
            const password = event.target.password.value;
            // Call the registerUserGoogle function from auth.js
            await registerUserGoogle(username, email, password)
            alert("User registered successfully! Now you can login.");

        }
        catch (error) {
            alert("Error registering user: " + error.message);
            // Handle the error appropriately, e.g., show an error message to the user
        }
        event.target.reset(); // Reset the form after submission
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center text-fuchsia-700">Register</h2>
                    <form onSubmit={registerUser}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                            <input type="text" id="username" className="w-full p-2 border border-gray-300 rounded text-black" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded text-black" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                            <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded text-black" required />
                        </div>
                        <button type="submit" className="w-full bg-fuchsia-600 text-white p-2 rounded hover:bg-fuchsia-700 transition duration-200">Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}