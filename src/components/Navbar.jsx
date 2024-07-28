// src/components/Navbar.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-xl font-bold text-gray-800">
              MyApp
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-800 hover:text-gray-600">
              Home
            </Link>
            {user && (
              <Link
                to="/usermanagement"
                className="text-gray-800 hover:text-gray-600"
              >
                User Management
              </Link>
            )}
            {user ? (
              <>
                <span className="text-gray-800">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
