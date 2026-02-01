import React from 'react'
import { useNavigate } from "react-router-dom";
import { forgetpassword } from '../Api/Api';
import Messagemodel from "../Components/Messagemodel";
import { useState } from 'react';
export default function Forgotpassword() {
  const navigate = useNavigate();
    const [showAlert,setShowAlert]=useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

     try {
         await forgetpassword(data);
          setShowAlert(true);

        } catch (error) {
          alert(error.response?.data?.error || "Something went wrong");
        }

       e.target.reset();
  };

  return (
    <>
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row gap-8 w-full">

        {/* TEXT SECTION */}
        <div className="text-center lg:text-left w-full lg:w-1/2">
          <h1 className="text-5xl font-bold">Forgot Password</h1>
          <p className="py-6">
            Enter your email address and we’ll send you a link to reset your
            password.
          </p>
        </div>

        {/* FORM SECTION */}
        <div className="card bg-base-100 w-full lg:w-1/2 max-w-md shadow-2xl">
          <div className="card-body">

            <h2 className="text-3xl font-bold text-center mb-4">
              Reset Password
            </h2>

            <form onSubmit={handleForgotPassword}>
              <fieldset className="flex flex-col gap-4">

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  required
                />

                <button className="btn bg-green-800 text-white w-full">
                  Send Reset Link
                </button>
              </fieldset>
            </form>

            {/* Back to login */}
            <div className="text-center mt-4">
              <button
                type="button"
                className="text-sm text-green-800 hover:underline"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Messagemodel show={showAlert}
            title="Password Reset Link has been send to your mail"/>
     </>
  );
}
