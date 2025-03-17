import JPData from "./assets/jp_data.json";

export type JPRawDataType = {
  category: string;
  article_type: string;
  sub_title: string;
  content_text: string;
  coordinates: string;
  title: string;
};
const MAP_BOUNDS = {
  north: 34.854529,
  south: 34.839992,
  east: 136.544621,
  west: 136.521328,
};
export const LoadJSONAndProcess = () => {
  return JPData.map((data: JPRawDataType) => {
    const coordinates = data.coordinates.split(",");
    return {
      ...data,
      Coordinates: {
        lat: parseFloat(coordinates[0].slice(1)),
        lng: parseFloat(coordinates[1].slice(0, -1)),
      },
    };
  });
};

export function isWithinBounds(lat: number, lng: number): boolean {
  return (
    lat >= MAP_BOUNDS.south &&
    lat <= MAP_BOUNDS.north &&
    lng >= MAP_BOUNDS.west &&
    lng <= MAP_BOUNDS.east
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
interface NetworkInformation {
  effectiveType?: string;
  type?: string;
  downlink?: number;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
}

declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }
}

export function getNetworkStatus(): Promise<{ type: string; speed?: number }> {
  return new Promise((resolve) => {
    if (!navigator.connection) {
      resolve({ type: "unknown" });
      return;
    }

    const connection = navigator.connection as any;
    resolve({
      type: connection.effectiveType || connection.type || "unknown",
      speed: connection.downlink,
    });
  });
}

export function monitorNetworkChanges(
  callback: (status: { type: string; speed?: number }) => void
) {
  const connection = navigator.connection as any;
  if (!connection) return () => {};

  const handler = () => {
    callback({
      type: connection.effectiveType || connection.type || "unknown",
      speed: connection.downlink,
    });
  };

  connection.addEventListener("change", handler);
  return () => connection.removeEventListener("change", handler);
}
