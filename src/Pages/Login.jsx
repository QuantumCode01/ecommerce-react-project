import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Context";
import { loginauthentication, signupAuthentication } from "../Api/Api";

export default function Login() {
  const { isloggedin, setloggedin, user, setUser } = useCart();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  // LOGIN
  async function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const logindata = await loginauthentication(data);

      setloggedin(true);
      setUser(logindata.data.user.name);

      localStorage.setItem("accessToken", logindata.data.accessToken);
      localStorage.setItem("refreshToken", logindata.data.refreshToken);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  }

  // SIGNUP
 async function handleSignup(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    await signupAuthentication(data);

    alert("Signup successful! Please login.");
    setIsLogin(true); // switch to login tab
  } catch (error) {
    alert(error.response?.data?.error || "Signup failed");
  }
}


  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row gap-8 w-full">

        {/* TEXT SECTION */}
        <div className="text-center lg:text-left w-full lg:w-1/2">
          <h1 className="text-5xl font-bold">
            {isLogin ? "Login now!" : "Create account!"}
          </h1>
          <p className="py-6">
            {isLogin
              ? "Welcome back! Please enter your email and password."
              : "Join us today and create your account."}
          </p>
        </div>

        {/* FORM SECTION */}
        <div className="card bg-base-100 w-full lg:w-1/2 max-w-md shadow-2xl">
          <div className="card-body">

            {/* TOGGLE BUTTONS */}
            <div className="flex justify-center gap-6 mb-4">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`font-bold ${
                  isLogin ? "border-b-2 border-green-800 w-[150px]" : ""
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`font-bold ${
                  !isLogin ? "border-b-2 border-green-800 w-[150px]" : ""
                }`}
              >
                Signup
              </button>
            </div>

            {/* <h2 className="text-3xl font-bold text-center mb-4">
              {isLogin ? "Login" : "Signup"}
            </h2> */}

            {/* LOGIN FORM */}
            {isLogin ? (
              <form onSubmit={handleLogin}>
                <fieldset className="flex flex-col gap-4">

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    required
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    required
                  />

                    <div className="text-right">
                      <button
                        type="button"
                        className="text-xsm text-green-800 hover:underline"
                        onClick={() => navigate("/forgot-password")}>
                        Forgot password?
                      </button>
                    </div>

                  <button className="btn bg-green-800 text-white w-full">
                    Login
                  </button>
                </fieldset>
              </form>
            ) : (
              /* SIGNUP FORM */
              <form onSubmit={handleSignup}>
                <fieldset className="flex flex-col gap-4">

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="input input-bordered w-full"
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    required
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    required
                  />

                  <button className="btn bg-green-800 text-white w-full">
                    Signup
                  </button>
                </fieldset>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
