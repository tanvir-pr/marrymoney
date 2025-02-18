import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

import Dashboard from "../Layout/Dashboard";

import AdminRoute from "./AdminRoute";

import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import BiodatasPage from "../pages/BiodatasPage";
import BiodataDetailsPage from "../pages/BiodataDetailsPage";
import EditBiodata from "../pages/Dashboard/EditBiodata";
import BiodataView from "../pages/Dashboard/BiodataView";
import MyContactRequests from "../pages/Dashboard/MyContactRequests";

import ManageUsers from "../pages/Dashboard/ManageUsers";
import ApprovedPremium from "../pages/Dashboard/ApprovedPremium";
import FavoriteBiodata from "../pages/Dashboard/FavoriteBiodata";
import CheckoutPage from "../pages/CheckoutPage";
import ApprovedContactRequest from "../pages/Dashboard/ApprovedContactRequest";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import GotMarriedForm from "../pages/GotMarriedForm";
import SuccessStoryTable from "../pages/Dashboard/SuccessStoryTable";
import PieChart from "../pages/Dashboard/PieChart ";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
     
      {
        path: 'biodatas',
        element: <BiodatasPage></BiodatasPage>
      },
      {
        path: 'biodataDetailsPage/:biodataId',
        element: <BiodataDetailsPage></BiodataDetailsPage>
      },
      {
        path: 'checkout/:biodataId',
        element: <CheckoutPage></CheckoutPage>
      },
      {
        path: 'aboutus',
        element: <AboutUs></AboutUs>
      },
      {
        path: 'contactus',
        element: <ContactUs></ContactUs>
      },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // normal user routes
      {
        path: 'userHome',
        element: <UserHome></UserHome>
      },
      {
        path: 'editdata',
        element: <EditBiodata></EditBiodata>
      },
      {
        path: 'biodataview',
        element: <BiodataView></BiodataView>
      },
      {
        path: 'requestpage',
        element: <MyContactRequests></MyContactRequests>
      },
      {
        path: 'favoritesBiodata',
        element: <FavoriteBiodata></FavoriteBiodata>
      },
      {
        path: 'gotMarriedForm',
        element: <GotMarriedForm></GotMarriedForm>
      },
     

      // admin only routes
      {
        path: 'adminHome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'pichart',
        element: <AdminRoute><PieChart></PieChart></AdminRoute>
      },
      {
        path: 'manageUser',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'approvedPremium',
        element: <AdminRoute><ApprovedPremium></ApprovedPremium></AdminRoute>
      },
      {
        path: 'contactRequest',
        element: <AdminRoute><ApprovedContactRequest></ApprovedContactRequest></AdminRoute>
      },
      {
        path: 'successStoryTable',
        element: <AdminRoute><SuccessStoryTable></SuccessStoryTable></AdminRoute>
      },
     
     
  

    ]
  }
]);