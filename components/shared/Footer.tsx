import { TiTicket } from "react-icons/ti";

const Footer = () => {
  return (
    <footer className="border t border-gray-200">
      <div className="flex flex-col">
        <div className="flex">
          <TiTicket size={50} />
          <h1 className="text-[30px] font-semiboldo">INOICAIN</h1>
        </div>
        <p>Inoicain Ticketing officially 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
