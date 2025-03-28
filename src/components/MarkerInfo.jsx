import React, { useState, useRef } from "react";
import Image from "next/image";

const MarkerInfo = ({ item, onBack }) => {
  console.log(item);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const sliderRef = useRef(null);

  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === item["Top Image"].length - 1 ? 0 : prevIndex + 1
    );
    setTranslateX(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? item["Top Image"].length - 1 : prevIndex - 1
    );
    setTranslateX(0);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setTranslateX(0);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
    if (touchStart !== null) {
      const distance = e.targetTouches[0].clientX - touchStart;
      setTranslateX(distance);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    } else {
      setTranslateX(0);
    }
  };

  const onMouseDown = (e) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
  };

  const onMouseMove = (e) => {
    if (touchStart !== null) {
      setTouchEnd(e.clientX);
      const distance = e.clientX - touchStart;
      setTranslateX(distance);
    }
  };

  const onMouseUp = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    } else {
      setTranslateX(0);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Function to determine font based on content
  const getFontFamily = (text) => {
    if (!text || text === "-") return "JPFont"; // Default to JPFont if no content
    return /^[A-Za-z\s]+$/.test(text) ? "CustomFont" : "JPFont";
  };

  // Function to process the article content with proper line breaks and dynamic fonts
  const renderArticleContent = (content) => {
    if (!content || content === "-") return "No content available.";

    // Split the content by \r\n
    const paragraphs = content.split("\r\n");

    return paragraphs.map((paragraph, index) => {
      // If the paragraph is empty (result of consecutive \r\n), add extra spacing
      if (paragraph.trim() === "" && index !== paragraphs.length - 1) {
        return <div key={index} className="paragraph-break" />;
      }
      // Render non-empty paragraphs with dynamic font
      if (paragraph.trim() !== "") {
        const fontClass = getFontFamily(paragraph);
        return (
          <p key={index} className={`paragraph ${fontClass}`}>
            {paragraph}
          </p>
        );
      }
      return null;
    });
  };

  const totalTransform =
    -(currentIndex * 100) + (translateX / window.innerWidth) * 100;

  // Filteration array of the objects
  const data = [
    {
      Title: "西エリア",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat4",
    },
    {
      Title: "G席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat2",
    },
    {
      Title: "D席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat5",
    },
    {
      Title: "E席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat5",
    },
    {
      Title: "C席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat1",
    },
    {
      Title: "H席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat4",
    },
    {
      Title: "I席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat4",
    },
    {
      Title: "Q1席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat2",
    },
    {
      Title: "A1席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat3",
    },
    {
      Title: "B1席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat1",
    },
    {
      Title: "R席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat2",
    },
    {
      Title: "S席（ファミリーシート）S-BOX",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat2",
    },
    {
      Title: "B2席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat1",
    },
    {
      Title: "Q2席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat2",
    },
    {
      Title: "A2席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat3",
    },
    {
      Title: "V1席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat3",
    },
    {
      Title: "V2席",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat3",
    },
    {
      Title: "VIPスイート・プレミアム",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat3",
    },
    {
      Title: "GRAN VIEW",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat2",
    },
    {
      Title: "R-BOX",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat2",
    },
    {
      Title: "Formula 1 Paddock Club™",
      Link: "https://app.dialogue.jp/v1/lineLogin/auth/414a525aca27bd6661index=20250329appC1openchat3",
    },
  ];

  const triggerURL = (url) => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;

    document.body.appendChild(iframe);

    console.log("working");
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };
  const handleClick = (Title, redirectionLink) => {
    // Find the object in the array that matches the Title
    const filteredObject = data.find((obj) => obj.Title === Title);

    const link = filteredObject ? filteredObject.Link : null;
    // If a matching object is found, use its Link property
    triggerURL(link);

    window.open(redirectionLink, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-[2000] h-full">
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-5 right-5 flex items-center gap-2 duration-200"
        >
          <Image src="/images/Cross.svg" width={30} height={30} alt="Close" />
        </button>
      )}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl px-3 py-6 m-4 relative h-[75%] MyCustomFont">
        <div className="px-3 overflow-auto relative w-full h-full style-2">
          {item["Top Image"] !== "-" &&
          Array.isArray(item["Top Image"]) &&
          item["Top Image"].length > 0 ? (
            <div className="relative">
              {item["Top Image"].length > 1 ? (
                <div className="custom-slider">
                  <div
                    className="slider-wrapper"
                    ref={sliderRef}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    style={{
                      transform: `translateX(${totalTransform}%)`,
                    }}
                  >
                    {item["Top Image"].map((image, index) => (
                      <div key={index} className="slide">
                        <img
                          src={image}
                          alt={`${item.Title} - ${index + 1}`}
                          className="rounded-sm h-[11rem] w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end items-center mt-2 mr-2">
                    <div className="dots-container">
                      {item["Top Image"].map((_, index) => (
                        <span
                          key={index}
                          className={`dot ${
                            index === currentIndex ? "active" : ""
                          }`}
                          onClick={() => goToSlide(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <img
                    src={item["Top Image"][0]}
                    alt={item.Title}
                    width={800}
                    height={400}
                    className="rounded-sm h-[11rem] w-full object-cover"
                  />
                </div>
              )}
            </div>
          ) : null}

          {item["Article Format"] === "Facility" && (
            <div
              className={`mt-5 w-[100%] text-xl font-extrabold ${getFontFamily(
                item["Title"]
              )}`}
            >
              {item["Title"]}
            </div>
          )}

          {item["Article Format"] === "Area Introduction" && (
            <>
              <div
                className={`mt-5 w-full bg-[#08c757] text-center text-white px-5 py-3 flex flex-col justify-center items-center rounded-full cursor-pointer ${getFontFamily(
                  item["Line Button Text (If Area Introduction format)"]
                )}`}
                onClick={() => {
                  handleClick(item["Title"], item["Line Button URL"]);
                }}
              >
                {item["Line Button Text (If Area Introduction format)"]
                  .split("\r\n")
                  .map((line, index) => (
                    <span
                      key={index}
                      className={`block ${getFontFamily(line)}`}
                    >
                      {line}
                    </span>
                  ))}
              </div>
              {item["Title"] !== "-" && (
                <div
                  className={`text-xl text-black mt-5 w-full font-extrabold ${getFontFamily(
                    item["Title"]
                  )}`}
                >
                  {item["Title"]}
                </div>
              )}
            </>
          )}

          {item["Sub Title"]?.trim() !== "-" &&
            item["Article Format"] !== "Area Introduction" && (
              <div
                className={`text-lg text-black mt-5 font-bold w-full ${getFontFamily(
                  item["Sub Title"]
                )}`}
              >
                {item["Sub Title"] ?? "No Subtitle Available"}
              </div>
            )}

          <div className="text-black my-5 font-normal w-full font-[JPFont]">
            {renderArticleContent(item["Article Content"])}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-slider {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: right;
        }

        .slider-wrapper {
          display: flex;
          transition: transform 0.3s ease-in-out;
          user-select: none;
          -webkit-user-select: none;
          -webkit-touch-callout: none;
          will-change: transform;
        }

        .slide {
          flex: 0 0 100%;
          padding: 0 10px;
        }

        .dots-container {
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background-color: #d1d5db;
          border-radius: 0;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .dot.active {
          background-color: gray;
        }

        .style-2::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: #f5f5f5;
        }

        .style-2::-webkit-scrollbar {
          border-radius: 10px;
          width: 12px;
          background-color: #f5f5f5;
        }

        .style-2::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: gray;
        }

        .paragraph {
          margin-bottom: 1rem; /* Single line break spacing */
        }

        .paragraph-break {
          margin-bottom: 2rem; /* Double line break spacing for paragraphs */
        }

        .CustomFont {
          font-family: "CustomFont", sans-serif;
        }

        .JPFont {
          font-family: "JPFont", sans-serif;
        }
      `}</style>
    </div>
  );
};

export default MarkerInfo;
