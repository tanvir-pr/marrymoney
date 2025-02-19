import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((error) => console.log(error));
    };

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();

    return (
        <div className="flex pt-10">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen text-stone-100 bg-black">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/pichart">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageUser">
                                    <FaUtensils></FaUtensils>
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/approvedPremium">
                                    <FaUtensils></FaUtensils>
                                    Approve Premium</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/contactRequest">
                                    <FaUtensils></FaUtensils>
                                    Approve ConTact Request</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/successStoryTable">
                                    <FaUtensils></FaUtensils>
                                    Success Story Table</NavLink>
                            </li>
                            <li>
                                
                                    <button
                                        onClick={handleLogOut}
                                    // className="btn btn-ghost bg-red-500 text-white hover:bg-red-600"
                                    >
                                        Log Out
                                    </button>
                               
                            </li>





                        </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/editdata">
                                        <FaCalendar></FaCalendar>
                                        Edit BioData</NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/biodataview">
                                        <FaAd></FaAd>
                                        Biodata view</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/requestpage">
                                        <FaAd></FaAd>
                                        My Contact Request</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/favoritesBiodata">
                                        <FaAd></FaAd>
                                        Favorites Biodata</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/gotMarriedForm">
                                        <FaUtensils></FaUtensils>
                                        Got Married Form</NavLink>
                                </li>
                                <li>
                                
                                    <button
                                        onClick={handleLogOut}
                                    // className="btn btn-ghost bg-red-500 text-white hover:bg-red-600"
                                    >
                                        Log Out
                                    </button>
                               
                            </li>

                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>

                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8 bg-rose-500">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;