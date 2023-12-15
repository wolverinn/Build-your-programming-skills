import Breadcrumb from "@/components/Common/Breadcrumb";
import UploadImgForm from "@/components/UploadForm/UploadImg";
import ToolShowArea from "@/components/ShowArea/ShowArea";
import { MapPathToToolName } from "@/utils/toolName";
import { Metadata } from "next";

let pathname = "rembg"
let toolName = MapPathToToolName({pathName: pathname})

export const metadata: Metadata = {
  "title": toolName+' | ZLAI',
  "description": toolName+' by ZLAI, AIGC Powered Image Processing Tools',
}

export default function RembgPage() {
  return (
    <>
      <Breadcrumb pageName={toolName} description="" />
      <div className="border-gray-500 border-b pb-7">
        <UploadImgForm toolName={pathname} />
      </div>
      <ToolShowArea toolPath={pathname} divideline={true} />
    </>
  );
}
