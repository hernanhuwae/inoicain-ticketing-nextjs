"use client"
import { NavitemsLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarTicket = () => {

  //Todo: Jika tekan Nav items akan link colour nav item yang ditekan
  const pathname= usePathname()

  return (
    <nav className="">
      <ul className="flex max-md:flex-col gap-5">
        {NavitemsLinks.map((link)=>{
          const isAcvtive=pathname==link.route;
          return(
            <li key={link.route} className={`${isAcvtive&&'text-purple-700'}`}>
              <Link href={link.route}>{link.label}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  );
};

export default NavbarTicket;
