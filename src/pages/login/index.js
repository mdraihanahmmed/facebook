import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoginInfo } from "../../slices/userSlice";

const Login = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  let [email, setEmail] = useState();
  let [password, setPassword] = useState();

  let [emailerr, setEmailerr] = useState();
  let [passworderr, setPassworderr] = useState();

  let [successmsg, setSuccessmsg] = useState();
  let [loader, setLoader] = useState(false);
  let [showpass, setShowpass] = useState(false);

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
    setSuccessmsg("");
  };

  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr("");
    setSuccessmsg("");
  };

  let handleSignIn = () => {
    let emailregex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email) {
      setEmailerr("email is required!");
      setSuccessmsg("");
    } else if (!email.match(emailregex)) {
      setEmailerr("invalid email!!");
      setSuccessmsg("");
    }
    if (!password) {
      setPassworderr("password is required!");
      setSuccessmsg("");
    }

    if (email && password && email.match(emailregex)) {
      setLoader(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          setLoader(false);
          toast.success(
            "Yahoo...! Login Successfull Please Wait For Redirection."
          );
          setEmail("");
          setPassword("");

          // console.log(user.user);
          dispatch(userLoginInfo(user.user));
          localStorage.setItem("userData", JSON.stringify(user));
          setTimeout(() => {
            navigate("/");
          }, [2000]);
        })
        .catch((error) => {
          if (error.code.includes("auth/user-not-found")) {
            setEmailerr("user not found!");
            setLoader(false);
          }
          if (error.code.includes("auth/wrong-password")) {
            setPassworderr("OOPS! wrong password!!");
            setLoader(false);
          }
        });
    }
  };

  return (
    <div className="flex">
      <ToastContainer position="top-center" theme="dark" />
      <div className="mt-44 ml-[400px]  w-[452px]">
        <h1 className="text-primary font-bold text-6xl">facebook</h1>
        <p className="text-secondary font-medium text-sm w-72 mt-4">
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>
      <div className="w-[493px] mt-24 shadow-xl p-6 rounded-md">
        {successmsg && (
          <p className="bg-thirdColor text-3xl text-white rounded-lg font-semibold p-4 mb-3 shadow-xl mt-2">
            {successmsg}
          </p>
        )}

        <div className="mb-[15px]">
          <input
            value={email}
            name="email"
            onChange={handleEmail}
            type="email"
            placeholder="Email Address"
            className="w-full border-2 border-solid rounded-md pl-[18px] py-[23px]  outline-none"
          />
          {emailerr && (
            <p className="bg-gray-400  text-white rounded-lg font-semibold p-3 mb-3 shadow-xl mt-2 anim">
              {emailerr}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            value={password}
            name="password"
            onChange={handlePassword}
            type={showpass ? "text" : "password"}
            placeholder="Password"
            className="w-full border-2 border-solid rounded-md pl-[18px] py-[23px] outline-none "
          />

          {showpass ? (
            <RiEyeFill
              onClick={() => setShowpass(false)}
              className="text-lg absolute top-[29px] right-[13px]"
            />
          ) : (
            <RiEyeCloseFill
              onClick={() => setShowpass(true)}
              className="text-lg absolute top-[29px] right-[13px]"
            />
          )}
          {passworderr && (
            <p className="bg-gray-400  text-white rounded-lg font-semibold p-3 mb-3 shadow-xl mt-2 anim">
              {passworderr}
            </p>
          )}
        </div>

        {loader ? (
          <div className="flex justify-center mt-4">
            <ClipLoader color="#1877F2" />
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="bg-primary text-white font-bold text-xl w-full py-6 rounded-md mt-9"
          >
            Log In
          </button>
        )}

        <div className="w-full flex justify-center border-b border-solid pb-[25px]">
          <Link
            to="/forgotpassword"
            className="text-primary border-b border-primary inline-block font-semibold mt-5"
          >
            Forgotten password?
          </Link>
        </div>
        <div className="w-full flex justify-center group">
          <Link
            to="/registration"
            className="bg-thirdColor text-white font-bold text-xl  py-4 px-16 rounded-md mt-9 group-hover:opacity-90"
          >
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
