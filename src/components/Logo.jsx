import React from "react";
import logo from "../assets/logo.png";

const Logo = ({ width }) => {
  return (
    <div>
      <img src={logo} alt="" width={width} />
    </div>
  );
};

export default Logo;
