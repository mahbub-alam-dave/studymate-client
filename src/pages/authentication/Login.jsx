import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { ContextValue } from "../../Contextes/AllContexts";

const Login = () => {
  
  const { loginUser, loginWithGoogle } = useContext(ContextValue);
  const navigate = useNavigate();
  const location = useLocation()

  const handleUserLoginForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());

    // login user
    loginUser(email, password)
      .then(() => {
        // user logged in successfully
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User have logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        // navigate user to desired page
        navigate( location.state || '/')
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
        navigate( location.state || '/')
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
    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl mx-auto my-12">
      <div className="card-body">
        <h1 className="text-3xl text-center font-bold">Login now!</h1>
        <form onSubmit={handleUserLoginForm} className="fieldset">
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
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500">
            Register now!
          </Link>
        </p>
        <div className="flex gap-2 items-center">
          <span>or, Login with your</span>
          <FcGoogle onClick={handleGoogleSignIn} size={24} className="cursor-pointer" />
          <span>account</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
