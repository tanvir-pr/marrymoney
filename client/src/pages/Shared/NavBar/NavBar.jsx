import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaBars, FaUserCircle, FaHome, FaInfoCircle, FaEnvelope, FaUserCog } from "react-icons/fa";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <Link to="/" className="flex items-center gap-2 hover:text-yellow-400">
          <FaHome />
          Home
        </Link>
      </li>
      <li>
        <Link to="/biodatas" className="flex items-center gap-2 hover:text-yellow-400">
          <FaUserCircle />
          Biodata
        </Link>
      </li>
      <li>
        <Link to="/aboutus" className="flex items-center gap-2 hover:text-yellow-400">
          <FaInfoCircle />
          About Us
        </Link>
      </li>
      <li>
        <Link to="/contactus" className="flex items-center gap-2 hover:text-yellow-400">
          <FaEnvelope />
          Contact Us
        </Link>
      </li>
      {user && isAdmin && (
        <li>
          <Link to="/dashboard/adminHome" className="flex items-center gap-2 hover:text-yellow-400">
            <FaUserCog />
            Admin Dashboard
          </Link>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <Link to="/dashboard/userHome" className="flex items-center gap-2 hover:text-yellow-400">
            <FaUserCog />
            User Dashboard
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-black fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="navbar container mx-auto px-4 text-white flex justify-between">
        
        {/* Left Side: Logo & Name */}
        <div className="flex items-center gap-2">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img src="../../../../public/logo.png" alt="Logo" className="object-cover w-full h-full" />
          </div>
          <Link to="/" className="text-2xl font-bold">MitromoneY</Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-4">{navOptions}</ul>
        </div>

        {/* Right Side: Login/Logout */}
        <div className="flex items-center">
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn bg-red-500 text-white hover:bg-red-600"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-primary mx-2">
                Login
              </Link>
              <Link to="/register" className="btn bg-yellow-500 hover:bg-yellow-600 text-black">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
