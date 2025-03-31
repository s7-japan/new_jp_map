/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import jpData from "../assets/data.json";
import { Plus, Minus, X } from "lucide-react";
import { Button } from "./ui/button";
import MarkerInfo from "./MarkerInfo";
import { UserLocation } from "./user-location";
import { useMap, useMapEvents } from "react-leaflet";

// Icons imports (unchanged)
import FirstAidStation from "../assets/map-icons/mapicon_aidstation.png";
import ATMIcon from "../assets/map-icons/mapicon_atm.png";
import MapIconAttraction from "../assets/map-icons/mapicon_attraction.png";
import BicyclePark from "../assets/map-icons/mapicon_bicycleparking.png";
import CoinLockers from "../assets/map-icons/mapicon_coinlocker.png";
import MapEvent from "../assets/map-icons/mapicon_event.png";
import MapGate from "../assets/map-icons/mapicon_gate.png";
import ToiletIcon from "../assets/map-icons/mapicon_multipurposetoilet.png";
import NursingHome from "../assets/map-icons/mapicon_nursingroom.png";
import RestRoom from "../assets/map-icons/mapicon_restroom.png";
import Restaurants from "../assets/map-icons/mapicon_restaurant.png";
import SeatGuide from "../assets/map-icons/mapicon_seatguide.png";
import TaxiArea from "../assets/map-icons/mapicon_taxi.png";
import TicketCounter from "../assets/map-icons/mapicon_ticket.png";
import WaterStation from "../assets/map-icons/mapicon_waterstation.png";
import WestCourseShuttle from "../assets/map-icons/mapicon_westcourceshuttlestop.png";
import MapIcon from "../assets/map-icons/mapicon_.png";
import MapIconCar from "../assets/map-icons/mapicon_car.png";
import MapIconSmoking from "../assets/map-icons/mapicon_smokingarea.png";
import Official_Goods_Shop from "../assets/map-icons/mapicon_officialgoodsshop.png";
import MapIconInfo from "../assets/map-icons/mapicon_Information.png";

const ICONS = {
  Ticket: TicketCounter,
  Attraction: MapIconAttraction,
  Gate: MapGate,
  Taxi: TaxiArea,
  Car: MapIconCar,
  Bus: WestCourseShuttle,
  Event: MapEvent,
  Information: MapIconInfo,
  "Seat Guide": SeatGuide,
  "Aid Station": FirstAidStation,
  "Smoking Area": MapIconSmoking,
  Restaurants: Restaurants,
  ATM: ATMIcon,
  "Bicycle Parking": BicyclePark,
  "Nursing Room": NursingHome,
  "Multi-purpose Toilet": ToiletIcon,
  Restroom: RestRoom,
  "Coin Locker": CoinLockers,
  "Water Station": WaterStation,
  "West Course Shuttle Stop": WestCourseShuttle,
  Parking: MapIconCar,
  "Official Goods Shop": Official_Goods_Shop,
};

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2000] bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between max-w-sm w-full">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close notification"
      >
        <X size={20} />
      </button>
    </div>
  );
};

const LoadJSONAndProcess = () => {
  const data = jpData;
  return data;
};

const ZoomControl = () => {
  const map = useMap();
  const ZOOM_LEVELS = [13, 15, 20];

  const zoomIn = () => {
    const currentZoom = map.getZoom();
    const currentIndex = ZOOM_LEVELS.indexOf(currentZoom);
    const nextIndex = Math.min(currentIndex + 1, ZOOM_LEVELS.length - 1);
    map.setZoom(ZOOM_LEVELS[nextIndex]);
  };

  const zoomOut = () => {
    const currentZoom = map.getZoom();
    const currentIndex = ZOOM_LEVELS.indexOf(currentZoom);
    const prevIndex = Math.max(currentIndex - 1, 0);
    map.setZoom(ZOOM_LEVELS[prevIndex]);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={zoomIn} aria-label="Zoom in">
        <Plus size={15} />
      </Button>
      <Button onClick={zoomOut} aria-label="Zoom out">
        <Minus size={15} />
      </Button>
    </div>
  );
};

const CurrentLocationButton = ({ userPosition, onOutOfRange }) => {
  const map = useMap();

  const centerOnUser = () => {
    if (!userPosition) {
      alert("Location not yet available. Please wait or enable tracking.");
      return;
    }

    const [lat, lng] = userPosition;
    const isWithinBounds =
      lat >= 34.83 && lat <= 34.86 && lng >= 136.52 && lng <= 136.56;

    if (isWithinBounds) {
      map.setView(userPosition, 20);
    } else {
      onOutOfRange();
    }
  };

  return (
    <div
      onClick={centerOnUser}
      className="bg-white p-2 rounded-full shadow-md cursor-pointer text-black hover:bg-black hover:text-white active:bg-black active:text-white"
      title="Center on my current location"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    </div>
  );
};

const isEnglish = (char) => {
  const code = char.charCodeAt(0);
  return (
    (code >= 0x0041 && code <= 0x005a) || // A-Z
    (code >= 0x0061 && code <= 0x007a) // a-z
  );
};

const Map = () => {
  const [isClient, setIsClient] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(15);
  const [userPosition, setUserPosition] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [pinPopup, setPinPopup] = useState(null);
  const [swipeCount, setSwipeCount] = useState(0);
  const [activeMarker, setActiveMarker] = useState(null);
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const processedData = LoadJSONAndProcess();

  const BOUNDING_BOX = {
    minLat: 34.83,
    maxLat: 34.86,
    minLng: 136.52,
    maxLng: 136.56,
  };

  const mapBounds = L.latLngBounds(
    [BOUNDING_BOX.minLat, BOUNDING_BOX.minLng],
    [BOUNDING_BOX.maxLat, BOUNDING_BOX.maxLng]
  );

  useEffect(() => {
    setIsClient(true);

    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Unable to track your location: ";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Permission denied.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += "The request timed out.";
            break;
          default:
            errorMessage += "An unknown error occurred.";
        }
        console.warn(errorMessage);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        pinPopup
      ) {
        closePinPopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      navigator.geolocation.clearWatch(watchId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pinPopup]);

  useEffect(() => {
    Object.values(ICONS).forEach((icon) => {
      const img = new Image();
      img.src = icon.src;
    });
  }, []);

  // Popup position sync with zero delay
  useEffect(() => {
    if (!pinPopup || !mapRef.current || !popupRef.current) return;

    const map = mapRef.current;
    const popupElement = popupRef.current;

    const updatePopupPosition = () => {
      const [lat, lng] = pinPopup.Locations.replace(/[()]/g, "")
        .split(",")
        .map(Number);
      const point = map.latLngToContainerPoint([lat, lng]);
      popupElement.style.left = `${point.x}px`;
      popupElement.style.top = `${point.y - 40}px`; // Adjust offset as needed
    };

    map.on("move", updatePopupPosition);
    map.on("zoom", updatePopupPosition);
    updatePopupPosition(); // Initial position

    return () => {
      map.off("move", updatePopupPosition);
      map.off("zoom", updatePopupPosition);
    };
  }, [pinPopup]);

  // Swipe functionality
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = true;
      } else {
        isSwiping = false;
      }
    };

    const handleTouchMove = (e) => {
      if (!pinPopup || !isSwiping || e.touches.length > 1) return;

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
        setSwipeCount((prev) => {
          const newCount = prev + 1;
          if (newCount === 2) {
            closePinPopup();
            return 0;
          }
          return newCount;
        });
        isSwiping = false;
      }
    };

    const handleTouchEnd = () => {
      isSwiping = false;
    };

    if (pinPopup) {
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      setSwipeCount(0);
    };
  }, [pinPopup]);

  const getMarkerIcon = useMemo(() => {
    const iconCache = {};
    return (category) => {
      if (!iconCache[category]) {
        const iconSrc = ICONS[category] || MapIcon;
        iconCache[category] = new L.Icon({
          iconUrl: iconSrc.src,
          iconSize: [25, 40],
          iconAnchor: [12.5, 40],
          popupAnchor: [0, -40],
        });
      }
      return iconCache[category];
    };
  }, []);

  const handleMarkerClick = (item) => {
    if (pinPopup) {
      closePinPopup();
    }

    if (item["Article Format"] !== "Pin" && item["Article Content"] !== "-") {
      setSelectedMarker(item);
    } else {
      setPinPopup(item);
      setActiveMarker(item);
      setSwipeCount(0);
    }
  };

  const handleBack = () => {
    setSelectedMarker(null);
  };

  const MapEvents = () => {
    const map = useMapEvents({
      zoomend: () => {
        setZoomLevel(map.getZoom());
      },
    });
    return null;
  };

  const isUserInBounds = userPosition
    ? userPosition[0] >= BOUNDING_BOX.minLat &&
      userPosition[0] <= BOUNDING_BOX.maxLat &&
      userPosition[1] >= BOUNDING_BOX.minLng &&
      userPosition[1] <= BOUNDING_BOX.maxLng
    : false;

  const closePinPopup = () => {
    setPinPopup(null);
    setActiveMarker(null);
    setSwipeCount(0);
  };

  if (!isClient) return <div>Loading map...</div>;

  return (
    <div className="relative w-full h-screen">
      <div
        className={`w-full h-full transition-opacity duration-300 ${
          selectedMarker ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          backgroundImage: "url('/bg-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <MapContainer
          center={[34.8468125, 136.5383125]}
          zoom={15}
          minZoom={13}
          maxZoom={20}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%", zIndex: 0 }}
          fadeAnimation={false}
          renderer={L.canvas()}
          zoomControl={false}
          bounds={mapBounds}
          maxBounds={mapBounds}
          maxBoundsViscosity={1.0}
          ref={(map) => {
            mapRef.current = map;
          }}
        >
          <TileLayer
            url="/suzuka-tiles/{z}/{x}/{y}.png"
            attribution="Suzuka Circuit Map"
            maxZoom={20}
            tileSize={256}
            noWrap={true}
            updateWhenIdle={false}
            keepBuffer={4}
            errorTileUrl="/bg-image.png"
            bounds={mapBounds}
          />

          {processedData.map((item, index) => {
            if (!item.Locations || typeof item.Locations !== "string") {
              console.warn(
                `${item.Title} has missing or invalid coordinates: ${item.Locations}`
              );
              return null;
            }

            const [lat, lng] = item.Locations.replace(/[()]/g, "")
              .split(",")
              .map(Number);

            if (isNaN(lat) || isNaN(lng)) {
              console.warn(
                `${item.Title} has invalid coordinate format: ${item.Locations}`
              );
              return null;
            }

            const isActive =
              activeMarker &&
              activeMarker.Title === item.Title &&
              activeMarker.Locations === item.Locations;

            if (!isActive) {
              if (zoomLevel < 15) {
                return null;
              } else if (
                zoomLevel >= 15 &&
                zoomLevel < 20 &&
                item["Zoom Level"] !== "Medium"
              ) {
                return null;
              }
            }

            return (
              <Marker
                key={`${item.Title}-${index}`}
                position={[lat, lng]}
                icon={getMarkerIcon(item["Icon Category"])}
                eventHandlers={{ click: () => handleMarkerClick(item) }}
                zIndexOffset={isActive ? 1000 : 0}
              />
            );
          })}

          {isUserInBounds && userPosition && (
            <UserLocation
              mapWidth={1770}
              mapHeight={2400}
              isVisible={true}
              position={userPosition}
            />
          )}

          <div className="absolute bottom-52 right-10 z-[1000] flex flex-col items-center gap-2">
            <CurrentLocationButton
              userPosition={userPosition}
              onOutOfRange={() => setShowToast(true)}
            />
            <ZoomControl />
          </div>

          <MapEvents />
        </MapContainer>
      </div>

      {selectedMarker && (
        <div className="absolute inset-0 z-[2000] overflow-auto">
          <MarkerInfo item={selectedMarker} onBack={handleBack} />
        </div>
      )}

      {pinPopup && (
        <div
          ref={popupRef}
          className="fixed z-[1000] bg-white rounded-lg shadow-lg p-4 inline-block whitespace-nowrap animate-fade-in"
          style={{
            transform: "translate(-50%, -120%)",
          }}
        >
          <div className="relative">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">
                {pinPopup.Title.split("").map((char, index) => (
                  <span
                    key={index}
                    className={isEnglish(char) ? "formula1" : "Hiragino"}
                  >
                    {char}
                  </span>
                ))}
              </h3>
              <div className="absolute left-1/2 bottom-0 top-5 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-white"></div>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <Toast
          message="You are outside the map range"
          onClose={() => setShowToast(false)}
        />
      )}

      <style jsx global>{`
        .leaflet-container {
          z-index: 0 !important;
          background: transparent !important;
        }
        .leaflet-pane,
        .leaflet-top,
        .leaflet-bottom {
          z-index: 0 !important;
        }
        .leaflet-tile-pane {
          background: transparent !important;
        }
        .leaflet-tile {
          transition: none !important;
          background: transparent !important;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
          transition: none; /* Remove transition for instant movement */
        }
      `}</style>
    </div>
  );
};

export default Map;
