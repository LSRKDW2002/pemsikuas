import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch action logout
    navigate("/login"); // Arahkan ke halaman login setelah logout
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg py-4 px-6 flex justify-between items-center">
      <h1 className="text-3xl font-extrabold tracking-wide text-blue-400">
        <Link to="/dashboard">DroughtApp</Link>
      </h1>
      <div className="space-x-6">
      <Link to="/home" className="hover:text-blue-500 transition">
          Home
        </Link>
        <Link to="/dashboard" className="hover:text-blue-500 transition">
          Dashboard
        </Link>
        <Link to="/crud" className="hover:text-blue-500 transition">
          Tambah Data
        </Link>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;