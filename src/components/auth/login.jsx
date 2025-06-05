import { useNavigate } from "react-router-dom";
import { loginUserGoogle } from "../../apis/auth";

export default function Login() {

    const navigate = useNavigate();

    const loginUser = async (event) => {
        event.preventDefault();
        try {
            const email = event.target.email.value;
            const password = event.target.password.value;
            // Call the loginUserGoogle function from auth.js
            await loginUserGoogle(email, password)
            .then(() => {
                alert("User logged in successfully!");
                navigate("/"); // Redirect to the home page after successful login
            });
        } catch (error) {
            alert("Error logging in user: " + error.message);
            // Handle the error appropriately, e.g., show an error message to the user
        }
        event.target.reset(); // Reset the form after submission
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center text-fuchsia-700">Login</h2>
                    <form onSubmit={loginUser}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded text-black" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                            <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded text-black" required />
                        </div>
                        <button type="submit" className="w-full bg-fuchsia-600 text-white p-2 rounded hover:bg-fuchsia-700 transition duration-200">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}