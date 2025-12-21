import React from "react";
import { loginauthentication } from "../Api/Api";
import { useCart } from "../Context/Context";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const {isloggedin,setloggedin,user,setUser}=useCart();
  const navigate=useNavigate();
  async function handleLogin(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const logindata = await loginauthentication(data);
    console.log("Login success:", logindata.data.user.name);
     setloggedin(true);
     setUser(logindata.data.user.name);
     console.log(user);
    // Optionally save tokens
    localStorage.setItem("accessToken", logindata.data.accessToken);
    localStorage.setItem("refreshToken", logindata.data.refreshToken);
    navigate('/');
  } catch (error) {
    console.error("Login failed:", error.response?.data?.error || error.message);
    alert(error.response?.data?.error || "Login failed");
  }
}

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row lg:justify-center lg:items-center gap-8 px-4 w-full h-full">
          {/* Text Section */}
          <div className="text-center lg:text-left w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Welcome back! <br />
              Please enter your email and password to access your account.
            </p>
          </div>

          {/* Form Section */}
          <div className="card bg-base-100 w-full lg:w-1/2 max-w-md shadow-2xl flex flex-col justify-center">
            <div className="card-body">
              <h1 className="text-4xl font-bold text-center">Login</h1>
              <form action="" onSubmit={handleLogin}>
                <fieldset className="fieldset flex flex-col gap-4">
                  <label className="label text-[18px] text-black">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input input-bordered w-full"
                    placeholder="Email"
                  />
                  <label className="label text-[18px] text-black">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="input input-bordered w-full"
                    placeholder="Password"
                  />
                  <div className="text-right">
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button
                    className="btn btn-neutral mt-4 w-full bg-green-800"
                    on
                  >
                    Login
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
