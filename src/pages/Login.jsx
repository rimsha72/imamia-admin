import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Login successfully");

      navigate("/");
    } catch (error) {
      console.error("Firebase login error:", error);

      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          toast.error("Wrong email or password.");
          break;

        case "auth/invalid-email":
          toast.error("Please enter a valid email address.");
          break;

        case "auth/user-disabled":
          toast.error("This account has been disabled.");
          break;

        case "auth/too-many-requests":
          toast.error(
            "Too many login attempts. Please try again later."
          );
          break;

        default:
          toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen">
      <Toaster position="top-center" />

      <div className="relative flex flex-wrap lg:items-center">
        {/* Background Image */}
        <div className="hidden w-full lg:block lg:w-1/2">
          <img
            src="https://res.cloudinary.com/dac5ioh9a/image/upload/v1786100809/055_-_2024_vis0uu.jpg"
            alt="Imamia Kultur Zentrum"
            className="h-screen w-full object-cover p-6"
          />
        </div>

        {/* Login Form */}
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-screen-sm rounded-lg bg-white px-4 py-8 backdrop-blur-md">
            
            <div className="mx-auto flex max-w-lg flex-col justify-center">
              <h1 className="text-2xl font-paytone">
                Imamia Kultur Zentrum{" "}
                <span className="text-red-110">
                  Admin Login
                </span>
              </h1>

              <p className="mt-4 font-medium text-red-120">
                Please Enter your login Details
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mb-0 mt-8 max-w-lg space-y-6"
            >
              {/* Email */}
              <div>
                <input
                  type="email"
                  ref={emailRef}
                  autoComplete="email"
                  placeholder="Email"
                  className="mt-2 w-full rounded-lg border border-red-220 p-4 pe-12 text-sm shadow-sm outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  ref={passwordRef}
                  autoComplete="current-password"
                  placeholder="Password"
                  className="mt-2 w-full rounded-lg border border-red-220 p-4 pe-12 text-sm shadow-sm outline-none"
                />
              </div>

              {/* Login Button */}
              <div className="flex items-center justify-end pt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-red-110 px-6 py-4 font-medium text-white"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}