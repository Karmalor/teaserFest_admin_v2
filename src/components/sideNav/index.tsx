import {
  CircleDollarSignIcon,
  LibraryBig,
  LineChart,
  MailWarning,
  MessageSquare,
  PartyPopper,
  Settings,
  Shield,
  UserCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

function SideNav() {
  const [formList, setFormList] = useState();
  const { user } = useUser();
  const [percentageFileCreated, setPercentageFileCreated] = useState(0);

  const menuList = [
    {
      id: 1,
      name: "Performers",
      icon: LibraryBig,
      path: "/account/Performers",
    },
    {
      id: 2,
      name: "Post Calendar",
      icon: PartyPopper,
      path: "/account/PostCalendar",
    },
    {
      id: 3,
      name: "Post Uploader",
      icon: LineChart,
      path: "/account/PostUploader",
    },
  ];

  const path = usePathname();

  return (
    <div className="mx-4 shadow-sm border border-black bg-background rounded-md">
      <div className="p-5">
        {menuList.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer  
              ${path == menu.path ? "bg-primary text-white" : "text-gray-600"}
          `}
          >
            <menu.icon />
            {menu.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
