import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { ContextValue } from "../../Contextes/AllContexts";

const Login = () => {
  const { loginUser, loginWithGoogle } = useContext(ContextValue);
  const navigate = useNavigate();
  const location = useLocation();

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
        navigate(location.state || "/");
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
        navigate(location.state || "/");
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
    <div className="card bg-gradient-to-br from-[#00b4d8] to-[#03045e] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] w-full max-w-md shrink-0 shadow-2xl mx-auto border border-[#00b4d8] dark:border-[#03045e]">
      <div className="card-body text-gray-200 px-4 sm:px-6 py-8">
        <h1 className="text-3xl text-center font-bold text-gray-200">
          Login now!
        </h1>
        <form onSubmit={handleUserLoginForm} className="fieldset">
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
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4 bg-gradient-to-br from-[#00b4d8] to-[#03045e] dark:bg-gradient-to-br dark:from-[#03045e] dark:to-[#000814] text-gray-200 shadow-none hover:opacity-70 border border-[#00b4d8] dark:border-[#03045e]">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500 hover:text-blue-300">
            Register now!
          </Link>
        </p>
        {/* <div className="divider text-sm divider-success text-gray-200">OR</div> */}
        <div className="flex items-center py-3">
          <div className="flex-grow border-t border-[#00b4d8] dark:border-[#03045e]"></div>
          <span className="mx-4 text-sm text-gray-300">OR</span>
          <div className="flex-grow border-t border-[#00b4d8] dark:border-[#03045e]"></div>
        </div>
        {/*         <div className="flex gap-2 items-center">
          <span>or, Login with your</span>
          <FcGoogle onClick={handleGoogleSignIn} size={24} className="cursor-pointer" />
          <span>account</span>
        </div> */}
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-transparent text-gray-200 border shadow-none border-[#00b4d8] dark:border-[#03045e] hover:text-green-500"
        >
          <FcGoogle size={24} className="" />
          Login with Google
        </button>
      </div>
    </div>
    </div>
  );
};

export default Login;
