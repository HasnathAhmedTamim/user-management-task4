import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin"; // Ensure correct import path

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        return updateProfile(loggedUser, {
          displayName: data.username,
        }).then(() => {
          const userInfo = {
            name: data.username,
            email: data.email,
            uid: loggedUser.uid,
            creationTime: loggedUser.metadata.creationTime,
            lastLoginAt: loggedUser.metadata.lastSignInTime,
            status: "active", // Set the default status to "active"
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("User added to database");
              Swal.fire({
                icon: "success",
                title: "Account Created",
                text: `Welcome, ${data.username}! Your account has been successfully created.`,
              }).then(() => {
                navigate("/"); // Redirect to home page after showing the success message
              });
            }
          });
        });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        Swal.fire({
          icon: "error",
          title: "Account Creation Failed",
          text: error.message,
        });
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home page if the user is already logged in
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-600"
              htmlFor="username"
            >
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              id="username"
              className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-600"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-semibold text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Or sign up with</p>
          <SocialLogin />
        </div>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
