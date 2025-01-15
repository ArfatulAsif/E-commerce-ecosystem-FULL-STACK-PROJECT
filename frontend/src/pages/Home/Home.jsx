import Typewriter from "typewriter-effect";
import Lottie from "lottie-react";
import animationData from "../../assets/gaming-console-animation.json";
import PrimaryButton from "../../components/shared/PrimaryButton/PrimaryButton";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HomepageCard from "../../components/HomepageCard/HomepageCard";

import cardImageOne from "../../assets/card-image-1.webp";
import monitorImage from "../../assets/monitor.png";
import steeringWheelImage from "../../assets/steering-wheel.png";

const Home = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="grid grid-cols-2 gap-6 items-center">
        <div>
          <div className="text-6xl font-semibold tracking-wide flex flex-col gap-3 px-8 py-3">
            <h2>The Ultimate</h2>
            <h2 className="font-bold text-orange-600">
              <Typewriter
                options={{
                  loop: true,
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString('<span style="font-weight: 700;">Gaming</span>')
                    .callFunction(() => {
                      console.log("String typed out!");
                    })
                    .pauseFor(2500)
                    .deleteAll()
                    .callFunction(() => {
                      console.log("All strings were deleted");
                    })
                    .start();
                }}
              />
            </h2>
            <h2>Store</h2>
          </div>
          <div className="px-8 py-2">
            <Link to="/shop">
              <PrimaryButton
                title={"Start Shopping"}
                icon={<FaArrowRightLong />}
                classNames="px-6"
              />
            </Link>
          </div>
        </div>
        <div className="">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>

      {/* Cards */}
      <div className="px-8 py-3 grid grid-cols-3 gap-6">
        <HomepageCard
          color={"#FFE979"}
          img={cardImageOne}
          tagColor={"#E0BB00"}
          title={"You start as a beginner"}
          subTitle={"For Beginners"}
          tags={["Mouse", "Keyboard", "Joy Stick"]}
          link="/page-a"
        />
        <HomepageCard
          color={"#B7F598"}
          img={monitorImage}
          tagColor={"#65BA3B"}
          title={"Focus on being a pro"}
          subTitle={"For Intermediary"}
          tags={["PSP", "Xbox One", "Curve Display"]}
          link="/page-b"
        />
        <HomepageCard
          color={"#7ED5F0"}
          img={steeringWheelImage}
          tagColor={"#1698C0"}
          title={"Go above and beyond"}
          subTitle={"For Experts"}
          tags={["VR", "3D Effect", "Steering Wheel"]}
          link="/page-c"
        />
      </div>
    </div>
  );
};

export default Home;
