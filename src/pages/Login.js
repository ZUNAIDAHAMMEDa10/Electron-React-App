import React, { useState } from "react";
import loginImg from "../assets/images/hotel_img_2.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [done, setDone] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState("password");

  const signin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const togglePasswordVisibility = () => {
    // Toggle password visibility state
    setPasswordVisibility(
      passwordVisibility === "password" ? "text" : "password"
    );
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[25%] left-[10%] flex flex-col">
          <h1 className="text-3xl text-white font-extrabold my-4">
            Hospitality is making your guests feel like they are at home, even
            if you wish they were.
          </h1>
          <p className="text-base text-white font-normal">
            This is where you can start a new story
          </p>
        </div>
        <img src={loginImg} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between">
        <h1 className="text-xl text-[#060606] font-semibold">
          Do your work today
        </h1>
        <div className="w-full flex flex-col max-w-[560px]">
          <div className="w-full flex flex-col mb-5">
            <h3 className="text-3xl font-semibold mb-2">Login</h3>
            <p className="text-base mb-2">Welcome!Please enter your details.</p>
          </div>
          <form onSubmit={signin}>
            <div className="w-full flex flex-col">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full text-black border-b py-2 bg-transparent my-2 border-black outline-none focus:outline-none"
              />
              <div className="flex items-center">
                <input
                  type={passwordVisibility}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-black border-b py-2 bg-transparent my-2 border-black outline-none focus:outline-none"
                />
                <div
                  className="border-b py-2.5 border-black"
                  onClick={() => setDone(!done)}
                >
                  {done ? (
                    <AiFillEye
                      onClick={togglePasswordVisibility}
                      className="cursor-pointer "
                      size={20}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={togglePasswordVisibility}
                      className="cursor-pointer"
                      size={20}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <p className="text-sm">Remember me</p>
              </div>
              <p className="text-sm whitespace-nowrap font-medium cursor-pointer underline underline-offset-2">
                Forget Password
              </p>
            </div>
            <div className="w-full flex flex-col my-4">
              <button
                type="submit"
                className="w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-semibold text-[#060606]">
            Make your to do list
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
