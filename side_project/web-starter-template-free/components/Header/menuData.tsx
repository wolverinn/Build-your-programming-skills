import { Menu } from "@/types/menu";
import { MapPathToToolName } from "@/utils/toolName";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 4,
    title: "AIGC Image Tools",
    newTab: false,
    submenu: [
      {
        id: 401,
        title: MapPathToToolName({pathName: "rembg"}),
        path: "/rembg",
        newTab: false,
      },
      {
        id: 402,
        title: MapPathToToolName({pathName: "rpbg"}),
        path: "/rpbg",
        newTab: false,
      },
      // {
      //   id: 403,
      //   title: "Blog Grid Page",
      //   path: "/blog",
      //   newTab: false,
      // },
      // {
      //   id: 404,
      //   title: "Blog Sidebar Page",
      //   path: "/blog-sidebar",
      //   newTab: false,
      // },
      // {
      //   id: 405,
      //   title: "Blog Details Page",
      //   path: "/blog-details",
      //   newTab: false,
      // },
      //{
        //id: 408,
        //title: "视频换脸",
        //path: "/roop",
        //newTab: false,
      //},
    ],
  },
  {
    id: 3,
    title: "Pricing",
    path: "/pricing",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    // path: "/about",
    newTab: false,
    submenu: [
      {
        id: 201,
        title: "About Us",
        path: "/about",
        newTab: false,
      },
      {
        id: 202,
        title: "Contact Us",
        path: "/contact",
        newTab: false,
      },
      {
        id: 203,
        title: "Tool Examples",
        path: "/example",
        newTab: false,
      },
      {
        id: 204,
        title: "FAQ",
        path: "/faq",
        newTab: false,
      },
    ],
  },
  // {
  //   id: 33,
  //   title: "Blog",
  //   path: "/blog",
  //   newTab: false,
  // },
  // {
  //   id: 3,
  //   title: "Contact Us",
  //   path: "/contact",
  //   newTab: false,
  // },
];
export default menuData;
