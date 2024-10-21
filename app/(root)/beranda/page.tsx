import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import konser from "../../../public/images/concert.png"
import Image from "next/image";
import Link from "next/link";

export default function Beranda() {
  return (
    <>
      <Header/>
      <section className=" bg-contain py-5 md:py-10">
        <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full grid grid-cols-1 md:grid-cols-2 gap-5 2xl:gap-5">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px]  xl:text-[58px] xl:leading-[74px]">
            <span className="text-red-500">INOICAIN</span> is provide any ticket and fast connection!
            </h1>
            <p className="font-normal text-[20px] leading-[30px]">Make customers to be easier for ordering their any tickets for anywhere and anytime. Trust our service and always fast!</p>
            <Button size='lg' asChild className="w-full bg-[#001F3F] hover:bg-purple-700 sm: w-fitrounded-full h-[54px] text-[16px] font-normal leading-[24px]">
              <Link href='#events'>Explore Here</Link>
            </Button>
          </div>

          <Image className="rounded-2xl max-h-[70vh] 2xl:max-h-[50vh] object-contain object-center" src={konser} alt="bg-konser"/>

        </div>
      </section>

      <section id="event" className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="font-bold text-[32px] leading-[40px] lg:text-[36px] lg:leading-[44px] xl:text-[40px] xl:leading-[48px];">Trust by <br/>Millions of Events</h2>
        <div className="w-full flex flex-col md:flex-row gap-5 ">
          Search 
          Category
        </div>
      </section>
      
    </>
  );
}
