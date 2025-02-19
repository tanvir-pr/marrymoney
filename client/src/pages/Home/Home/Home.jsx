import { Helmet } from "react-helmet-async";
import PremiumProfiles from "../../PremiumProfiles";
import HowItWorks from "../../HowItWorks";
import SuccessStoriesSection from "../../SuccessStoriesSection";
import SuccessCounterSection from "../../SuccessCounterSection";
import Banner from "../Banner/Banner";
import WhyJoin from "./WhyJoin";
import AboutMatrimony from "./AboutMatrimony";
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
            <AboutMatrimony></AboutMatrimony>
            <HowItWorks></HowItWorks>
            <SuccessCounterSection></SuccessCounterSection>
            <SuccessStoriesSection></SuccessStoriesSection>
            <WhyJoin></WhyJoin>
           
            {/* <Featured></Featured> */}
            {/* <Testimonial></Testimonial> */}
        </div>
    );
};

export default Home;