import React from "react";
import ayImage from "../../assets/ay.jpg";
function Logo({ widthtailwind="w-10", heighttailwind="h-10"}) {
  return (
    <>
      <img
        src={ayImage}
        className={`  ${widthtailwind} mt-0.5 opacity-90 rounded-full ${heighttailwind} `}
        alt=""
      />
    </>
  );
}

export default Logo;
