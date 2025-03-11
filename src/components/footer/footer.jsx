import React from "react";
import {
  Footer,
} from "flowbite-react";
function Footerx() {
  return (
    
      <Footer container className="flex justify-between z-40 shadow-amber-100  shadow-2xl  w-full items-center h-14 fixed bottom-0 bg-gray-900 text-white opacity-100 left-0">
        <Footer.Copyright href="#" by="ayushKapruwan" year={2025} />
        <Footer.LinkGroup className="flex flex-row gap-1 mr-5">
          <Footer.Link href="#" className=" no-underline hover:rounded-4xl hover:bg-amber-100/100 hover:text-black p-2">About</Footer.Link>
          <Footer.Link href="#" className=" no-underline hover:rounded-4xl hover:bg-amber-100/100 hover:text-black p-2 ">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    
  );
}

export default Footerx;
