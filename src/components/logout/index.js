import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../../slices/userSlice";
import { getAuth, signOut } from "firebase/auth";

const Logout = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  let handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(userLoginInfo(null));
      localStorage.removeItem("userData");
      navigate("/login");
    });
  };
  return (
    <div>
      <div className="pr-16 drop-shadow-lg">
        <IoMdLogOut
          onClick={handleLogout}
          className="text-7xl text-white mx-auto cursor-pointer"
        />
        <h1 className="text-4xl text-white  font-bold ">Logout</h1>
      </div>
    </div>
  );
};

export default Logout;
