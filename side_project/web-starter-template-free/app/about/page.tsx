import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  "title": 'About',
  "description": 'ZLAI is a cutting-edge, AIGC powered web application for image processing.',
}

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description="ZLAI is a cutting-edge, AIGC powered web application for image processing."
      />
      <AboutSectionOne />
      {/* <AboutSectionTwo /> */}
    </>
  );
};

export default AboutPage;
