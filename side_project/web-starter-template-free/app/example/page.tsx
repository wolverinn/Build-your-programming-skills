import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import ToolShowArea from "@/components/ShowArea/ShowArea";
import { Metadata } from "next";

export const metadata: Metadata = {
  "title": 'Image Tool Example | ZLAI',
  "description": 'Example',
}

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ScrollUp />
      {/* <Hero /> */}
      {/* <Features /> */}
      <div className="relative z-10 overflow-hidden pt-28 pb-16 md:pb-20 lg:pt-[120px] lg:pb-28">
        <ToolShowArea toolPath={"rpbg"} divideline={true} tryButton={true} />
        <ToolShowArea toolPath={"outpaint"} divideline={true} tryButton={true} />
        <ToolShowArea toolPath={"rembg"} divideline={true} tryButton={true} />
        <ToolShowArea toolPath={"anime_gan"} divideline={true} tryButton={true} />
        <ToolShowArea toolPath={"style_transfer"} divideline={true} tryButton={true} />
        <ToolShowArea toolPath={"deblurring"} divideline={true} tryButton={true} />
        <ToolShowArea toolPath={"denoising"} divideline={true} tryButton={true} />
        <ToolShowArea toolPath={"room_gen"} divideline={false} tryButton={true} />
        <ToolShowArea toolPath={"upscale"} divideline={true} tryButton={true} />
      </div>
      {/* <AboutSectionTwo />
      <Blog /> */}
    </>
  );
}
