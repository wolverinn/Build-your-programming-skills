import { SigninPage } from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  "title": 'Sign In | ZLAI',
  "description": 'ZLAI',
}

export default function Signin() {
  return (
    <SigninPage />
  )
}