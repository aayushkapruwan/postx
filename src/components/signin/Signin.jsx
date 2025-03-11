import React, { useState } from "react";
import Input from "../input&btncomponent.jsx/input";
import Button from "../input&btncomponent.jsx/button";
import authServiceInstance from "../../appwrite/authservice";
import { useForm } from "react-hook-form";
import Logo from "../logo/logo";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../slices/authslice";
import { useDispatch } from "react-redux";
function Signin() {
    const [loading,setloading]=useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, seterror] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function signin(userData) {
    setloading(true)
    seterror("");
    try {
      const sessiondata = await authServiceInstance.accountLogin(userData);
      if (sessiondata) {
        const userData = await authServiceInstance.getCurrentUser();
        dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      seterror(error);
    }
  }
  if(loading===true){
    return <p className="text-center text-gray-500">Loading...</p>;
  }
  return (
    <div
      className="flex justify-center md:justify-between md:w-3xl mx-auto items-center  "
      style={{ height: "calc(100vh - 8.5rem)" }}
    >
      <img
        src="/carto.jpg"
        className="hidden sm:inline-block h-80 w-80 rounded-full"
        alt=""
      />
      <div className="bg-white/80 p-6 shadow-lg rounded-lg w-96  mx-5 ">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signin)}>
          {/* <Input label="Name" type="text" placeholder="Enter Your Name" classNameInput="outline-none" /> */}
          <Input
            label="Email"
            type="email"
            placeholder="Enter Your EMail"
            classNameInput="outline-none"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <Input
            label="password"
            type="password"
            placeholder="Enter Your Password"
            classNameInput="outline-none"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must include uppercase, lowercase, number, and special character",
              },
            })}
          />
          <div className="mt-2">
            <Button text="sign in" type="submit" className="w-full" />
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signin;
