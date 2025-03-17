"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import F1Map from "../assets/f1-map_image.png";
import { LoadJSONAndProcess } from "@/functions";
import Marker from "./Marker";
import { UserLocation } from "./user-location";
import { isWithinBounds } from "@/functions";
import { Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import BgImage from "@/assets/bg-image.png";
import Image from "next/image";
interface TouchRef {
  x?: number;
  y?: number;
  posX?: number;
  posY?: number;
  touch1?: { x: number; y: number };
  touch2?: { x: number; y: number };
  initialScale?: number;
  initialDistance?: number;
  midpoint?: { x: number; y: number };
  lastMidpoint?: { x: number; y: number };
  lastDistance?: number;
}

const MAP_DIMENSIONS = {
  width: 1200,
  height: 1770,
};

// Define three distinct zoom levels
const ZOOM_LEVELS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
const MIN_SCALE = ZOOM_LEVELS[0];
const MAX_SCALE = ZOOM_LEVELS[ZOOM_LEVELS.length - 1];

interface Coordinate {
  lat: number;
  lng: number;
  label: string;
}

// Calculate distance between two points
const getDistance = (
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Calculate midpoint between two points
const getMidpoint = (
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) => {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
};

// Get the closest zoom level
const getClosestZoomLevel = (scale: number) => {
  return ZOOM_LEVELS.reduce((prev, curr) =>
    Math.abs(curr - scale) < Math.abs(prev - scale) ? curr : prev
  );
};

const Map = () => {
  const [scale, setScale] = useState(2); // Start at middle zoom level
  const [userLocation, setUserLocation] = useState<Coordinate | null>(null);
  const [showOutOfBoundsMessage, setShowOutOfBoundsMessage] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapImageRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number | null>(null);
  const [mapDimensions, setMapDimensions] = useState({
    width: MAP_DIMENSIONS.width,
    height: MAP_DIMENSIONS.height,
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load data once and memoize it
  const processedData = useMemo(() => LoadJSONAndProcess(), []);

  const lastPosition = useRef(position);
  const lastScale = useRef(scale);
  const touchRef = useRef<TouchRef>({});

  // Update map dimensions when image loads
  useEffect(() => {
    if (mapImageRef.current) {
      const updateDimensions = () => {
        if (mapImageRef.current) {
          setMapDimensions({
            width: mapImageRef.current.offsetWidth || MAP_DIMENSIONS.width,
            height: mapImageRef.current.offsetHeight || MAP_DIMENSIONS.height,
          });
        }
      };

      // Set dimensions initially
      updateDimensions();

      // Update if image loads later
      mapImageRef.current.onload = updateDimensions;

      // Also update on window resize
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

  const snapToZoomLevel = useCallback(
    (newScale: number, centerX?: number, centerY?: number) => {
      const closestZoomLevel = getClosestZoomLevel(newScale);

      // Only transition if we're actually changing zoom levels
      if (closestZoomLevel !== lastScale.current) {
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 300);
      }

      if (
        centerX !== undefined &&
        centerY !== undefined &&
        containerRef.current
      ) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerCenterX = containerRect.width / 2;
        const containerCenterY = containerRect.height / 2;

        // Calculate how much the position should change based on scale change
        const scaleFactor = closestZoomLevel / lastScale.current;
        const dx = (centerX - containerCenterX) * (1 - scaleFactor);
        const dy = (centerY - containerCenterY) * (1 - scaleFactor);

        // Update position to zoom toward the center point
        setPosition((prev) => ({
          x: prev.x + dx,
          y: prev.y + dy,
        }));
      }

      // Update scale state
      setScale(closestZoomLevel);
      // Update the ref immediately
      lastScale.current = closestZoomLevel;
    },
    []
  );

  const updateScale = useCallback(
    (newScale: number, centerX?: number, centerY?: number) => {
      // Clamp the scale to our min/max
      const clampedScale = Math.min(Math.max(MIN_SCALE, newScale), MAX_SCALE);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        snapToZoomLevel(clampedScale, centerX, centerY);
        rafRef.current = null;
      });
    },
    [snapToZoomLevel]
  );

  // Handle mouse wheel zoom
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const delta = e.deltaY * -0.01; // Adjust sensitivity

      // Calculate the new scale based on the current scale reference
      const newScale = lastScale.current + delta;

      // Update scale with the mouse position as the center of zoom
      updateScale(newScale, e.clientX, e.clientY);
    },
    [updateScale]
  );

  const updatePosition = useCallback(
    (newPosition: { x: number; y: number }) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPosition(newPosition);
        lastPosition.current = newPosition;
        rafRef.current = null;
      });
    },
    []
  );

  const handleTouch = useCallback(
    (e: React.TouchEvent) => {
      if (e.type === "touchstart") {
        if (e.touches.length === 2) {
          // Two-finger touch (pinch gesture)
          const [t1, t2] = [e.touches[0], e.touches[1]];
          const touch1 = { x: t1.clientX, y: t1.clientY };
          const touch2 = { x: t2.clientX, y: t2.clientY };
          const initialDistance = getDistance(touch1, touch2);
          const midpoint = getMidpoint(touch1, touch2);

          touchRef.current = {
            touch1,
            touch2,
            initialScale: lastScale.current,
            initialDistance,
            midpoint,
            lastMidpoint: midpoint,
            lastDistance: initialDistance,
            posX: position.x,
            posY: position.y,
          };
        } else if (e.touches.length === 1) {
          // Single-finger touch (pan gesture)
          touchRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            posX: position.x,
            posY: position.y,
          };
        }
      } else if (e.type === "touchmove") {
        if (
          e.touches.length === 2 &&
          touchRef.current.initialScale !== undefined &&
          touchRef.current.initialDistance !== undefined
        ) {
          // Handle pinch zoom
          const [t1, t2] = [e.touches[0], e.touches[1]];
          const touch1 = { x: t1.clientX, y: t1.clientY };
          const touch2 = { x: t2.clientX, y: t2.clientY };
          const currentDistance = getDistance(touch1, touch2);
          const midpoint = getMidpoint(touch1, touch2);

          // Only process significant changes to avoid jitter
          if (
            Math.abs(currentDistance - (touchRef.current.lastDistance || 0)) > 1
          ) {
            // Calculate new scale based on pinch gesture
            const scaleFactor =
              currentDistance / touchRef.current.initialDistance;
            const newScale = touchRef.current.initialScale * scaleFactor;

            // Update scale with the midpoint as the center of zoom
            updateScale(newScale, midpoint.x, midpoint.y);

            // Store last distance for threshold checking
            touchRef.current.lastDistance = currentDistance;
          }

          // Handle panning during pinch zoom
          if (touchRef.current.lastMidpoint) {
            const dx = midpoint.x - touchRef.current.lastMidpoint.x;
            const dy = midpoint.y - touchRef.current.lastMidpoint.y;

            // Only update position if there's significant movement
            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
              updatePosition({
                x: position.x + dx,
                y: position.y + dy,
              });

              // Update last midpoint
              touchRef.current.lastMidpoint = midpoint;
            }
          }
        } else if (
          e.touches.length === 1 &&
          touchRef.current.x !== undefined &&
          touchRef.current.y !== undefined
        ) {
          // Handle single finger pan
          const dx = e.touches[0].clientX - touchRef.current.x;
          const dy = e.touches[0].clientY - touchRef.current.y;

          updatePosition({
            x: (touchRef.current.posX || 0) + dx,
            y: (touchRef.current.posY || 0) + dy,
          });
        }
      } else if (e.type === "touchend" || e.type === "touchcancel") {
        // Reset touch reference
        touchRef.current = {};
      }
    },
    [position, updateScale, updatePosition]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;

      // Check if we're clicking on a marker or button
      if (e.target && (e.target as HTMLElement).closest("button")) {
        return; // Don't initiate drag if clicking on a marker
      }

      setIsDragging(true);
      const startX = e.clientX;
      const startY = e.clientY;
      const startPosition = { ...position };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        updatePosition({
          x: startPosition.x + (e.clientX - startX),
          y: startPosition.y + (e.clientY - startY),
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [isDragging, position, updatePosition]
  );

  const zoomIn = useCallback(() => {
    const currentZoomIndex = ZOOM_LEVELS.indexOf(lastScale.current);
    if (currentZoomIndex < ZOOM_LEVELS.length - 1) {
      const newScale = ZOOM_LEVELS[currentZoomIndex + 1];
      updateScale(newScale);
    }
  }, [updateScale]);

  const zoomOut = useCallback(() => {
    const currentZoomIndex = ZOOM_LEVELS.indexOf(lastScale.current);
    if (currentZoomIndex > 0) {
      const newScale = ZOOM_LEVELS[currentZoomIndex - 1];
      updateScale(newScale);
    }
  }, [updateScale]);

  // Set up wheel event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden touch-none"
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        backgroundImage: `url(${BgImage})`,
      }}
    >
      <div
        ref={mapRef}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transformOrigin: "center",
          willChange: "transform",
          width: "fit-content",
          height: "fit-content",
          margin: "0 auto",
          position: "relative",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        onTouchEnd={handleTouch}
        onTouchCancel={handleTouch}
      >
        <Image
          ref={mapImageRef}
          src={F1Map || "/placeholder.svg?height=1200&width=1770"}
          alt="F1 Track Map"
          draggable="false"
          style={{
            pointerEvents: "none",
            transform: `rotate(-130deg) scale(${scale})`,
            transition: isTransitioning ? "transform 0.3s ease-out" : "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "auto", // Changed from "none" to "auto" to allow marker clicks
            transition: isTransitioning ? "transform 0.3s ease-out" : "none",
          }}
        >
          {userLocation && (
            <UserLocation
              mapHeight={mapDimensions.height}
              mapWidth={mapDimensions.width}
              onLocationUpdate={(lat: number, lng: number) => {
                const withinBounds = isWithinBounds(lat, lng);
                setShowOutOfBoundsMessage(!withinBounds);
                if (withinBounds) {
                  setUserLocation({ lat, lng, label: "User" });
                }
              }}
              scale={scale}
            />
          )}

          {/* Render all markers with proper positioning */}
          {processedData.map((item, index) => (
            <Marker
              key={`${item.title}-${index}`}
              item={item}
              mapWidth={mapDimensions.width}
              mapHeight={mapDimensions.height}
              scale={scale}
              position={position}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 absolute bottom-[150px] right-10 z-10">
        <Button
          onClick={zoomIn}
          aria-label="Zoom in"
          variant={"default"}
          className="bg-white text-black"
        >
          <Plus fill="#000000" size={30} />
        </Button>
        <Button
          onClick={zoomOut}
          aria-label="Zoom out"
          variant={"default"}
          className="bg-white text-black"
        >
          <Minus fill="#000000" size={30} />
        </Button>
      </div>

      {showOutOfBoundsMessage && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg">
          Your location is outside the map bounds
        </div>
      )}
    </div>
  );
};

export default React.memo(Map);
