/* eslint-disable react/display-name */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import ICONS from "@/constants";
import React from "react";
import { Button } from "./ui/button";
import { useState } from "react";
import { scale_to_padding } from "@/lib/utils";
import Image from "next/image";
interface MarkerData {
  Coordinates: {
    lat: number;
    lng: number;
  };
  title: string;
  sub_title: string;
  category: string;
  article_type: string;
  content_text: string;
  pixel?: {
    x: number;
    y: number;
  };
}

const convertLatLngToPixels = (
  lat: number,
  lng: number,
  mapWidth: number,
  mapHeight: number
) => {
  const { north, south, east, west } = MAP_BOUNDS;
  let x = ((lng - west) / (east - west)) * mapWidth;
  let y = ((north - lat) / (north - south)) * mapHeight;
  // Ensure markers stay within bounds
  x = Math.max(0, Math.min(x, mapWidth));
  y = Math.max(0, Math.min(y, mapHeight));

  return { x, y };
};

const MAP_BOUNDS = {
  north: 34.854529,
  south: 34.839992,
  east: 136.544621,
  west: 136.521328,
};
const Marker = React.memo(
  ({
    item,
    mapWidth,
    mapHeight,
    scale,
  }: {
    item: MarkerData;
    mapWidth: number;
    mapHeight: number;
    scale: number;
    position: { x: number; y: number };
  }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { lat, lng } = item.Coordinates;
    let { x: left, y: top } = convertLatLngToPixels(
      lat,
      lng,
      mapWidth,
      mapHeight
    );
    left = (left * scale) / 2;
    top = (top * scale) / 2;
    let display = "none";
    let markerSize;
    if (scale < 2) {
      markerSize = 12;
      left += 100;
      top += 100;
      display = "none";
    } else if (scale < 3) {
      markerSize = 10;
      display = item.category === "インフォメーション" ? "block" : "none";
    } else {
      markerSize = 8;
      left -= 100;
      top -= 150;
      display = "block";
      if (scale == 4) {
        left -= 60;
        top -= 130;
      } else if (scale == 5) {
        left -= 150;
        top -= 270;
      }
    }
    return (
      <>
        <Button
          variant="ghost"
          className="p-0 absolute rounded-full hover:bg-primary/10 active:scale-95 transition-transform"
          style={{
            position: "absolute",
            left: `${
              left +
              scale_to_padding[
                scale.toString() as keyof typeof scale_to_padding
              ].left
            }px`,
            top: `${
              top +
              scale_to_padding[
                scale.toString() as keyof typeof scale_to_padding
              ].top
            }px`,
            transform: "translate(-50%, -50%)",
            width: `${markerSize * scale}px`,
            height: `${markerSize * scale}px`,
            borderRadius: "50%",
            display,
            padding: 0,
            zIndex: 10, // Add zIndex to ensure clickability
          }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent event from bubbling to map
            setIsDialogOpen(true);
          }}
        >
          <Image
            src={
              ICONS[item.category as keyof typeof ICONS] ||
              ICONS["アトラクション"]
            }
            alt={item.category}
            width={markerSize * 2}
            height={markerSize * 2}
            style={{
              transition: "width 0.2s ease, height 0.2s ease",
            }}
          />
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{item.title}</DialogTitle>
              <DialogDescription>{item.sub_title}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Category:</span>
                  <span>{item.category}</span>
                </div>
                {item.article_type && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Type:</span>
                    <span>{item.article_type}</span>
                  </div>
                )}
                {item.content_text && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {item.content_text}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
);

export default Marker;
