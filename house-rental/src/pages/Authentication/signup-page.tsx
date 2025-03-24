import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/state-managment/slices/user-slice";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../state-managment/store";
export default function SignUpPage() {
  // function to handle the sigbn up
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { signUpSuccess, isSignUpLoading, signUpError } = useSelector(
    (state: RootState) => state.user
  );

  function handleSubit() {
    if (!firstName || !lastName || !userName || !password || !confirmPassword) {
      toast.error("Please fill all the fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password do not match!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      dispatch(
        registerUser({
          username: userName,
          password: password,
          fullName: firstName + " " + lastName,
        })
      );
    }
  }

  // Navigate to login page on successful registration
  useEffect(() => {
    if (signUpSuccess) {
      toast.success(signUpSuccess, {
        position: "top-right",
        autoClose: 3000,
      });
      // Navigate to login page after a delay
      const timer = setTimeout(() => navigate("/"), 1000);
      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }

    // if error find tost it
    if (signUpError) {
      toast.error(signUpError, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [signUpSuccess, navigate, signUpError]);
  return (
    <div className="scrollbar-hidden  min-h-screen w-screen flex items-center justify-center bg-white px-6 overflow-x-hidden mx-auto">
      {/* Place ToastContainer at the top level of the component */}
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto h-[70%]">
        <div className="grid lg:grid-cols-2">
          {/* Image Section */}
          <div className="hidden lg:block relative">
            <img
              src="/register.jpeg" // Replace with your image path
              alt="Sign Up Illustration"
              className="w-full h-full object-cover"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-70"></div> */}
            <div className="absolute inset-0 flex items-end p-8">
              <h2 className="text-primary text-3xl font-bold">
                Join Us Today!
              </h2>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 lg:p-12">
            {/* Title and Description */}
            <p className="text-md md:text-xl font-bold text-gray-800 mb-2">
              Create Your Account
            </p>
            <p className="text-gray-600 text-sm mb-6">
              Start your journey with us by filling out the form below.
            </p>

            {/* Form Fields */}
            <form className="space-y-5 text-secondary">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label
                    htmlFor="firstName"
                    className="text-secondary text-sm font-medium mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="lastName"
                    className="text-secondary text-sm font-medium mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-secondary text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="example@mail.com"
                />
              </div>

              {/* Password Fields */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="text-secondary text-sm font-medium mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="confirmPassword"
                    className="text-secondary text-sm font-medium mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <div
                  onClick={handleSubit}
                  className="cursor-pointer w-max bg-primary text-white py-2 px-6 rounded-md  transition-all transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {isSignUpLoading ? "Lading.." : "Sign Up"}
                </div>
              </div>

              {/* Additional Links */}
              <div className="text-center mt-4">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Log In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
