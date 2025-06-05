export default function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem("arakoouser") !== null;

    if (!isAuthenticated) {
        window.location.href = "/auth";
        return null; // Prevent rendering the children if not authenticated
    }
    return children; // Render the children if authenticated
}