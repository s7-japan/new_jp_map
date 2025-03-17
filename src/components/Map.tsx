"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import L, { LatLngBoundsExpression, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import F1Map from "../assets/f1-map_image.png";
import BgImage from "../assets/bg-image.png";
import MapIcon from "../assets/map-icons/mapicon_.png";
import jpData from "../assets/jp_data.json"; // Import the JSON data directly
import { Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";

// Define the precise type for the JSON data
interface MapItem {
  category: string;
  article_type: "モーダル" | "ピン" | "エリア紹介";
  title: string;
  sub_title: string;
  content_text: string;
  coordinates: string; // e.g., "(34.8468125, 136.5383125)"
}

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const ImageOverlay = dynamic(
  () => import("react-leaflet").then((mod) => mod.ImageOverlay),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const MAP_DIMENSIONS = { width: 1200, height: 1770 };
const pixelBounds: LatLngBoundsExpression = [
  [0, 0],
  [MAP_DIMENSIONS.width, MAP_DIMENSIONS.height],
];

const LAT_MIN = 34.838;
const LAT_MAX = 34.855;
const LNG_MIN = 136.52;
const LNG_MAX = 136.545;

// Optional: If you still need LoadJSONAndProcess to process data
const LoadJSONAndProcess = (): MapItem[] => {
  return jpData as MapItem[]; // Simply return the imported JSON, cast to MapItem[]
};

const Map = () => {
  const [zoom, setZoom] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const processedData: MapItem[] = LoadJSONAndProcess(); // Use the typed data
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const markerIcon = new L.Icon({
    iconUrl: MapIcon.src,
    iconSize: [25, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const zoomIn = () => setZoom((prev) => Math.min(prev + 1, 3));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 1, -2));

  useEffect(() => {
    if (mapRef.current) {
      const overlay = document.querySelector(
        ".leaflet-image-layer"
      ) as HTMLElement;
      if (overlay) {
        overlay.style.transform = "rotate(-90deg)";
        overlay.style.transformOrigin = "center center";
        overlay.style.width = `${MAP_DIMENSIONS.height}px`;
        overlay.style.height = `${MAP_DIMENSIONS.width}px`;
        overlay.style.left = `${
          (MAP_DIMENSIONS.width - MAP_DIMENSIONS.height) / 2
        }px`;
        overlay.style.top = `${
          (MAP_DIMENSIONS.height - MAP_DIMENSIONS.width) / 2
        }px`;
      }
    }
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        aspectRatio: "1770 / 1200",
        backgroundImage: `url(${BgImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <MapContainer
        crs={L.CRS.Simple}
        bounds={pixelBounds}
        center={[MAP_DIMENSIONS.width / 2, MAP_DIMENSIONS.height / 2]}
        zoom={zoom}
        minZoom={-2}
        maxZoom={3}
        scrollWheelZoom={true}
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "transparent",
          zIndex: 0,
        }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <ImageOverlay url={F1Map.src} bounds={pixelBounds} />
        {processedData.map((item: MapItem, index: number) => {
          const [lat, lng] = item.coordinates
            .replace(/[()]/g, "")
            .split(",")
            .map((coord: string) => parseFloat(coord.trim()));

          const x =
            ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * MAP_DIMENSIONS.width;
          const y =
            ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * MAP_DIMENSIONS.height;

          const rotatedX = y;
          const rotatedY = MAP_DIMENSIONS.width - x;

          console.log(
            `${item.title}: Lat=${lat}, Lng=${lng}, RotatedX=${rotatedX}, RotatedY=${rotatedY}`
          );

          if (
            rotatedX < 0 ||
            rotatedX > MAP_DIMENSIONS.height ||
            rotatedY < 0 ||
            rotatedY > MAP_DIMENSIONS.width
          ) {
            console.warn(
              `${item.title} is out of bounds: X=${rotatedX}, Y=${rotatedY}`
            );
            return null;
          }

          return (
            <Marker
              key={`${item.title}-${index}`}
              position={[rotatedY, rotatedX]}
              icon={markerIcon}
            >
              <Popup>{item.title}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div className="flex flex-col gap-2 absolute bottom-[150px] right-10 z-20">
        <Button
          onClick={zoomIn}
          aria-label="Zoom in"
          variant="default"
          className="bg-white text-black"
        >
          <Plus fill="#000000" size={30} />
        </Button>
        <Button
          onClick={zoomOut}
          aria-label="Zoom out"
          variant="default"
          className="bg-white text-black"
        >
          <Minus fill="#000000" size={30} />
        </Button>
      </div>

      <style jsx global>{`
        .leaflet-container {
          background-color: transparent !important;
          z-index: 0 !important;
        }
        .leaflet-pane,
        .leaflet-top,
        .leaflet-bottom {
          z-index: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default Map;
