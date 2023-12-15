"use client";

import NewsLatterBox from "./NewsLatterBox";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ParseErrCode } from "@/utils/errCode";
import axios from "axios";
import { GetHost } from "@/utils/session";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    feedback: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState({
    email: "",
    name: "",
    text: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendFeedback();
  };

  async function sendFeedback() {
    let validateForm = {
      email: "",
      name: "",
      text: "",
    };
    setErrMsg(validateForm);
    if (!formData.email) {
      validateForm.email = "email required";
    }
    if (!formData.name) {
      validateForm.name = "name required";
    }
    if (!formData.feedback) {
      validateForm.text = "feedback required";
    }
    setErrMsg(validateForm);
    for (let [key, value] of Object.entries(validateForm)) {
      if (value) {
        console.log("field required");
        return;
      }
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const formDataPost = new FormData();
    formDataPost.append("email", formData.email);
    formDataPost.append("name", formData.name);
    formDataPost.append("feedback", formData.feedback);
    const res = await axios(GetHost() + "/api/web/feedback/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formDataPost,
      validateStatus: function (status) {
        // return status < 500;
        return true;
      }
    });
    setLoading(false);
    if (res.status !== 200) {
      console.log("get send feedback error: ", res.status);
      toast.error("Internal Error", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      let resJson = await res.data;
      if (resJson["code"]) {
        console.log("get error: ", resJson["code"]);
        toast.error("get error: " + ParseErrCode({ code: resJson["code"] }), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  }
  return (
    <section id="contact" className="lg:py-21 overflow-hidden py-16 md:py-20">
      <ToastContainer />
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="lg:w-12/12 xl:w-12/12 w-full px-4">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help? Open a Ticket
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                {/* Our support team will get back to you ASAP via email. */}
                Or give us your feedback via Email.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formData.name.length >= 0) {
                            errMsg.name = "";
                          }
                        }}
                        className={`w-full rounded-md border ${
                          errMsg.name ? "border-red1" : ""
                        } border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp`}
                      />
                      <span className="text-red">{errMsg.name}</span>
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formData.email.length >= 0) {
                            errMsg.email = "";
                          }
                        }}
                        className={`w-full rounded-md border ${
                          errMsg.email ? "border-red1" : ""
                        } border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp`}
                      />
                      <span className="text-red">{errMsg.email}</span>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Enter your Message"
                        value={formData.feedback}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            feedback: e.target.value,
                          });
                          if (formData.feedback.length >= 0) {
                            errMsg.text = "";
                          }
                        }}
                        className={`w-full resize-none rounded-md border ${
                          errMsg.text ? "border-red1" : ""
                        } border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp`}
                      ></textarea>
                      <span className="text-red">{errMsg.text}</span>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                      Submit Ticket
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
