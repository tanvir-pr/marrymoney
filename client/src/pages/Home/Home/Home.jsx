import { Helmet } from "react-helmet-async";
import PremiumProfiles from "../../PremiumProfiles";
import HowItWorks from "../../HowItWorks";
import SuccessStoriesSection from "../../SuccessStoriesSection";
import SuccessCounterSection from "../../SuccessCounterSection";
import Banner from "../Banner/Banner";
// import Category from "../Category/Category";
// import Featured from "../Featured/Featured";

// import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title> Mittromoney | Home</title>
            </Helmet>
            <Banner></Banner>
            {/* <Category></Category> */}
            <PremiumProfiles></PremiumProfiles>
            <HowItWorks></HowItWorks>
            <SuccessCounterSection></SuccessCounterSection>
            <SuccessStoriesSection></SuccessStoriesSection>
           
            {/* <Featured></Featured> */}
            {/* <Testimonials></Testimonials> */}
        </div>
    );
};

export default Home;