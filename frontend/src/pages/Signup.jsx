import React from "react";

function Signup() {
  return (
    <div className="w-screen h-screen flex">
      {/*left panel (image)*/}
      <div
        className="w-[48%] h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('./assets/signup.jpg')" }}
      ></div>

{/* text-[#022a66] */}
      {/*right panel*/}
      <div className="w-[52%] flex  flex-col items-center justify-start px-16 pt-20">
        <h1 className="font-meow  text-[#9c0235] text-[45px] font-bold mb-10 mt-10 text-center w-full">
          StudyFlow
        </h1>
        <form
          action=""
          className="max-w-[400px] w-full flex flex-col items-center justify-center md:items-start gap-[10px] shadow-md p-6 rounded-xl bg-white
"
        >
          <h1 className="font-sans text-[25px] text-center w-full text-[#022a66] font-semibold ">
            Create an account
          </h1>

          <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]">
            <label htmlFor="name" className="text-[20px] text-[#08568a]">
              Username
            </label>
            <input
              type="text"
              id="name"
              className="w-[90%] h-[40px] border-[2px] border-[#91b6b6] rounded-lg text-[17px] px-[20px] bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
          </div>
          <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
            <label htmlFor="email" className="text-[20px] text-[#08568a]">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-[90%] h-[40px] border-[2px] border-[#91b6b6]   rounded-lg text-[17px] px-[20px] bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
          </div>
          <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] relative">
            <label htmlFor="password" className="text-[20px] text-[#08568a]">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-[90%] h-[40px] border-[2px] border-[#91b6b6] rounded-lg text-[17px] px-[20px] bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
          </div>
          <button className="px-8 py-2 bg-[#0a2b47] rounded-lg text-white text-[17px] cursor-pointer mt-6 mx-auto hover:bg-[#13204b] transition duration-300">
            Sign Up
          </button>
          <p className="text-[#9c0235] text-center w-full">
            Already have an account?{" "}
            <span className="cursor-pointer underline ">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
