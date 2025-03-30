import React from "react";

const MixedText = ({ text }: { text: string }) => {
  const splitText = (input: string) => {
    if (!input) return null; // Handle empty input gracefully

    return input.split(/\n/).map((line, lineIndex, array) => (
      <React.Fragment key={lineIndex}>
        {line.split(/([\w\d\s]+)/).map((part, index) => {
          const isEnglish = /^[\w\d\s]+$/.test(part);
          return (
            <span
              key={index}
              style={{
                fontFamily: isEnglish ? "CustomFont" : "JPFont",
              }}
              className="text-[9px] h-[90%] flex justify-center items-center text-center font-extrabold"
            >
              {part}
            </span>
          );
        })}
        {lineIndex < array.length - 1 && <br />}{" "}
        {/* Add <br /> only if there's another line */}
      </React.Fragment>
    ));
  };

  return <p className="text">{splitText(text)}</p>;
};

export default MixedText;
