import React, { useState } from "react";
import authServiceInstance from "../../appwrite/authservice";
import { login } from "../../slices/authslice.js";
import Input from "../input&btncomponent.jsx/input";
import Button from "../input&btncomponent.jsx/button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Logo from "../logo/logo.jsx";
import { Link, useNavigate } from "react-router-dom";
function Signup() {
  const [loading,setloading]=useState(false)
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function signup(data) {
    setloading(true)
    try {
      const sessiondata = await authServiceInstance.createAccount(data);
      if (sessiondata) {
        const userData = await authServiceInstance.getCurrentUser();
        dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
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
      <img src="/carto.jpg" className="hidden sm:inline-block h-80 w-80 rounded-full" alt="" />
      <div className="bg-white/80 p-6 shadow-lg rounded-lg w-96   mx-3">
        <div className="mb-2 flex justify-center">
          <span className="flex justify-center items-center w-full  max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/signin"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        <form onSubmit={handleSubmit(signup)}>
          <Input
            label="Name"
            type="text"
            placeholder="Enter Your Name"
            classNameInput="outline-none"
            {...register("name", {
              required: "Name cannot be Empty",
            })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
            <Button text="sign up" type="submit" className="w-full" />
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
