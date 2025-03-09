import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [page, setPage] = useState<string>("Teams");
  const router = useRouter();
  const pathname = usePathname();
  const pageInfo = [
    {
      name: "Teams",
      path: "/",
    },
    {
      name: "Matches",
      path: "/matches",
    },
    {
      name: "Settings",
      path: "/settings",
    },
  ];

  return (
    <>
      <p className="text-3xl text-center my-2">
        UWA Social Tennis Tournament Organiser
      </p>
      <div aria-label="navbar" className="w-full h-20 bg-theme-blue flex">
        {pageInfo.map((info, index) => (
          <Link
            href={info.path}
            key={index}
            className={`h-full flex-grow flex items-center justify-center ${
              pathname === info.path
                ? "bg-theme-yellow text-black"
                : "bg-theme-blue text-off-white hover:brightness-125"
            }`}
          >
            <p>{info.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
