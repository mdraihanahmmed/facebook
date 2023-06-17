import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";

const Registration = () => {
  // let [users, setUsers] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   password: "",
  // });

  // let { firstname, lastname, email, password } = users;

  // let onChangeAll = (e) => {
  //   let file_name = e.target.name;
  //   setUsers({ ...users, [e.target.name]: [e.target.value] });

  //   if (file_name === "firstname") {
  //     setUserserr({ firstnameerr: "", lastnameerr, emailerr, passworderr });
  //   }
  //   if (file_name === "lastname") {
  //     setUserserr({ firstnameerr, lastnameerr: "", emailerr, passworderr });
  //   }
  //   if (file_name === "email") {
  //     setUserserr({ firstnameerr, lastnameerr, emailerr: "", passworderr });
  //   }

  //   if (file_name === "password") {
  //     setUserserr({ firstnameerr, lastnameerr, emailerr, passworderr: "" });
  //   }
  // };

  // let [userserr, setUserserr] = useState({
  //   firstnameerr: "",
  //   lastnameerr: "",
  //   emailerr: "",
  //   passworderr: "",
  // });

  // let { firstnameerr, lastnameerr, emailerr, passworderr } = userserr;

  // let handleSignUp = () => {
  //   console.log("emailerror", emailerr);
  //   setUserserr({
  //     emailerr: !email && "email is required!",
  //     passworderr: !password && "password is required!",
  //     firstnameerr: !firstname && "first name is required!",
  //     lastnameerr: !lastname && "last name is required!",
  //   });
  // };

  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let [firstname, setFirstname] = useState();
  let [lastname, setLastname] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();

  let [firstnameerr, setFirstnameerr] = useState();
  let [lastnameerr, setLastnameerr] = useState();
  let [emailerr, setEmailerr] = useState();
  let [passworderr, setPassworderr] = useState();

  let [successmsg, setSuccessmsg] = useState();
  let [loader, setLoader] = useState(false);
  let [showpass, setShowpass] = useState(false);

  let handleFirstname = (e) => {
    setFirstname(e.target.value);
    setFirstnameerr("");
    setSuccessmsg("");
  };
  let handleLastname = (e) => {
    setLastname(e.target.value);
    setLastnameerr("");
    setSuccessmsg("");
  };

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

  let handleSignUp = () => {
    let emailregex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!firstname) {
      setFirstnameerr("first name is required!");
      setSuccessmsg("");
    }
    if (!lastname) {
      setLastnameerr("last name is required!");
      setSuccessmsg("");
    }
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

    if (firstname && lastname && email && password && email.match(emailregex)) {
      setLoader(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: firstname + " " + lastname,
            photoURL: "images/download.jpg",
          })
            .then(() => {
              setSuccessmsg(
                "HURRAY...! Registration Successfull.check your email for verfication."
              );
              setFirstname("");
              setLastname("");
              setEmail("");
              setPassword("");
              setLoader(false);
              sendEmailVerification(auth.currentUser);
              setTimeout(() => {
                navigate("/login");
              }, 3000);
            })
            .catch((error) => {
              console.log(error.code);
            });
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code.includes("auth/email-already-in-use")) {
            setEmailerr("email aleady in use!");
            setSuccessmsg("");
            setLoader(false);
          }
        });
    }
  };

  return (
    <div className="flex">
      <div className="mt-44 ml-[400px]  w-[452px]">
        <h1 className="text-primary font-bold text-6xl">facebook</h1>
        <p className="text-secondary font-medium text-sm w-72 mt-4">
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>
      <div className="w-[493px] mt-24">
        {successmsg && (
          <p className="bg-thirdColor text-3xl text-white rounded-lg font-semibold p-4 mb-3 shadow-xl mt-2 successAnim">
            {successmsg}
          </p>
        )}
        <div className="mb-[15px]">
          <input
            value={firstname}
            name="firstname"
            onChange={handleFirstname}
            type="text"
            placeholder="First Name"
            className="w-full border-2 border-solid rounded-md pl-[18px] py-[23px]  outline-none"
          />
          {firstnameerr && (
            <p className="bg-gray-400  text-white rounded-lg font-semibold p-3 mb-3 shadow-xl mt-2 anim">
              {firstnameerr}
            </p>
          )}
        </div>
        <div className="mb-[15px]">
          <input
            value={lastname}
            name="lastname"
            onChange={handleLastname}
            type="text"
            placeholder="Last Name"
            className="w-full border-2 border-solid rounded-md pl-[18px] py-[23px]  outline-none"
          />
          {lastnameerr && (
            <p className="bg-gray-400  text-white rounded-lg font-semibold p-3 mb-3 shadow-xl mt-2 anim">
              {lastnameerr}
            </p>
          )}
        </div>
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
          <div>
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
          </div>
          {passworderr && (
            <p className="bg-gray-400 text-white rounded-lg font-semibold p-3 mb-3 shadow-xl mt-2 anim">
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
            onClick={handleSignUp}
            className="bg-primary text-white font-bold text-xl w-full py-6 rounded-md mt-9"
          >
            Sign Up
          </button>
        )}

        <div className="w-full flex justify-center">
          <Link
            to="/forgotpassword"
            className="text-primary border-b border-primary inline-block font-semibold mt-5"
          >
            Forgotten password?
          </Link>
        </div>
        <div className="w-full flex justify-center group">
          <Link
            to="/login"
            className="bg-thirdColor text-white font-bold text-xl  py-4 px-16 rounded-md mt-9 group-hover:opacity-90"
          >
            Already have
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
