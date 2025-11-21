import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

function Login() {
  let navigate = useNavigate();
  let { serverUrl } = useContext(AuthDataContext);

  let [show, setShow] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      let result = await axios.post(serverUrl + "/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      navigate("/dashboard");
      toast.success("Logged In successfully!");
    } catch (error) {
      console.log("Login error:", error);
      toast.error("Login failed. Invalid credentials!");
    }
  };

  return (
    <div className="w-screen h-screen flex">
      {/*left panel (image)*/}
      <div
        className="hidden md:block w-[48%] h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('./assets/signup.jpg')" }}
      ></div>

      {/*right panel*/}
      <div className="w-full md:w-[52%] flex  flex-col items-center justify-start px-6 md:px-16 pt-12">
        <h1 className="font-meow  text-[#9c0235] text-[45px] font-bold mb-10 mt-10 text-center w-full">
          StudyFlow
        </h1>
        <form
          action=""
          className="max-w-[400px] w-full flex flex-col items-center justify-center md:items-start gap-[10px] shadow-md p-6 rounded-xl bg-white"
          onSubmit={handleLogin}
        >
          <h1 className="font-sans text-[25px] text-center  w-full  text-[#022a66] font-semibold ">
            Login
          </h1>
          <div className="w-full flex items-start justify-start flex-col gap-[10px] ">
            <label htmlFor="email" className="text-[20px] text-[#08568a]">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full h-[40px] border-[2px] border-[#91b6b6]   rounded-lg text-[17px] px-[20px] bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#9ac7d6]"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="w-full flex items-start justify-start flex-col gap-[10px] relative">
            <label htmlFor="password" className="text-[20px] text-[#08568a]">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              id="password"
              className="w-full  h-[40px] border-[2px] border-[#91b6b6] rounded-lg text-[17px] px-[20px] bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#9ac7d6]"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!show && (
              <IoMdEye
                className="w-[22px] h-[22px] absolute right-3 bottom-[10px] cursor-pointer text-[#08568a]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            {show && (
              <IoMdEyeOff
                className="w-[22px] h-[22px] absolute right-3 bottom-[10px] cursor-pointer text-[#08568a]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          <button
            className="px-8 py-2 bg-[#0a2b47] rounded-lg text-white text-[17px] cursor-pointer mt-6 mx-auto hover:bg-[#13204b] transition duration-300"
            type="submit"
          >
            Login
          </button>
          <p className="text-[#9c0235] text-center w-full">
            Don't have an account?{" "}
            <span
              className="cursor-pointer underline "
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
