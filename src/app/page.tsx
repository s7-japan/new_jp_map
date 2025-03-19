import React from "react";

const Page = () => {
  return (
    <div
      style={{
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        margin: 0, // Remove default margins
        padding: "20px", // Keep padding for spacing
        display: "flex", // Use flexbox
        flexDirection: "column", // Stack items vertically
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        textAlign: "center", // Center text within the elements
      }}
    >
      <h1>404 Error</h1>
      <p>
        Please visit this page:{" "}
        <a href="/minimap" style={{ color: "#e00400" }}>
          /minimap
        </a>
      </p>
    </div>
  );
};

export default Page;
