import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { ContextValue } from "../../Contextes/AllContexts";

const Register = () => {
  const { user, setUser, registerUser, updateUserProfile, loginWithGoogle } =
    useContext(ContextValue);
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState("");

  const handleUserRegisterForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password, ...profileData } = Object.fromEntries(
      formData.entries()
    );
    setValidationError("");
    // register user using email and password

    if (
      !/(?=.*[a-z])/.test(password) ||
      !/(?=.*[A-Z])/.test(password) ||
      !/(.{6,}$)/.test(password)
    ) {
      // setValidationError("Password must contain one lowercase character")
      setValidationError(
        "Password must be in 6 characters, with at least one uppercase and lowercase"
      );
      return;
    }

    registerUser(email, password)
      .then(() => {
        // user registered successfully
        updateUserProfile({
          displayName: profileData.name,
          photoURL: profileData.photo,
        })
          .then(() => {
            // user profile data updated
            setUser({
              ...user,
              displayName: profileData.name,
              photoURL: profileData.photo,
            });
            // navigate to desired route
            navigate("/");
          })
          .catch((error) => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `${error}`,
              showConfirmButton: false,
              timer: 1500,
            });
          });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User have registered successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${error}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then(() => {
        // successfully logged in with google
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User successfully logged in with google",
          showConfirmButton: false,
          timer: 1500,
        });
        // navigate user to desired page
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${error}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div className="p-4 my-12">
      <div className="card bg-gradient-to-br from-[#00b4d8] to-[#03045e] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] w-full max-w-md mx-auto shrink-0 shadow-2xl border border-[#00b4d8] dark:border-[#03045e]">
        <div className="card-body text-gray-200 px-4 sm:px-6 py-8">
          <h1 className="text-3xl text-center font-bold text-gray-200">
            Register now!
          </h1>
          <form onSubmit={handleUserRegisterForm} className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full bg-transparent border-[#00b4d8] dark:border-[#03045e] focus:outline-none"
              name="name"
              placeholder="Name"
            />
            <label className="label">Photo Url</label>
            <input
              type="text"
              className="input w-full bg-transparent border-[#00b4d8] dark:border-[#03045e] focus:outline-none"
              name="photo"
              placeholder="Photo Url"
            />
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full bg-transparent border-[#00b4d8] dark:border-[#03045e] focus:outline-none"
              name="email"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full bg-transparent border-[#00b4d8] dark:border-[#03045e] focus:outline-none"
              name="password"
              placeholder="Password"
            />
            <div>
              <p className="text-red-500">{validationError}</p>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4 bg-gradient-to-br from-[#00b4d8] to-[#03045e] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] text-gray-200 shadow-none hover:opacity-70 border border-[#00b4d8] dark:border-[#03045e]">
              Register
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 hover:text-blue-300">
              Login here!
            </Link>
          </p>
          <div className="flex items-center py-3">
            <div className="flex-grow border-t border-[#00b4d8] dark:border-[#03045e]"></div>
            <span className="mx-4 text-sm text-gray-300">OR</span>
            <div className="flex-grow border-t border-[#00b4d8] dark:border-[#03045e]"></div>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-transparent text-gray-200 shadow-none border-[#00b4d8] dark:border-[#03045e] hover:text-green-500"
          >
            <FcGoogle size={24} className="" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
