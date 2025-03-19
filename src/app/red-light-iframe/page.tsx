"use client";
import React, { useEffect } from "react";

const IframeRedLight = () => {
  const [width, setWidth] = React.useState<number>(400);
  const [height, setHeight] = React.useState<number>(400);
  useEffect(() => {
    if (window === null) return;
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);
  return (
    <div className="w-[100dvw] h-[100dvh]">
      <iframe
        src="https://redlight-one.vercel.app/"
        width={width}
        height={height}
      ></iframe>
    </div>
  );
};

export default IframeRedLight;
