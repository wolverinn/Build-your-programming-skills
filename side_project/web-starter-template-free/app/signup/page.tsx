import { SignupPage } from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  "title": 'Sign Up | ZLAI',
  "description": 'ZLAI',
}

export default function Signup() {
  return (
    <SignupPage />
  )
}