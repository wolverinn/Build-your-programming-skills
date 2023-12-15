"use client";

import Link from "next/link";

export default function SigninButton({ logged_in }) {
  // const [logged_in, setLogin] = useState<boolean>(false);
  return (
    <>
      {!logged_in && (
        <>
          <Link
            href="/signin"
            className="hidden py-3 px-7 text-base font-bold text-dark hover:opacity-70 dark:text-white md:block"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
          >
            Sign Up
          </Link>
        </>
      )}
    </>
  );
}
