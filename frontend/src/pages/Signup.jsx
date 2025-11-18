import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Signup() {
  let navigate = useNavigate();
  let { serverUrl } = useContext(AuthDataContext);

  // let [show, setShow] = useState(false);
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      let result = await axios.post(
        serverUrl + "/api/auth/signup",
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      navigate("/login");
      toast.success("Account created successfully! Please login.");
      console.log(result.data);
    } catch (error) {
      console.log("Signup error:", error);
      toast.error("Signup failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex">
      {/*left panel (image)*/}
      <div
        className="hidden md:block w-[48%] h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('./assets/signup.jpg')" }}
      ></div>

      {/*right panel*/}
      <div className="w-full md:w-[52%] flex  flex-col items-center justify-start px-6 md:px-16 pt-20">
        <h1 className="font-meow  text-[#9c0235] text-[45px] font-bold mb-10 mt-10 text-center w-full">
          StudyFlow
        </h1>
        <form
          action=""
          className="max-w-[400px] w-full flex flex-col items-center justify-center md:items-start gap-[10px] shadow-md p-6 rounded-xl bg-white"
          onSubmit={handleSignUp}
        >
          <h1 className="font-sans text-[25px] text-center  w-full  text-[#022a66] font-semibold ">
            Create an account
          </h1>

          <div className="w-full flex items-start justify-start flex-col gap-[10px] mt-[30px]">
            <label htmlFor="name" className="text-[20px] text-[#08568a]">
              Username
            </label>
            <input
              type="text"
              id="name"
              className="w-full h-[40px] border-[2px] border-[#91b6b6] rounded-lg text-[17px] px-[20px] bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#9ac7d6]"
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="w-full flex items-start justify-start flex-col gap-[10px] ">
            <label htmlFor="email" className="text-[20px] text-[#08568a]">
              Email
            </label>
            <input
              type="text"
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
              type=" password"
              id="password"
              className="w-full  h-[40px] border-[2px] border-[#91b6b6] rounded-lg text-[17px] px-[20px] bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#9ac7d6]"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            className="px-8 py-2 bg-[#0a2b47] rounded-lg text-white text-[17px] cursor-pointer mt-6 mx-auto hover:bg-[#13204b] transition duration-300"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <p className="text-[#9c0235] text-center w-full">
            Already have an account?{" "}
            <span
              className="cursor-pointer underline "
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
