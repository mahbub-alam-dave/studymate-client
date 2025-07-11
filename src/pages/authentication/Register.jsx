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

    /* if (
      !/(?=.*[a-z])/.test(password) ||
      !/(?=.*[A-Z])/.test(password) ||
      !/(.{6,}$)/.test(password)
    ) {
      // setValidationError("Password must contain one lowercase character")
      setValidationError(
        "Password must be in 6 characters, with at least one uppercase and lowercase"
      );
      return;
    } */

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
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div className="p-4 my-12">
      <div className="card text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] w-full max-w-md shrink-0 mx-auto  shadow-lg">
        <div className="card-body px-4 sm:px-6 py-8">
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
            <button className="btn bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-[var(--color-text-primary-dark)] hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-primary-dark)] border-[var(--color-border)] dark:border-[var(--color-border-dark)] ">
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
            <div className="flex-grow border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]"></div>
            <span className="mx-4 text-sm ">OR</span>
            <div className="flex-grow border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]"></div>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-transparent border shadow-none border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-primary-dark)] hover:text-[var(--color-text-primary-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] focus:outline-none"
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
