import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { ContextValue } from "../../Contextes/AllContexts";
import { saveUserToDB } from "../../hooks/utilities/saveUserToDb";

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
      .then( async(result) => {
        // user logged in successfully
        const userData = {
          email: result.user.email,
          lastSignedIn: new Date()
        }
        await saveUserToDB(userData)
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
      .then( async(result) => {
        // successfully logged in with google
        const googleUser = result.user;
    const newUser = {
      name: googleUser.displayName,
      email: googleUser.email,
      photo: googleUser.photoURL,
      role: "student",
      createdAt: new Date(),
    };
        await saveUserToDB(newUser);
navigate("/");

        // show success alert
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
    <div className="px-4 sm:px-5 md:px-6 py-32">
    <div className="card bg-[var(--color-bg-card)] dark:bg-[var(--color-bg-card-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] w-full max-w-md shrink-0 mx-auto  shadow-sm">
      <div className="card-body px-4 sm:px-6 md:px-8 py-8">
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
          <button  className="btn bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-[var(--color-text-primary-dark)] hover:bg-[var(--color-primary)] dark:hover:bg-[var(--color-primary-dark)] border-none shadow-none hover:opacity-90"
>
            Login
          </button>
        </form>

        {/* <div className="divider text-sm divider-success text-gray-200">OR</div> */}
        <div className="flex items-center py-3">
          <div className="flex-grow border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]"></div>
          <span className="mx-4 text-sm ">OR</span>
          <div className="flex-grow border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]"></div>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="btn shadow-none border-none bg-blue-100 dark:bg-gray-800 hover:bg-blue-200 dark:hover:bg-gray-700 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] focus:outline-none"
          // border shadow-none border-[var(--color-border)] dark:border-[var(--color-border-dark)]
        >
          <FcGoogle size={24} className="" />
          Login with Google
        </button>
          
          <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to={"/register"} className=" text-blue-500 hover:text-blue-300">
            Register now!
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
