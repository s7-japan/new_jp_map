"use client";
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    // Redirect to the specified URL when the page loads
    window.location.href = "https://redlight-one.vercel.app/";
  }, []);

  return null; // No need to render anything since the user is redirected
};

export default Page;
