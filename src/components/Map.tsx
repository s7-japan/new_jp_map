/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import jpData from "../assets/jp_data.json";
import { Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { UserLocation } from "./user-location";
import { useMap, useMapEvents } from "react-leaflet";

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
import SeatGuide from "../assets/map-icons/mapicon_smokingarea.png";
import TaxiArea from "../assets/map-icons/mapicon_taxi.png";
import TicketCounter from "../assets/map-icons/mapicon_ticket.png";
import WaterStation from "../assets/map-icons/mapicon_waterstation.png";
import WestCourseShuttle from "../assets/map-icons/mapicon_westcourceshuttlestop.png";
import MapIcon from "../assets/map-icons/mapicon_.png";
import MapIconCar from "../assets/map-icons/mapicon_car.png";
import MapIconSmoking from "../assets/map-icons/mapicon_smokingarea.png";

const ICONS = {
  アトラクション: MapIconAttraction,
  チケット: TicketCounter,
  ゲート: MapGate,
  タクシー: TaxiArea,
  車: MapIconCar,
  バス: WestCourseShuttle,
  イベント: MapEvent,
  インフォメーション: MapIconAttraction,
  座席エリア: SeatGuide,
  救護所: FirstAidStation,
  喫煙所: MapIconSmoking,
  レストラン: MapIconAttraction,
  自動現金引出機: ATMIcon,
  駐輪場: BicyclePark,
  授乳室: NursingHome,
  多機能トイレ: RestRoom,
  コインロッカー: CoinLockers,
  給水所: WaterStation,
  化粧室: ToiletIcon,
  西コースシャトル停留所: WestCourseShuttle,
  駐車場: MapIconCar,
  オフィシャルグッズ販売: MapIconAttraction,
};

interface MapItem {
  category: string;
  article_type: "モーダル" | "ピン" | "エリア紹介";
  title: string;
  sub_title: string;
  content_text: string;
  coordinates: string;
  pixel_coordinates?: string;
}

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
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const parseContentText = (text: string) => {
  if (!text) return null;
  const sections: { header: string; items: string[] }[] = [];
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  let currentSection: { header: string; items: string[] } | null = null;
  lines.forEach((line) => {
    if (line.startsWith("【") && line.endsWith("】")) {
      if (currentSection) sections.push(currentSection);
      currentSection = { header: line.slice(1, -1), items: [] };
    } else if (currentSection) {
      currentSection.items.push(line);
    } else {
      if (!currentSection) currentSection = { header: "", items: [] };
      currentSection.items.push(line);
    }
  });
  if (currentSection) sections.push(currentSection);
  return sections.length > 0 ? sections : null;
};

const LoadJSONAndProcess = (): MapItem[] => {
  const data = jpData as MapItem[];
  return data;
};

const ZoomControl = () => {
  const map = useMap();

  const zoomIn = () => {
    const currentZoom = map.getZoom();
    map.setZoom(currentZoom + 1);
  };

  const zoomOut = () => {
    const currentZoom = map.getZoom();
    map.setZoom(currentZoom - 1);
  };

  return (
    <div className="flex flex-col gap-2 absolute bottom-[200px] right-10 z-[1000]">
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
}: {
  userPosition: [number, number] | null;
}) => {
  const map = useMap();

  const centerOnUser = () => {
    if (!userPosition) {
      alert("Location not yet available. Please wait or enable tracking.");
      return;
    }
    map.setView(userPosition, 16);
  };

  return (
    <div
      onClick={centerOnUser}
      className="absolute bottom-[300px] right-10 z-[1000] bg-white p-2 rounded-full shadow-md cursor-pointer text-black hover:bg-black hover:text-white active:bg-black active:text-white"
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

const Map = () => {
  const [isClient, setIsClient] = useState(false);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(15);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );
  const processedData: MapItem[] = LoadJSONAndProcess();

  useEffect(() => {
    setIsClient(true);

    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser.");
      return;
    }

    // Start continuous tracking
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPosition: [number, number] = [latitude, longitude];
        setUserPosition(newPosition);
        setShowUserLocation(true);
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

    // Cleanup on unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
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

  const MapEvents = () => {
    const map = useMapEvents({
      zoomend: () => {
        setZoomLevel(map.getZoom());
      },
    });
    return null;
  };

  if (!isClient) return <div>Loading map...</div>;

  const ZOOM_OUT_THRESHOLD = 12;
  const ZOOM_MEDIUM_THRESHOLD = 15;

  const isImportantMarker = (item: MapItem) => {
    const importantCategories = ["救護所", "ゲート", "チケット"];
    return importantCategories.includes(item.category);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <MapContainer
        center={[34.8468125, 136.5383125]}
        zoom={15}
        minZoom={13}
        maxZoom={18}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {processedData.map((item: MapItem, index: number) => {
          const [lat, lng] = item.coordinates
            .replace(/[()]/g, "")
            .split(",")
            .map(Number);

          if (isNaN(lat) || isNaN(lng)) {
            console.warn(
              `${item.title} has invalid coordinates: ${item.coordinates}`
            );
            return null;
          }

          if (zoomLevel <= ZOOM_OUT_THRESHOLD) return null;
          else if (
            zoomLevel <= ZOOM_MEDIUM_THRESHOLD &&
            !isImportantMarker(item)
          )
            return null;

          const contentSections = parseContentText(item.content_text);

          return (
            <Marker
              key={`${item.title}-${index}`}
              position={[lat, lng]}
              icon={getMarkerIcon(item.category)}
            >
              <Popup>
                <div>
                  <h3>{item.title}</h3>
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <strong>Type:</strong> {item.article_type}
                  </p>
                  {contentSections && contentSections.length > 0 && (
                    <div className="content-sections">
                      {contentSections.map((section, idx) => (
                        <div key={idx} className="content-section">
                          {section.header && <h4>[{section.header}]</h4>}
                          <ul>
                            {section.items.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
        <UserLocation
          mapWidth={1770}
          mapHeight={2400}
          isVisible={showUserLocation}
          position={userPosition}
        />
        <ZoomControl />
        <CurrentLocationButton userPosition={userPosition} />
        <MapEvents />
      </MapContainer>

      <style jsx global>{`
        .leaflet-container {
          z-index: 0 !important;
        }
        .leaflet-pane,
        .leaflet-top,
        .leaflet-bottom {
          z-index: 0 !important;
        }
        .leaflet-popup-content-wrapper {
          padding: 15px;
          border-radius: 8px;
          min-width: 300px;
          max-width: 400px;
          font-family: Arial, sans-serif;
        }
        .leaflet-popup-content h3 {
          margin: 0 0 10px;
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }
        .leaflet-popup-content p {
          margin: 5px 0;
          font-size: 14px;
          color: #333;
        }
        .leaflet-popup-content .content-sections {
          margin-top: 10px;
        }
        .leaflet-popup-content .content-section {
          margin-bottom: 10px;
        }
        .leaflet-popup-content h4 {
          margin: 10px 0 5px;
          font-size: 14px;
          font-weight: bold;
          color: #333;
        }
        .leaflet-popup-content ul {
          margin: 0;
          padding-left: 0;
          font-size: 14px;
          color: #333;
        }
        .leaflet-popup-content li {
          margin-bottom: 5px;
          list-style: none;
        }
        .leaflet-popup-content li:before {
          content: "・";
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

export default Map;
