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
      {user ? (
        <>
          <button
            onClick={handleLogOut}
            className="btn btn-ghost bg-red-500 text-white hover:bg-red-600"
          >
            Log Out
          </button>
        </>
      ) : (
        <li>
          <Link to="/login" className="btn btn-outline btn-primary">
            Login
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-opacity-90 bg-black text-white shadow-lg">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Dropdown for Mobile */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <FaBars className="h-6 w-6" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
          >
            {navOptions}
          </ul>
        </div>
        <div className="flex  justify-start">
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
         MitromoneY
          </Link>
          <div className="h-12 w-12 rounded-3xl">
            <img src="../../../../public/logo.png" alt="" />
          </div>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {!user && (
          <Link
            to="/register"
            className="btn bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
