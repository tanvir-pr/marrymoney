import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";
import BackgroundEffect from "../components/BackgroundEffect";


const Main = () => {
    const location = useLocation();
    
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');

    return (
        <div className="relative bg-rose-400">
           <BackgroundEffect></BackgroundEffect>
            <div className="relative">
           
            {noHeaderFooter || <NavBar></NavBar>}
           
                <Outlet>
                
                </Outlet>
               
                {noHeaderFooter || <Footer></Footer>}
                
        </div>
       </div>
    );
};

export default Main;