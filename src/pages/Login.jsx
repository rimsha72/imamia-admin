import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import toast, { Toaster } from "react-hot-toast";

export default function Login({ setAuthenticated }) {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log("Logged in user:", user);
      console.log("User UID:", user.uid);
      console.log("User Email:", user.email);

      setAuthenticated(true);

      toast.success("Login successfully");

      navigate("/");
    } catch (error) {
      console.error("Firebase login error:", error);

      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Wrong email or password.");
          break;

        case "auth/user-not-found":
          toast.error("No account found with this email.");
          break;

        case "auth/wrong-password":
          toast.error("Wrong password.");
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
        <div className="w-full lg:w-1/2 lg:block hidden">
          <img
            alt=""
            src="https://res.cloudinary.com/dac5ioh9a/image/upload/v1786100809/055_-_2024_vis0uu.jpg"
            className="h-screen p-6"
          />
        </div>

        {/* Login Form */}
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="bg-white backdrop-blur-md rounded-lg max-w-screen-sm mx-auto py-8 px-4">
            <div className="mx-auto max-w-lg flex justify-center flex-col">
              <h1 className="text-2xl font-paytone">
                Imamia Kultur Zentrum Admin{" "}
                <span className="text-red-110">
                  Login
                </span>
              </h1>

              <p className="text-red-120 mt-4 font-medium">
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
                  className="w-full rounded-lg border border-red-220 mt-2 p-4 pe-12 text-sm shadow-sm outline-none"
                  placeholder="Email"
                />
              </div>

              {/* Password */}
              <div>
                <input
                  ref={passwordRef}
                  type="password"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-red-220 p-4 pe-12 mt-2 text-sm shadow-sm outline-none"
                  placeholder="Password"
                />
              </div>

            
              {/* Login Button */}
              <div className="flex items-center justify-end pt-4">
                <button
                  type="submit"
                  className="inline-block rounded-lg bg-red-110 w-full px-6 py-4 font-medium text-white"
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