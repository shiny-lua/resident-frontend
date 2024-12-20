import React from "react";

import Layout from "../../components/layout";
import { useGlobalContext } from "../../context";

const Home = () => {
  return (
    <Layout>
      <div className="flex justify-center mt-40">
        <div className="mx-auto px-4 max-w-[1700px]">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="">
              <div className="text-center font-albra text-[32px] font-normal leading-[45px] lg:text-left lg:text-4xl"><div>Unlock Your Interview Superpowers with AI, </div><div>Your AI-Powered Interview Copilot</div></div>
              <div className="flex items-center gap-8 mt-6 mb-5">
                <div className="text-sm md:text-xl font-normal md:font-[600] text-center lg:text-left">250K+ Offers Received</div>
                <div className="h-10 w-[2px] bg-light-gray"></div>
                <div className="text-sm md:text-xl font-normal md:font-[600] text-center lg:text-left">1.2M + Interviews Aced</div>
              </div>
              <div className="flex justify-center lg:justify-start">
                <button className="text-white rounded-md px-10 py-4 text-md bg-button">Activate AI Interview Mode Now</button>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div className="mt-8 w-[280px] text-center text-xs text-[#D4D4D4] lg:w-full lg:max-w-[438px] lg:text-left lg:text-sm">Interview Copilot<span className="relative top-[-3px]"></span> generating actionable guidance for interviews in real-time</div>
              </div>
            </div>
            <div className="-translate-y-10 lg:translate-y-0 relative">
              <img src="/image/video.png" className="max-w-full h-auto" alt="" />
              <img src="/image/text.png" className="absolute hidden md:block -top-20 left-0 max-w-full h-auto" alt="" />
            </div>
          </div>
        </div>
        <img className="absolute left-0 bottom-0 -z-10" src="/image/effort-1.png" alt="" />
        <img className="absolute right-0 top-0 -z-10" src="/image/effort-2.png" alt="" />
      </div>
    </Layout>
  );
};

export default Home;
