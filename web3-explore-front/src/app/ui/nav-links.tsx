"use client";

import {
  WalletIcon,
  HomeIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: "ERC20",
    href: "/erc20",
  },
  { name: "NFT", href: "/nft" },
  { name: "DEX", href: "/dex" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        // const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500"
            )}
          >
            <p className="md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
