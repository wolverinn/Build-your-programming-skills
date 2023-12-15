import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  "title": 'Contact | ZLAI',
  "description": 'Contact',
}

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="ZLAI is a cutting-edge, AIGC powered web application for image processing."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
