import React, { useContext, useState } from "react";
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import myContext from "../../../context/data/myContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { account } from "../../../appWrite/AppwriteConfig";
import Loader from "../../../components/loader/Loader";
import { Helmet } from "react-helmet";
import { ID } from 'appwrite';
import { motion } from "framer-motion";


export default function AdminAuth() {
  const context = useContext(myContext);
  const { mode } = context;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("")

  // const handleAuth = async (e) => {
  //   e.preventDefault();

  //   if (!email || !password) {
  //     return toast.error("Fill all required fields");
  //   }

  //   try {
  //     setLoading(true);

  //     if (isLogin) {
  //       // Login logic
  //       await account.createEmailPasswordSession(email, password);
  //       const user = await account.get()
  //       const isAdmin = email.toLowerCase() === "admin@gmail.com";
  //       localStorage.setItem("role", isAdmin ? "admin" :user.name);
  //       toast.success(`Welcome back , ${localStorage.getItem('role')}`)


  //       setTimeout(() => {
  //         setLoading(false);
  //         isAdmin ? navigate("/dashboard") : navigate("/");
  //       }, 1000);
  //     } else {
  //       // Signup logic
  //       await account.create(ID.unique(), email, password, name);
  //       toast.success("Signup Successful");

  //       setTimeout(() => {
  //         setLoading(false);
  //         setIsLogin(true);
  //       }, 1000);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     if (error.code === 401 || error.code === 409) {
  //       toast.error(isLogin ? "Invalid credentials" : "Email already registered");
  //     } else {
  //       toast.error(`${isLogin ? "Login" : "Signup"} Failed`);
  //     }
  //     console.error(`${isLogin ? "Login" : "Signup"} Error:`, error);
  //   }
  // };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Fill all required fields");
    }
    try {
      setLoading(true);

      if (isLogin) {
        // Login logic
        await account.createEmailPasswordSession(email, password);
        const user = await account.get();
        const isAdmin = email.toLowerCase() === "admin@gmail.com";
        localStorage.setItem("role", isAdmin ? "admin" : user.name);
        toast.success(`Welcome back, ${localStorage.getItem('role')}`);

        setTimeout(() => {
          setLoading(false);
          isAdmin ? navigate("/dashboard") : navigate("/");
        }, 1000);
      } else {
        // Signup logic
        await account.create(ID.unique(), email, password, name);
        toast.success("Signup Successful");

        setTimeout(() => {
          setLoading(false);
          setIsLogin(true);
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      if (error.code === 429) {
        // Rate limit error handling
        toast.error("Too many requests. Please wait for a few seconds and try again.");
      } else if (error.code === 401 || error.code === 409) {
        toast.error(isLogin ? "Invalid credentials" : "Email already registered");
      } else {
        toast.error(`${isLogin ? "Login" : "Signup"} Failed`);
      }
      console.error(`${isLogin ? "Login" : "Signup"} Error:`, error);
    }
  };

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Login" : "Signup"} - Voix</title>
      </Helmet>

      <div
        className={`min-h-screen flex ${mode === "dark" ? "bg-gray-900" : "bg-gray-200"
          }`}
      >
        <div
          className="hidden md:flex flex-col items-center justify-center w-1/3 bg-gradient-to-br from-blue-900  to-purple-600 text-white rounded-e-3xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <Typography
              className="text-9xl font-bold tracking-wide "
            >
              <div className="flex flex-col items-center cursor-default" style={{ textShadow: "-20px 0px 10px  black" }} >
                <span>V</span>
                <span>O</span>
                <span>I</span>
                <span>X</span>
              </div>

            </Typography>
          </motion.div>

        </div>

        {/* Authentication Component */}
        <div className="flex-1 flex flex-col items-center justify-center p-4" >
          <h1
            className={`font-extrabold text-3xl text-center mb-5 ${mode === "dark" ? "text-white" : "text-blue-gray-900"
              }`}
          >
            {isLogin ? "Welcome Back 🫡" : "Join Us 🚀"}
          </h1>

          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Form Container */}
            <div className="relative w-full">
              <div className="relative">
                {/* Sliding Forms Container */}
                <div className="flex transition-all duration-500 ease-in-out">
                  {/* Login Panel */}
                  <div
                    className={`w-full transition-all duration-500 ease-in-out transform ${isLogin ? "translate-x-0" : "-translate-x-full"
                      }`}
                  >
                    <form
                      onSubmit={handleAuth}
                      className="p-8 space-y-6 h-64 flex items-center justify-end flex-col focus:shadow-teal-300"
                    >
                      <Input
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        labelProps={{
                          className: "text-blue-gray-400",
                        }}
                      />
                      <Input
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        labelProps={{
                          className: "text-blue-gray-400",
                        }}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        disabled={isLoading}
                        className={
                          mode === "dark"
                            ? "bg-green-500 text-gray-900"
                            : "bg-gray-900 text-white"
                        }
                      >
                        Sign In
                      </Button>
                    </form>
                  </div>

                  {/* Signup Panel */}
                  <div
                    className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out transform ${!isLogin ? "translate-x-0" : "translate-x-full"
                      }`}
                  >
                    <form onSubmit={handleAuth} className="p-8 space-y-6">
                      <Input
                        type="text"
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        labelProps={{
                          className: "text-blue-gray-400",
                        }}
                      />
                      <Input
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        labelProps={{
                          className: "text-blue-gray-400",
                        }}
                      />
                      <Input
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        labelProps={{
                          className: "text-blue-gray-400",
                        }}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        className={
                          mode === "dark"
                            ? "bg-amber-400 text-gray-900"
                            : "bg-gray-900 text-white"
                        }
                      >
                        Create Account
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Toggle Button */}
            <div className="p-4 mt-4 text-center border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleAuth}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              >
                {isLogin
                  ? "Need an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );


}