import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Forgotpassword = () => {
  const auth = getAuth();

  let [email, setEmail] = useState();

  let handleEmail = (e) => {
    setEmail(e.target.value);
  };

  let handleUpdate = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("check your email for rest your password.");
        setEmail("");
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code.includes("auth/missing-email")) {
          toast.info("missing email...!");
        }
        if (error.code.includes("auth/invalid-email")) {
          toast.warning("invalid email..!");
        }
        if (error.code.includes("auth/user-not-found")) {
          toast.warning("user not found!");
        }
      });
  };
  return (
    <div className="bg-primary h-screen  flex justify-center items-center">
      <ToastContainer position="top-center" theme="light" />

      <div className="forgotAnim bg-white w-96 p-5 rounded-lg shadow-xl">
        <h1 className=" font-semibold text-2xl pb-5 text-center">
          Change Password
        </h1>
        <div className="mb-[15px]">
          <input
            value={email}
            onChange={handleEmail}
            name="email"
            type="text"
            placeholder="Email Address"
            className="w-full border-2 border-solid rounded-md pl-[18px] py-[23px]  outline-none"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-thirdColor text-white font-bold text-xl px-12 py-3 rounded-md mt-3 mr-5"
        >
          Update
        </button>
        <Link
          to="/login"
          className="bg-secondary text-white font-bold text-xl px-12 py-3 rounded-md mt-3"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default Forgotpassword;
