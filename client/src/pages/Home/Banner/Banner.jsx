import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={3000}>
      <div>
        <img src="/mary11.png" alt="Matchmaking Banner 1" />
        <p className="legend text-lg font-bold">Find Your Perfect Match</p>
      </div>
      <div>
        <img src="/marry2.png" alt="Matchmaking Banner 2" />
        <p className="legend text-lg font-bold">Join Thousands of Happy Members</p>
      </div>
      <div>
        <img src="/mary3.png" alt="Matchmaking Banner 3" />
        <p className="legend text-lg font-bold">Premium Profiles with Verified Details</p>
      </div>
      <div>
        <img src="/mary4.png" alt="Matchmaking Banner 4" />
        <p className="legend text-lg font-bold">Safe and Secure Platform for Everyone</p>
      </div>
      <div>
        <img src="/mary11.png" alt="Matchmaking Banner 5" />
        <p className="legend text-lg font-bold">Your Happiness, Our Mission</p>
      </div>
      <div>
        <img src="/marry2.png" alt="Matchmaking Banner 6" />
        <p className="legend text-lg font-bold">Start Your Journey with Us Today</p>
      </div>
    </Carousel>
  );
};

export default Banner;
