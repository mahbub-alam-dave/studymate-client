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
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div className="p-4 mt-16">
    <div className="card text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] w-full max-w-md shrink-0 mx-auto  shadow-lg">
      <div className="card-body px-4 sm:px-6 py-8">
        <h1 className="text-3xl text-center font-bold">
          Login now!
        </h1>
        <form onSubmit={handleUserLoginForm} className="fieldset">
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
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button  className="btn bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-[var(--color-text-primary-dark)] hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-primary-dark)] border-[var(--color-border)] dark:border-[var(--color-border-dark)] "
>
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
          <div className="flex-grow border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]"></div>
          <span className="mx-4 text-sm ">OR</span>
          <div className="flex-grow border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]"></div>
        </div>
        {/*         <div className="flex gap-2 items-center">
          <span>or, Login with your</span>
          <FcGoogle onClick={handleGoogleSignIn} size={24} className="cursor-pointer" />
          <span>account</span>
        </div> */}
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

export default Login;
