/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
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
const ICONS = {
  Ticket: TicketCounter,
  Attraction: MapIconAttraction,
  Gate: MapGate,
  Taxi: TaxiArea,
  Car: MapIconCar,
  Bus: WestCourseShuttle,
  Event: MapEvent,
  Information: MapIconAttraction,
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
  // Toilet: ToiletIcon,
  "West Course Shuttle Stop": WestCourseShuttle,
  Parking: MapIconCar,
  "Official Goods Shop": Official_Goods_Shop,
};

interface MapItem {
  "Icon Category": string;
  "Article Format": string;
  "Zoom Level": "Low" | "Medium" | "High";
  Title: string;
  "Sub Title": string;
  "Article Content": string;
  "Line Button Text (If Area Introduction format)": string;
  "Line Button URL": string;
  "Top Image": string;
  Locations: string;
  "Is Location Check Done?": string;
  Remarks: string;
}

// Dynamic imports for react-leaflet components (unchanged)
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

// Toast Component (unchanged)
const Toast: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
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

const LoadJSONAndProcess = (): MapItem[] => {
  const data = jpData as MapItem[];
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
    <div className="flex flex-col gap-2 absolute bottom-[13rem] right-10 z-[1000]">
      <Button onClick={zoomIn} aria-label="Zoom in">
        <Plus size={15} />
      </Button>
      <Button onClick={zoomOut} aria-label="Zoom out">
        <Minus size={15} />
      </Button>
    </div>
  );
};

const CurrentLocationButton = ({
  userPosition,
  onOutOfRange,
}: {
  userPosition: [number, number] | null;
  onOutOfRange: () => void;
}) => {
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
      map.setView(userPosition, 20); // Changed from 16 to 20
    } else {
      onOutOfRange();
    }
  };

  return (
    <div
      onClick={centerOnUser}
      className="absolute bottom-[18rem] right-10 z-[1000] bg-white p-2 rounded-full shadow-md cursor-pointer text-black hover:bg-black hover:text-white active:bg-black active:text-white"
      title="Center on my current location"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
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

const Map: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(15);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );
  const [selectedMarker, setSelectedMarker] = useState<MapItem | null>(null);
  const [showToast, setShowToast] = useState(false);
  const processedData: MapItem[] = LoadJSONAndProcess();

  const BOUNDING_BOX = {
    minLat: 34.83,
    maxLat: 34.86,
    minLng: 136.52,
    maxLng: 136.56,
  };

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
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const getMarkerIcon = (category: string) => {
    const iconSrc = ICONS[category as keyof typeof ICONS] || MapIcon;
    return new L.Icon({
      iconUrl: iconSrc.src,
      iconSize: [25, 40],
      iconAnchor: [12.5, 40],
      popupAnchor: [0, -40],
    });
  };

  const handleMarkerClick = (item: MapItem) => {
    if (item["Article Format"] !== "Pin" && item["Article Content"] !== "-") {
      setSelectedMarker(item);
    }
  };

  const handleBack = () => {
    setSelectedMarker(null);
  };

  const MapEvents = () => {
    const map = useMapEvents({
      zoomend: () => {
        const newZoom = map.getZoom();
        setZoomLevel(newZoom);
        console.log(`Zoom level changed to: ${newZoom}`);
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
        >
          <TileLayer
            url="/suzuka-tiles/{z}/{x}/{y}.png"
            attribution="Suzuka Circuit Map"
            maxZoom={20}
            tileSize={256}
            noWrap={true}
            updateWhenIdle={false}
            keepBuffer={4}
            errorTileUrl=""
          />

          {processedData.map((item: MapItem, index: number) => {
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

            if (zoomLevel < 15) {
              console.log(
                `Filtered out ${item.Title} at zoom ${zoomLevel} (< 15)`
              );
              return null;
            } else if (zoomLevel >= 15 && zoomLevel < 20) {
              if (item["Zoom Level"] !== "Medium") {
                console.log(
                  `Filtered out ${item.Title} at zoom ${zoomLevel} (not Medium)`
                );
                return null;
              }
            }

            return (
              <Marker
                key={`${item.Title}-${index}`}
                position={[lat, lng]}
                icon={getMarkerIcon(item["Icon Category"])}
                eventHandlers={{
                  click: () => handleMarkerClick(item),
                }}
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

          <ZoomControl />
          <CurrentLocationButton
            userPosition={userPosition}
            onOutOfRange={() => setShowToast(true)}
          />
          <MapEvents />
        </MapContainer>
      </div>

      {selectedMarker && (
        <div className="absolute inset-0 z-[2000] overflow-auto">
          <MarkerInfo item={selectedMarker} onBack={handleBack} />
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
      `}</style>
    </div>
  );
};

export default Map;
