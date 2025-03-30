import type { EventItem } from "../types";
import { BackgroundColorForEvent } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Parse time string (HH:MM) to get hour and minute
export const parseTime = (
  timeString: string
): { hour: number; minute: number } => {
  const [hourStr, minuteStr] = timeString.split(":");
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  return { hour, minute };
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

// Generate array of hours from 8 to 21
export const generateTimeSlots = (): number[] => {
  return Array.from({ length: 14 }, (_, i) => i + 8);
};

// Check if event is a full-width event
export const isFullWidthEvent = (type: string): boolean => {
  return type === "メインゲートオープン" || type === "メインゲートクローズ";
};

// Filter events by date (simplified version)
export const filterEventsByDate = (
  events: EventItem[],
  selectedDate: string
): EventItem[] => {
  return events.filter(
    (event) =>
      event.Date === selectedDate ||
      event.Date === undefined ||
      event.Date === null
  );
};
