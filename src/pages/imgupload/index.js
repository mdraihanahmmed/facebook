import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";

const Imgupload = () => {
  const storage = getStorage();
  const auth = getAuth();
  let navigate = useNavigate();
  let data = useSelector((state) => state.userLoginInfo.userInfo.photoURL);

  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();

  let [loader, setLoader] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    setLoader(true);
    if (cropper == undefined) {
      toast.error("please chose a file");
      setLoader(false);
    }
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());

      const storageRef = ref(storage, auth.currentUser.uid);

      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            navigate("/");
          });
        });
      });
    }
  };

  return (
    <div>
      <div className="bg-primary h-screen flex justify-center items-center ">
        <ToastContainer position="top-center" theme="dark" />

        <div className="bg-white w-[800px] p-5 drop-shadow-xl rounded-lg">
          <h1 className="text-3xl font-semibold mb-4">Upload Image</h1>

          <input onChange={onChange} type="file" />

          {image ? (
            <div className="mt-3">
              <div className=" overflow-hidden rounded-full w-[150px] h-[150px]  drop-shadow-lg my-4 mx-auto">
                <div className="img-preview">
                  <img
                    src={data}
                    className=" w-[150px] h-[150px]  rounded-full border-8 border-solid "
                  />
                </div>
              </div>
              <Cropper
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
                guides={true}
              />
            </div>
          ) : (
            <div className="w-[150px] h-[150px] relative  drop-shadow-lg my-4 mx-auto">
              <img
                src={data}
                className="w-full h-full rounded-full border-8 border-solid "
              />
            </div>
          )}

          {loader ? (
            <div className="flex justify-center mt-4">
              <BounceLoader color="#36d7b7" />
            </div>
          ) : (
            <div>
              <div className=" group py-5 inline-block">
                <button
                  onClick={getCropData}
                  to="/registration"
                  className="bg-thirdColor text-white font-bold text-xl mt-4 py-4 px-8 rounded-md  group-hover:opacity-90 mr-8"
                >
                  Upload
                </button>
              </div>

              <div className="group inline-block">
                <Link
                  to="/"
                  className="bg-secondary text-white font-bold text-xl  py-4 px-8 rounded-md mt-9 group-hover:opacity-90"
                >
                  Cancel
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Imgupload;
