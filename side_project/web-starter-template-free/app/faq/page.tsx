import { Metadata } from "next";

export const metadata: Metadata = {
  "title": 'FAQ | ZLAI',
  "description": 'FAQ',
}

export default function FaqPage() {
  return (
    <>
      <section className="relative z-10 overflow-hidden pt-28 lg:pt-[150px]">
        <div className="container">
          <div className="items-left -mx-4 flex flex-col">
            <div className="w-full px-4 md:w-8/12 lg:w-7/12">
              <div className="mb-8 max-w-[570px] md:mb-0 lg:mb-12">
                <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Frequently Asked Questions
                </h1>
                <p className="text-base font-medium leading-relaxed text-body-color">
                  constently updating
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 justify-items-center gap-x-14 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              <div className="mx-auto mb-4 max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Why is generating sometimes slow?
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color">
                  If a tool isn&apos;t being used for some time, the machine that
                  runs the tool would be recycled to save cost. And next time it
                  would need to cold start, which would cost more time (around 2
                  minutes).
                </p>
              </div>
              <div className="mx-auto mb-4 max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  How to get free credits?
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color">
                  Every new user has 10 free credits. And we give 3 free credits everyday for users whose credits are below 3.
                </p>
              </div>
              <div className="mx-auto mb-4 max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Why is every tool charged?
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color">
                  All tools need a GPU machine to run, and GPU costs a fortune.
                </p>
              </div>
              <div className="mx-auto mb-4 max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Is refund supported?
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color">
                  Currently we don&apos;t support refund, but we&apos;re working on it.
                </p>
              </div>
              <div className="mx-auto mb-4 max-w-[500px] rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Can I deploy my own tool service for private usage?
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color">
                  Yes, we can deploy a private service for you, and once deployment is completed, you won&apos;t be charged for additional fees other than the service&apos;s machine cost.
                </p>
              </div>
            </div>
          </div>

          <div>
            <span className="absolute top-0 left-0 z-[-1]">
              <svg
                width="287"
                height="254"
                viewBox="0 0 287 254"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.1"
                  d="M286.5 0.5L-14.5 254.5V69.5L286.5 0.5Z"
                  fill="url(#paint0_linear_111:578)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_111:578"
                    x1="-40.5"
                    y1="117"
                    x2="301.926"
                    y2="-97.1485"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4A6CF7" />
                    <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="absolute right-0 top-0 z-[-1]">
              <svg
                width="628"
                height="258"
                viewBox="0 0 628 258"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.1"
                  d="M669.125 257.002L345.875 31.9983L524.571 -15.8832L669.125 257.002Z"
                  fill="url(#paint0_linear_0:1)"
                />
                <path
                  opacity="0.1"
                  d="M0.0716344 182.78L101.988 -15.0769L142.154 81.4093L0.0716344 182.78Z"
                  fill="url(#paint1_linear_0:1)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_0:1"
                    x1="644"
                    y1="221"
                    x2="429.946"
                    y2="37.0429"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4A6CF7" />
                    <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_0:1"
                    x1="18.3648"
                    y1="166.016"
                    x2="105.377"
                    y2="32.3398"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4A6CF7" />
                    <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
