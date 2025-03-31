/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import type { EventItem } from "@/types";
import { parseTime } from "@/lib/utils";
import DatePicker from "./DatePicker";
import { BackgroundColorForEvent } from "@/constants";
import { getEventColor, isFullWidthEvent } from "@/lib/utils";
import { calculateDuration } from "@/lib/utils";
import { generateTimeSlots } from "@/lib/utils";

export default function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [showGradient] = useState(true);
  const HOUR_HEIGHT = 120;
  const MINUTE_HEIGHT = HOUR_HEIGHT / 60;

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((json) => setEvents(json));
  }, []);

  useEffect(() => {
    const dates = Array.from(
      new Set(events?.filter((event) => event.Date).map((event) => event.Date))
    ).sort();
    if (dates.length > 0 && dates[0] !== undefined) {
      setSelectedDate(dates[0]);
    }
  }, [events]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  // Improved positioning algorithm for events
  const calculateEventPosition = (
    event: EventItem,
    eventsOfType: EventItem[]
  ) => {
    const { hour: startHour, minute: startMinute } = parseTime(
      event["start time"]
    );
    const duration = calculateDuration(event["start time"], event["end time"]);
    const startMinutes = (startHour - 8) * 60 + startMinute;

    // Fixed constants for better spacing
    const GAP_X = 2; // Horizontal gap in pixels
    const GAP_Y = 10; // Vertical gap in pixels

    // Check if this event is consecutive with any other event
    const isConsecutiveEvent = eventsOfType.some((e) => {
      if (e === event) return false;
      const eStart = parseTime(e["start time"]);
      const eEnd = parseTime(e["end time"]);
      const eStartMinutes = eStart.hour * 60 + eStart.minute;
      const eEndMinutes = eEnd.hour * 60 + eEnd.minute;
      const eventStart = parseTime(event["start time"]);
      const eventEnd = parseTime(event["end time"]);
      const eventStartMinutes = eventStart.hour * 60 + eventStart.minute;
      const eventEndMinutes = eventEnd.hour * 60 + eventEnd.minute;

      return (
        eStartMinutes === eventEndMinutes || eventStartMinutes === eEndMinutes
      );
    });

    // Group overlapping events
    const overlappingEvents = findOverlappingEvents(event, eventsOfType);

    // If this is the only event in its time slot, use full width
    if (overlappingEvents.length === 1) {
      return {
        top: `${startMinutes * MINUTE_HEIGHT + GAP_Y}px`,
        height: `${duration * MINUTE_HEIGHT}px`,
        width: `calc(100% - ${GAP_X * 2}px)`,
        left: `${GAP_X}px`,
        position: "absolute" as const,
        minHeight: "27px",
        boxSizing: "border-box" as const,
        border: "1px solid white", // Add white border
      };
    }

    // For multiple overlapping events
    const totalColumns = calculateMaxColumns(overlappingEvents);
    const columnIndex = overlappingEvents.indexOf(event);

    // Calculate width and position based on overlaps
    const columnWidth = 100 / totalColumns;

    return {
      top: `${startMinutes * MINUTE_HEIGHT + GAP_Y}px`,
      height: `${duration * MINUTE_HEIGHT}px`,
      width: `calc(${columnWidth}% - ${GAP_X * 2}px)`,
      left: `calc(${columnIndex * columnWidth}% + ${GAP_X}px)`,
      position: "absolute" as const,
      boxSizing: "border-box" as const,
      border: "1px solid white", // Add white border
    };
  };
  // Function to calculate max columns based on overlapping events
  const calculateMaxColumns = (overlappingEvents: EventItem[]) => {
    if (overlappingEvents.length === 0) return 1;

    const timeSlots: Record<number, number> = {};

    overlappingEvents.forEach((event) => {
      const eventStart = parseTime(event["start time"]);
      const eventEnd = parseTime(event["end time"]);
      const eventStartMinutes = eventStart.hour * 60 + eventStart.minute;
      const eventEndMinutes = eventEnd.hour * 60 + eventEnd.minute;

      for (let i = eventStartMinutes; i < eventEndMinutes; i++) {
        timeSlots[i] = (timeSlots[i] || 0) + 1;
      }
    });

    return Math.max(...Object.values(timeSlots), 1);
  };

  // Helper function to find overlapping events - FIXED VERSION
  const findOverlappingEvents = (event: EventItem, allEvents: EventItem[]) => {
    const eventStart = parseTime(event["start time"]);
    const eventEnd = parseTime(event["end time"]);
    const eventStartMinutes = eventStart.hour * 60 + eventStart.minute;
    const eventEndMinutes = eventEnd.hour * 60 + eventEnd.minute;

    return allEvents
      .filter((e) => {
        const eStart = parseTime(e["start time"]);
        const eEnd = parseTime(e["end time"]);
        const eStartMinutes = eStart.hour * 60 + eStart.minute;
        const eEndMinutes = eEnd.hour * 60 + eEnd.minute;

        // For consecutive events (one ends exactly when the other starts),
        // don't consider them overlapping
        if (
          eStartMinutes === eventEndMinutes ||
          eventStartMinutes === eEndMinutes
        ) {
          return false;
        }

        // Standard overlap check for other cases
        return (
          eStartMinutes < eventEndMinutes && eventStartMinutes < eEndMinutes
        );
      })
      .sort((a, b) => {
        // Sort by start time, then by duration
        const aStart = parseTime(a["start time"]);
        const bStart = parseTime(b["start time"]);
        const aStartMinutes = aStart.hour * 60 + aStart.minute;
        const bStartMinutes = bStart.hour * 60 + bStart.minute;

        if (aStartMinutes !== bStartMinutes) {
          return aStartMinutes - bStartMinutes;
        }

        const aDuration = calculateDuration(a["start time"], a["end time"]);
        const bDuration = calculateDuration(b["start time"], b["end time"]);
        return bDuration - aDuration;
      });
  };

  const RenderEvent = ({
    event,
    eventsOfType,
  }: {
    event: EventItem;
    eventsOfType: EventItem[];
  }) => {
    const { bg } = getEventColor(event.Type, event.event);
    const style = calculateEventPosition(event, eventsOfType);
    const startMinute = event["start time"].slice(-2);
    const endMinute = event["end time"].slice(-2);
    const bgColor =
      BackgroundColorForEvent[
        event.event_id as keyof typeof BackgroundColorForEvent
      ] || bg;
    const duration = Math.abs(
      parseTime(event["end time"]).minute -
        parseTime(event["start time"]).minute
    );
    console.log(duration === 10);
    return (
      <div
        className="p-1 relative text-[10px]   border border-white"
        style={{
          ...style,
          background:
            event.gradient === "yes"
              ? `linear-gradient(to bottom, ${bgColor}FF 0%, ${bgColor}00 100%)`
              : bgColor,
          color: "#000000",
        }}
      >
        <div className="absolute top-0 left-0  text-[8px] Hiragino">
          {startMinute !== "00" && startMinute !== "30" ? startMinute : ""}
        </div>
        <div className="absolute left-0 bottom-1  text-[8px] Hiragino">
          {endMinute !== "00" && endMinute !== "30" ? endMinute : ""}
        </div>
        <span
          className="text-[8px] h-[90%] flex justify-center items-center text-center HiraginoBold px-1"
          style={{ whiteSpace: "pre-line" }}
        >
          {event.event}
        </span>
      </div>
    );
  };

  const timeSlots = generateTimeSlots();
  const filteredEvents = events.filter((event) => event.Date === selectedDate);

  return (
    <div className="w-full max-w-4xl mb-8">
      <div className="flex items-center px-3 mb-2">
        <DatePicker data={events} onDateChange={handleDateChange} />
      </div>
      <div className="flex flex-col border border-gray-300 overflow-hidden w-[90%] mx-auto bg-white shadow-md">
        <div className="flex sticky top-0 bg-white w-full font-extrabold z-10">
          <div className="w-10 bg-[#15151E] text-white shrink-0"></div>
          <div className="flex-1 bg-[#E00400] text-white p-2 text-center  text-[12px] ml-2 HiraginoBold">
            レーシングコース
          </div>
          <div className="flex-1 bg-[#1716BB] text-white p-2 text-center  whitespace-pre-line text-[12px] mr-2 HiraginoBold">
            <span className="formula1Bold">GP</span>スクエア
            オフィシャルステージ
          </div>
        </div>

        <div className="relative">
          <div className="relative w-full">
            {timeSlots.map((hour) => (
              <div
                key={`hour-${hour}`}
                className="flex"
                style={{ height: `${HOUR_HEIGHT}px` }}
              >
                <div className="w-10 bg-[#15151E] text-white flex items-start justify-center font-bold shrink-0 pt-2 text-[13px] HiraginoBold">
                  {hour.toString().padStart(2, "0")}
                </div>
                <div className="flex-1 border-r border-gray-200 bg-white"></div>
                <div className="flex-1 bg-white"></div>
              </div>
            ))}

            <div className="absolute top-0 left-10 right-0 h-full mx-2 bg-gray-50">
              <div className="flex h-full">
                <div className="flex-1 relative">
                  {filteredEvents
                    .filter((event) => event.Type === "レーシングコース")
                    .map((event) => (
                      <RenderEvent
                        key={`${event.Type}-${event["start time"]}-${event.event}`}
                        event={event}
                        eventsOfType={filteredEvents.filter(
                          (e) => e.Type === "レーシングコース"
                        )}
                      />
                    ))}
                </div>
                <div className="flex-1 relative">
                  {filteredEvents
                    .filter(
                      (event) =>
                        event.Type === "GPスクエア オフィシャルステージ"
                    )
                    .map((event) => (
                      <RenderEvent
                        key={`${event.Type}-${event["start time"]}-${event.event}`}
                        event={event}
                        eventsOfType={filteredEvents.filter(
                          (e) => e.Type === "GPスクエア オフィシャルステージ"
                        )}
                      />
                    ))}
                </div>
              </div>
            </div>

            <div className="absolute top-0 left-10 right-0 h-full">
              {filteredEvents
                .filter((event) => isFullWidthEvent(event.Type))
                .map((event) => {
                  const { hour: startHour, minute: startMinute } = parseTime(
                    event["start time"]
                  );
                  const duration = calculateDuration(
                    event["start time"],
                    event["end time"]
                  );
                  const startMinutes = (startHour - 8) * 60 + startMinute;
                  const minuteEnd = event["end time"].slice(-2);

                  return (
                    <div
                      key={`fullwidth-${event["start time"]}-${event.event}`}
                      className={`${
                        showGradient ? "bg-[#B3B3B3]" : "bg-[#f8fafc]"
                      } p-1 absolute mx-2  HiraginoBold`}
                      style={{
                        top: `${startMinutes * MINUTE_HEIGHT + 2}px`,
                        height: `${duration * MINUTE_HEIGHT - 4}px`,
                        left: "0",
                        right: "0",
                        width: "calc(100% - 16px)",
                        fontWeight: 700,
                      }}
                    >
                      <div className="text-sm flex justify-center items-center h-full EventTextBold">
                        <div className="absolute top-0 left-0  text-[8px] Hiragino">
                          {startMinute !== 0 && startMinute !== 30
                            ? startMinute.toString()
                            : ""}
                        </div>
                        <div className="absolute bottom-0 left-0  text-[8px] Hiragino">
                          {minuteEnd !== "00" && minuteEnd !== "30"
                            ? minuteEnd
                            : ""}
                        </div>
                        <div className="flex justify-center items-center h-full text-center text-[8px] ">
                          {event.event}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
