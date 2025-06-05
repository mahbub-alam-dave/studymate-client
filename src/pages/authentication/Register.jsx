import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { ContextValue } from "../../Contextes/AllContexts";

const Register = () => {
  const { user, setUser, registerUser, updateUserProfile, loginWithGoogle } = useContext(ContextValue);
  const navigate = useNavigate()
  const [validationError, setValidationError] = useState("")

  const handleUserRegisterForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password, ...profileData } = Object.fromEntries(
      formData.entries()
    );
    setValidationError('')
    // register user using email and password

    if(!/(?=.*[a-z])/.test(password) || !/(?=.*[A-Z])/.test(password) || !/(.{6,}$)/.test(password)) {
        // setValidationError("Password must contain one lowercase character")
        setValidationError("Password must be in 6 characters, with at least one uppercase and lowercase")
        return
        }
        
    registerUser(email, password).then(() => {
      // user registered successfully
      updateUserProfile({displayName: profileData.name, photoURL: profileData.photo})
      .then(() => {
        // user profile data updated
        setUser({...user, displayName: profileData.name, photoURL: profileData.photo})
        // navigate to desired route
      navigate('/')
      })
      .catch(error => {
        Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
      })
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User have registered successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch(error => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    })
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
          navigate('/')
      })
      .catch(error => {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${error}`,
            showConfirmButton: false,
            timer: 1500,
          });
      })
    }
  return (
    <div className="">
      <div className="card bg-base-100 w-full max-w-md mx-auto shrink-0 shadow-2xl my-12">
        <div className="card-body">
          <h1 className="text-3xl text-center font-bold">Register now!</h1>
          <form onSubmit={handleUserRegisterForm} className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full "
              name="name"
              placeholder="Name"
            />
            <label className="label">Photo Url</label>
            <input
              type="text"
              className="input w-full"
              name="photo"
              placeholder="Photo Url"
            />
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              name="email"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              name="password"
              placeholder="Password"
            />
            <div>
              <p className='text-red-500'>{validationError}</p>
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
          <div className="flex gap-2 items-center">
            <span>or, Login with your</span>
            <FcGoogle onClick={handleGoogleSignIn} size={24} />
            <span>account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
