import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { FaBars } from "react-icons/fa";
import { TiTicket } from "react-icons/ti";
import NavbarTicket from "./Navbar";

const NavbarMobileTicket = () => {
  return (
    <nav className="md:hidden mr-3">
      <Sheet>
        <SheetTrigger className="align-middle">
          <FaBars />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-5 bg-white md:hidden">
          <div className="flex ">
            <TiTicket size={30} />
            <h1 className="text-[20px] font-semiboldo">INOICAIN</h1>
          </div>
          <Separator className="border border-b border-gray"/>
          <NavbarTicket/>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default NavbarMobileTicket;
