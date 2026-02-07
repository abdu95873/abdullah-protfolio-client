import React from "react";
import profileImg from "../../../assets/abdullah2.png";

const About = () => {
  return (
    <section className="w-full py-24 px-6 bg-white">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center">
        
        {/* LEFT: Profile Image + Experience Badge */}
        <div className="w-full lg:w-1/2 relative flex justify-center mb-12 lg:mb-0">
          <img
            src={profileImg}
            alt="Abdullah"
            className=" h-fit object-cover"
          />
          {/* Experience Badge */}
          {/* <div className="absolute bottom-4 right-0 bg-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-md">
            <span className="text-gray-400 text-xs text-center">Years of</span>
            <span className="text-blue-600 text-xl font-bold">4</span>
            <span className="text-gray-400 text-xs text-center">Experience</span>
          </div> */}
        </div>

        {/* RIGHT: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 px-4 lg:px-12">
          <span className="text-orange-600 font-semibold mb-2">ABOUT ME</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Web Developer</h2>
          
          <p className="text-gray-600 leading-relaxed">
            I'm a passionate Web Developer, and I am incredibly committed to my work. 
            Over the course of my career, I have gained the required skills and knowledge to help you with your projects.
          </p>

          <p className="text-gray-600 leading-relaxed">
            I am focused on React technologies which bring a lot of benefits to my clients:
          </p>

          {/* Benefits List */}
          <ul className="space-y-1 text-gray-600">
            <li>👍 Technology is supported by Facebook.</li>
            <li>👍 A lot of third-party plugins and components.</li>
            <li>👍 Very good performance compared to other cross-platform frameworks.</li>
          </ul>

          {/* Signature */}
          <div className="mt-4 text-indigo-900 font-handwriting text-xl">
            Abdullah
          </div>

          {/* Download CV Button */}
          <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition w-max">
            Download CV
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
