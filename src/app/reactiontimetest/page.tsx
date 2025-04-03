import RedLight from "@/components/RedLight";
import React from "react";

const page = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        padding: 0,
        margin: 0,
        overflow: "hidden",
        position: "fixed", // Use fixed instead of relative
        top: 0,
        left: 0,
        touchAction: "none", // Disable browser handling of all touch gestures
      }}
    >
      <RedLight />
    </div>
  );
};

export default page;
