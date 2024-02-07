import Image from "next/image";
import React, { useState } from "react";

const Memory = ({ title, imgSrc, date, description, likeNumber }) => {
  const [curHold, setCurHold] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setCurHold(true);
      }}
      onMouseLeave={() => {
        setCurHold(false);
      }}
      className={`box ${curHold ? "hold" : ""}`}
    >
      <div className={"imageContainer"}>
        <Image
          className="img"
          src={imgSrc}
          alt="Box Image"
          width={200}
          height={100}
        />
        <div className={"imageText"}>{title}</div>
      </div>
    </div>
  );
};

export default Memory;
