import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { ContextValue } from "../../Contextes/AllContexts";
import axios from "axios";

const Register = () => {
  const { user, setUser, registerUser, updateUserProfile, loginWithGoogle } =
    useContext(ContextValue);
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState("");

      const saveUserToDB = async (userData) => {
  try {
    await axios.post(`${import.meta.VITE_api_url}/users`, userData);
  } catch (err) {
    console.error("Error saving user:", err);
  }
};

  const handleUserRegisterForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password, ...profileData } = Object.fromEntries(
      formData.entries()
    );
    setValidationError("");
    // register user using email and password

    if(!/(?=.*[a-z])/.test(password)) {
      setValidationError("Password must include at least one lowercase character")
      return
    }
    else if(!/(?=.*[A-Z])/.test(password)) {
      setValidationError("Password must include at least one uppercase character")
      return
    }
    else if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setValidationError("Password must include at least one special character")
      return
    }
    else if(!/(.{6,}$)/.test(password)) {
      setValidationError("Password must be at least 6 character long")
      return
    }


    registerUser(email, password)
      .then(() => {
        // user registered successfully
        updateUserProfile({
          displayName: profileData.name,
          photoURL: profileData.photo || "https://i.ibb.co.com/FLrrTVtL/man.png",
        })
          .then(() => {
            // user profile data updated
            setUser({
              ...user,
              displayName: profileData.name,
              photoURL: profileData.photo,
            });
            // navigate to desired route
            const newUser = {
      name: profileData.name,
      email: email,
      photo: profileData.photo || "https://i.ibb.co.com/FLrrTVtL/man.png",
      createdAt: new Date(),
    };
    saveUserToDB(newUser)
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
      .then((result) => {
        // successfully logged in with google
        const googleUser = result.user;
    const newUser = {
      name: googleUser.displayName,
      email: googleUser.email,
      photo: googleUser.photoURL,
      createdAt: new Date(),
    };
    saveUserToDB(newUser)
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
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div className="px-4 sm:px-5 md:px-6 py-24">
      <div className="card bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] w-full max-w-md shrink-0 mx-auto  shadow-sm">
        <div className="card-body px-4 sm:px-6 md:px-8 py-10">
          <h1 className="text-3xl text-center font-bold">
            Register now!
          </h1>
          <form onSubmit={handleUserRegisterForm} className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none"
              name="name"
              placeholder="Name"
              required
            />
            <label className="label">Photo Url</label>
            <input
              type="text"
              className="input w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none"
              name="photo"
              placeholder="Photo Url"
              required
            />
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none"
              name="email"
              placeholder="Email"
              required
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full bg-transparent border-[var(--color-border)] dark:border-[var(--color-border-dark)] focus:outline-none"
              name="password"
              placeholder="Password"
              required
            />
            <div>
              <p className="text-[var(--color-primary)] dark:text-[var(--color-text-primary-dark)]">{validationError}</p>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-dark)] hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-primary-dark)] border-none shadow-none hover:opacity-90">
              Register
            </button>
          </form>
          <div className="flex items-center py-3">
            <div className="flex-grow border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]"></div>
            <span className="mx-4 text-sm ">OR</span>
            <div className="flex-grow border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]"></div>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="btn shadow-none border-none bg-blue-100 dark:bg-gray-800 hover:bg-blue-200 dark:hover:bg-gray-700 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] focus:outline-none"
          >
            <FcGoogle size={24} className="" />
            Login with Google
          </button>
            <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 hover:text-blue-300">
              Login here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
