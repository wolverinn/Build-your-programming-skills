"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

// 参数toolName必须等于页面的path，如"rpbg"
export default function UploadImgForm({ toolName }: { toolName: string }) {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [dragging, setDragging] = useState(false);
  const [logged_in, setLogin] = useState<boolean>(false);
  const [resImg, setResImg] = useState("");
  const [errMsg, setErrMsg] = useState({
    img1: "",
    img2: "",
  });
  const router = useRouter();

  const onImageUpload = (e) => {
    setImage(e.target.files[0]);
    errMsg.img1 = ""
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      setImage(files[0]);
    }
    setDragging(false);
  };
  const onClick = () => {
    document.getElementById("img_input").click();
  };

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async () => {
    if (!logged_in) {
      router.push("/signin?redirect=/"+toolName);
    }
    // validate form
    let validateForm = {
      img1: "",
      img2: "",
    };
    setErrMsg(validateForm);
    if (!image) {
      validateForm.img1 = "image required";
    }
    setErrMsg(validateForm);
    for (let [key, value] of Object.entries(validateForm)) {
      if (value) {
        console.log("field required");
        return;
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="relative z-10 overflow-hidden pt-32 pb-16 md:pb-20 lg:pt-[32px] lg:pb-24">
        <div className="-mx-4 flex flex-wrap sm:flex-nowrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-4 max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
              <div className="mb-4">
                <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                  Upload Image
                </label>
                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={onClick}
                  className={`mt-3 ${
                    dragging ? "bg-blue-200" : "bg-blue-100"
                  } ${errMsg.img1 ? "border-red1" : "border-blue"} flex h-96 w-full cursor-pointer items-center justify-center border border-dashed`}
                >
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="max-h-96 object-contain"
                    />
                  )}
                  {!image && (
                    <p className="justify-center text-center">
                      Click to upload <br /> Or <br /> Drag and drop your image
                      here
                    </p>
                  )}
                  <input
                    id="img_input"
                    type="file"
                    accept="image/*"
                    onChange={onImageUpload}
                    className="text-gray-700 focus:shadow-outline hidden w-full appearance-none rounded border py-2 px-3 leading-tight focus:outline-none"
                  />
                </div>
                <span className="text-red">{errMsg.img1}</span>
              </div>
              {(toolName == "rpbg" || toolName == "outpaint") && (
                <>
                  <div className="mb-4">
                    <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                      Text Input
                    </label>
                    <input
                      type="text"
                      value={text}
                      onChange={onTextChange}
                      placeholder="input prompt"
                      className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>
                </>
              )}

              {!logged_in && (
                <>
                  <button
                    onClick={onSubmit}
                    className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                  >
                    Sign In to Generate For Free
                  </button>
                </>
              )}
            </div>
          </div>

          {resImg && (
            <>
              <div className="mt:8 mx-auto flex w-full cursor-pointer items-center justify-center rounded-2xl sm:mt-0">
                <img
                  src={resImg}
                  alt="generated photo"
                  className="w-auto object-contain sm:max-w-xl"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
