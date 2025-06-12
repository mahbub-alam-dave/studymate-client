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
      <div className="card bg-gradient-to-br from-[#00b4d8] to-[#03045e] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] w-full max-w-md mx-auto shrink-0 shadow-2xl">
        <div className="card-body text-gray-200 px-4 sm:px-6 py-8">
          <h1 className="text-3xl text-center font-bold text-gray-200">Register now!</h1>
          <form onSubmit={handleUserRegisterForm} className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full bg-transparent border-gray-300 focus:outline-none"
              name="name"
              placeholder="Name"
            />
            <label className="label">Photo Url</label>
            <input
              type="text"
              className="input w-full bg-transparent border-gray-300 focus:outline-none"
              name="photo"
              placeholder="Photo Url"
            />
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full bg-transparent border-gray-300 focus:outline-none"
              name="email"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full bg-transparent border-gray-300 focus:outline-none"
              name="password"
              placeholder="Password"
            />
            <div>
              <p className="text-red-500">{validationError}</p>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Register</button>
          </form>
          <p>
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500">
              Login here!
            </Link>
          </p>
          <div className="divider">OR</div>
          <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
