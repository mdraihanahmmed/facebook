import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../../slices/userSlice";
import { MdOutlineFileUpload } from "react-icons/md";
import Logout from "../../components/logout";

const Home = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  let data = useSelector((state) => state.userLoginInfo.userInfo.photoURL);
  console.log("all", data);

  let [verify, setVerify] = useState(false);
  let navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified) {
      setVerify(true);
      dispatch(userLoginInfo(user));
      localStorage.setItem("userData", JSON.stringify(user));
    }
  });

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      {verify ? (
        <>
          <div>
            <div className="bg-thirdColor h-screen flex justify-center items-center">
              <Logout />
              <div className="w-[250px] h-[250px] relative  drop-shadow-lg">
                <img
                  src={data}
                  className="w-full h-full rounded-full border-8 border-solid border-white"
                />
                <h1 className="text-2xl text-center mt-3 text-white font-semibold w-full">
                  {auth.currentUser.displayName}
                </h1>
                <div className="group">
                  <div className="w-[250px] opacity-0  group-hover:opacity-100  h-[250px] bg-[rgba(0,0,0,.4)] rounded-full absolute top-0 left-0 flex justify-center items-center cursor-pointer">
                    <Link to="/imgupload">
                      <MdOutlineFileUpload className="text-5xl text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-primary h-screen flex justify-center items-center">
          <div className="bg-thirdColor p-10 rounded-md shadow-lg">
            <h1 className="text-white text-5xl font-bold drop-shadow-lg forgotAnim">
              please verify your email
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
