import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image height={25} width={120} src="/logo.png" alt="logo" />
    </Link>
  );
};

export default LogoIcon;
