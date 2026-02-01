import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../Api/Api"; // your API function
import Messagemodel from "../Components/Messagemodel";

export default function Resetpassword() {
  const { token } = useParams(); // get token from URL
  const navigate = useNavigate();
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert,setShowAlert]=useState(false);
  

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // call API
      await resetPassword(token, { newPassword });

      setShowAlert(true);
      navigate("/login"); // redirect to login
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row gap-8 w-full">

        {/* Text Section */}
        <div className="text-center lg:text-left w-full lg:w-1/2">
          <h1 className="text-5xl font-bold">Reset Password</h1>
          <p className="py-6">
            Enter your new password below to reset your account password.
          </p>
        </div>

        {/* Form Section */}
        <div className="card bg-base-100 w-full lg:w-1/2 max-w-md shadow-2xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-4">
              New Password
            </h2>

            <form onSubmit={handleReset} className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                className="input input-bordered w-full"
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered w-full"
                required
              />

              <button
                type="submit"
                className="btn bg-green-800 text-white w-full"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>


    <Messagemodel show={showAlert}
        title="Password Reset Successfully"/>
    </>
  );
}
