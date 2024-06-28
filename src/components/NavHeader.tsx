import React from "react";
import Image from "next/image";
import logo from "/public/images/logo_small.png";
interface NavHeaderProps {}

export const NavHeader: React.FC<NavHeaderProps> = () => {
  return (
    <header className="flex flex-1 justify-center p-10 align-middle">
      <Image src={logo} alt="logo" />
    </header>
  );
};
