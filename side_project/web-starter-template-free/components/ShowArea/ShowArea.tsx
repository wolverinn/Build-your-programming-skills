"use client";
import Link from "next/link";
import { MapPathToToolName } from "@/utils/toolName";

export default function ToolShowArea({
  toolPath,
  divideline,
  tryButton,
}: {
  toolPath?: string;
  divideline?: boolean;
  tryButton?: boolean;
}) {
  let outerDivClass =
    "flex justify-between items-center w-full flex-col sm:mt-10 mt-6 border-gray-500 border-b pb-7";
  if (!divideline) {
    outerDivClass =
      "flex justify-between items-center w-full flex-col sm:mt-10 mt-6";
  }

  let originPic =
    "https://replicate.delivery/pbxt/JV7RFNswGhUqe6jQqPBfZDJAAadBqgzPuRStQjY5JsMiucvT/1.jpeg";
  let genPic =
    "https://replicate.delivery/pbxt/1x7zt8yjFS7lGhttgjjvMefcg48bLFxCGABJs61VuIGJktiRA/149fedb2-4f80-11ee-ab94-8204e2f4a193.png";
  let redirect = "/" + toolPath;
  let toolName = MapPathToToolName({ pathName: toolPath });
  if (!tryButton) {
    toolName = "Example"
  }

  if (toolPath == "rpbg") {
  } else if (toolPath == "rembg") {
    originPic = "https://replicate.delivery/pbxt/JyF5sCUPV95jARsWwnjzDxzStaJnaKpyewnnoLagttVFv0ON/1.jpeg";
    genPic = "https://replicate.delivery/pbxt/plL4Gf4w8UUOS6syPJCYUeNOMFCRi2unuQlxeywgfWgrCB3HB/out.png";
  }

  return (
    <div className="container">
      <div className={outerDivClass}>
        <div className="mt-4 mb-16 flex flex-col space-y-10">
          <div className="max-w-[570px]">
            <h1 className=" text-2xl font-bold text-black dark:text-white sm:text-3xl">
              {toolName}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-8">
            <div>
              <h3 className="mb-1 text-lg font-medium">Original Picture</h3>
              <img
                alt="Original photo"
                src={originPic}
                className="h-96 w-full rounded-2xl object-cover"
                width={400}
                height={400}
              />
            </div>

            <div className="mt-8 sm:mt-0">
              <h3 className="mb-1 text-lg font-medium">Generated Picture</h3>

              <img
                alt="Generated photo with ZLAI"
                width={400}
                height={400}
                src={genPic}
                className="mt-2 h-96 w-full rounded-2xl object-cover sm:mt-0"
              />
            </div>
          </div>
        </div>

        {tryButton && (<Link
          className="flex items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
          href={redirect}
        >
          Try {toolName}
        </Link>)}
      </div>
    </div>
  );
}
