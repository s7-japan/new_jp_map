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
  console.log("Input events:", events);

  // First, filter by date properly
  const filteredEvents = events.filter(
    (event) =>
      event.Date === selectedDate ||
      event.Date === undefined ||
      event.Date === null
  );
  console.log("Filtered events:", filteredEvents);

  // Group events by type
  const eventsByType = filteredEvents.reduce((acc, event) => {
    if (!acc[event.Type]) {
      acc[event.Type] = [];
    }
    acc[event.Type].push(event);
    return acc;
  }, {} as { [key: string]: EventItem[] });
  console.log("Events by type:", eventsByType);

  return Object.entries(eventsByType).reduce((result, [type, typeEvents]) => {
    const timePoints: { time: number; isStart: boolean; event: EventItem }[] =
      [];

    // Parse all event times in advance to improve efficiency
    const parsedEvents = typeEvents.map((event) => {
      const start = parseTime(event["start time"]);
      const end = parseTime(event["end time"]);
      return {
        event,
        startMinutes: start ? start.hour * 60 + start.minute : 0,
        endMinutes: end ? end.hour * 60 + end.minute : 0,
      };
    });

    // Add all start and end times to the list
    parsedEvents.forEach(({ event, startMinutes, endMinutes }) => {
      timePoints.push({ time: startMinutes, isStart: true, event });
      timePoints.push({ time: endMinutes, isStart: false, event });
    });

    // Corrected sorting logic
    timePoints.sort((a, b) => {
      if (a.time !== b.time) return a.time - b.time;
      return a.isStart ? -1 : 1; // Ensure start events come before end events if times are equal
    });

    console.log(`Time points for type ${type}:`, timePoints);

    const mergedIntervals: {
      start: number;
      end: number;
      events: EventItem[];
    }[] = [];
    let openEvents: EventItem[] = [];
    let intervalStart: number | null = null;

    timePoints.forEach((point) => {
      if (point.isStart) {
        openEvents.push(point.event);
        if (openEvents.length === 1) {
          intervalStart = point.time;
        }
      } else {
        openEvents = openEvents.filter((e) => e !== point.event);
        if (openEvents.length === 0 && intervalStart !== null) {
          const endTime = point.time;
          mergedIntervals.push({
            start: intervalStart,
            end: endTime,
            events: parsedEvents
              .filter(
                ({ startMinutes, endMinutes }) =>
                  intervalStart &&
                  startMinutes < endTime &&
                  endMinutes >= intervalStart
              )
              .map(({ event }) => event),
          });
          intervalStart = null;
        }
      }
    });

    console.log(`Merged intervals for type ${type}:`, mergedIntervals);

    mergedIntervals.forEach((interval, index) => {
      const startTime = `${Math.floor(interval.start / 60)
        .toString()
        .padStart(2, "0")}:${(interval.start % 60)
        .toString()
        .padStart(2, "0")}`;
      const endTime = `${Math.floor(interval.end / 60)
        .toString()
        .padStart(2, "0")}:${(interval.end % 60).toString().padStart(2, "0")}`;
      const key = `${startTime}-${endTime}-${type}-${index}`; // Ensure uniqueness
      result[key] = interval.events;
    });

    return result;
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
