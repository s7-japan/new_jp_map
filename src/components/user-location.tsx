// user-location.tsx
import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

interface UserLocationProps {
  mapWidth: number;
  mapHeight: number;
  isVisible: boolean;
}

export const UserLocation: React.FC<UserLocationProps> = ({ isVisible }) => {
  const map = useMap();
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Custom user location icon with smaller dimensions
  const userIcon = L.divIcon({
    className: "user-location-icon",
    html: `
      <div class="box">
        <div class="circle">
          <div class="inner"></div>
          <div class="highlight"></div>
        </div>
        <div class="square"></div>
      </div>
      <div class="shadow"></div>
      <style>
        .box {
          width: 40px;
          height: 40px;
          background: none;
          animation: updown 1s ease 0.2s infinite;
          position: relative;
        }
        .circle {
          position: relative;
          background-color: #ef2929;
          width: 40px;
          height: 40px;
          margin: auto;
          padding: 0;
          top: 13px;
          border-radius: 50%;
        }
        .inner {
          position: relative;
          background-color: white;
          width: 13px;
          height: 13px;
          margin: auto;
          padding: 0;
          top: 13px;
          border-radius: 50%;
          z-index: 3;
        }
        .highlight {
          position: relative;
          width: 39px;
          height: 40px;
          margin: auto;
          padding: 0;
          z-index: 3;
          top: -14px;
          left: 0.4px;
          border-radius: 50%;
          border-top: #ff7676 2px solid;
          transform: rotate(30deg);
        }
        .square {
          position: relative;
          background-color: #ef2929;
          width: 20px;
          height: 20px;
          margin: auto;
          padding: 0;
          bottom: 2px;
          transform: rotate(-45deg);
          z-index: 2;
          border-bottom-left-radius: 3px;
        }
       
        @keyframes updown {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(3px); }
          100% { transform: translateY(0px); }
        }
       
      </style>
    `,
    iconSize: [40, 52], // Width: 40px, Height: 40px circle + shadow at 46px + buffer
    iconAnchor: [20, 52], // Anchor at bottom center (tip of the pin)
    popupAnchor: [0, -52], // Popup above the icon
  });

  useEffect(() => {
    if (!isVisible) return;

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    // Get initial position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (err) => {
        setError(err.message);
        console.error("Geolocation error:", err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    // Watch position for updates
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (err) => {
        setError(err.message);
        console.error("Geolocation watch error:", err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [isVisible, map]);

  // Center map on user location when position updates
  useEffect(() => {
    if (position && isVisible) {
      map.setView(position, map.getZoom());
    }
  }, [position, map, isVisible]);

  if (!isVisible || error || !position) {
    return null;
  }

  return (
    <Marker position={position} icon={userIcon}>
      <Popup>
        <div>
          <h3>Your Location</h3>
          <p>Lat: {position[0].toFixed(6)}</p>
          <p>Lng: {position[1].toFixed(6)}</p>
        </div>
      </Popup>
    </Marker>
  );
};
