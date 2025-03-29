import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BackgroundColorForEvent } from "@/constants";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scale_to_padding = {
  "1": { left: 0, right: 0, top: 0, bottom: 0 },
  "1.5": { left: 0, right: 0, top: 0, bottom: 0 },
  "2": { left: 40, right: 0, top: 0, bottom: 0 },
  "2.5": { left: 10, right: 10, top: 0, bottom: 0 },
  "3": { left: 0, right: 0, top: 0, bottom: 0 },
  "3.5": { left: -40, right: 80, top: -80, bottom: 0 },
  "4": { left: 0, right: 0, top: 0, bottom: 0 },
  "4.5": { left: -120, right: 0, top: -200, bottom: 0 },
  "5": { left: 0, right: 0, top: 0, bottom: 0 },
};

import type { EventItem } from "../types";

// Parse time string (HH:MM) to get hour and minute
export const parseTime = (
  timeString: string
): { hour: number; minute: number } => {
  const [hourStr, minuteStr] = timeString.split(":");
  return {
    hour: Number.parseInt(hourStr, 10),
    minute: Number.parseInt(minuteStr, 10),
  };
};

// Calculate duration in minutes between two time strings
export const calculateDuration = (
  startTime: string,
  endTime: string
): number => {
  const start = parseTime(startTime);
  const end = parseTime(endTime);

  const startMinutes = start.hour * 60 + start.minute;
  const endMinutes = end.hour * 60 + end.minute;

  return endMinutes - startMinutes;
};

// Get background color based on event type
export const getEventColor = (
  type: string,
  event: string
): { bg: string; text: string } => {
  if (Object.getOwnPropertyNames(BackgroundColorForEvent).includes(event)) {
    return {
      bg: BackgroundColorForEvent[
        event as keyof typeof BackgroundColorForEvent
      ],
      text: "",
    };
  }
  switch (type) {
    case "レーシングコース":
      return { bg: "bg-blue-200", text: "" };
    case "GPスクエア オフィシャルステージ":
      return { bg: "bg-pink-200", text: "" };
    case "メインゲートオープン":
      return { bg: "bg-yellow-200", text: "" };
    case "メインゲートクローズ":
      return { bg: "bg-gray-500", text: "text-white" };
    default:
      return { bg: "bg-gray-200", text: "" };
  }
};

// Filter events by date
export const filterEventsByDate = (
  events: EventItem[],
  selectedDate: string
): { [key: string]: EventItem[] } => {
  const filteredEvents = events.filter(
    (event) => event.Date === selectedDate || !event.Date
  );

  return filteredEvents.reduce((acc, event) => {
    const existingKey = Object.keys(acc).find((k) => {
      const [start, end, type] = k.split("-");
      return (
        (start === event["start time"] || end === event["end time"]) &&
        type === event.Type
      );
    });
    const key =
      existingKey ||
      `${event["start time"]}-${event["end time"]}-${event.Type}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(event);
    return acc;
  }, {} as { [key: string]: EventItem[] });
};

// Generate array of hours from 8 to 21
export const generateTimeSlots = (): number[] => {
  return Array.from({ length: 14 }, (_, i) => i + 8);
};

// Check if event is a full-width event
export const isFullWidthEvent = (type: string): boolean => {
  return type === "メインゲートオープン" || type === "メインゲートクローズ";
};
