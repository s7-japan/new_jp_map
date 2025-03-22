import React from "react";
import Image from "next/image";

const MarkerInfo = ({ item, onBack }) => {
  console.log(item);
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-[2000] h-screen">
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-5 right-5 flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors duration-200"
        >
          <Image src="/images/Cross.svg" width={30} height={30} alt="Close" />
        </button>
      )}
      <div></div>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 m-4 relative h-[80%] overflow-auto MyCustomFont">
        {/* Content */}
        <div className="mt-8">
          <div>
            {item["Top Image"] !== "-" && (
              <div>
                <Image
                  src={item["Top Image"]}
                  alt={item.Title}
                  width={800}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>

          {item["Article Format"] == "Facility" && (
            <div className="mt-5 w-[60%]">{item["Title"]}</div>
          )}
          {item["Article Format"] == "Area Introduction" && (
            <div
              className="mt-5 w-full bg-[#08c757] text-center text-white px-5 py-3 flex justify-center items-center rounded-full"
              onClick={() => {
                window.open(item["Line Button URL"], "_blank");
              }}
            >
              {item["Line Button Text (If Area Introduction format)"]}
            </div>
          )}
          <div className=" text-black mt-5">{item.Title}</div>
          {item["Sub Title"] !== "-" && (
            <div className="text-lg text-black mt-5">{item["Sub Title"]}</div>
          )}
          <p className="text-black my-5">
            {item["Article Content"] || "No content available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarkerInfo;
