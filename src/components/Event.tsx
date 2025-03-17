"use client";

import { useState, useEffect } from "react";
import type { EventItem, CalendarData } from "../types";
import { eventData } from "@/temp-data";
import DatePicker from "./DatePicker";
import {
  parseTime,
  calculateDuration,
  getEventColor,
  filterEventsByDate,
  generateTimeSlots,
  isFullWidthEvent,
} from "../lib/utils";

type EventCalendarProps = {
  data?: CalendarData;
};

export default function EventCalendar({
  data = eventData,
}: EventCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([]);

  const HOUR_HEIGHT = 120;
  const MINUTE_HEIGHT = HOUR_HEIGHT / 60;

  useEffect(() => {
    const dates = Array.from(
      new Set(data.filter((event) => event.Date).map((event) => event.Date))
    ).sort();

    if (dates.length > 0) {
      setSelectedDate(dates[0] || "");
    }
  }, [data]);

  useEffect(() => {
    if (selectedDate) {
      setFilteredEvents(filterEventsByDate(data, selectedDate));
    }
  }, [selectedDate, data]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const calculateEventStyle = (startTime: string, endTime: string) => {
    const { hour: startHour, minute: startMinute } = parseTime(startTime);
    const duration = calculateDuration(startTime, endTime);

    const minutesFromDayStart = (startHour - 8) * 60 + startMinute;
    const topPosition = minutesFromDayStart * MINUTE_HEIGHT;

    // Calculate height based on duration
    const height = duration * MINUTE_HEIGHT;

    return {
      top: `${topPosition}px`,
      height: `${height}px`,
      minHeight: "30px", // Minimum height for very short events
      position: "absolute" as const,
      width: "100%",
    };
  };

  // Render a single event block
  const renderEvent = (event: EventItem) => {
    const { bg, text } = getEventColor(event.Type, event.event);
    const eventStyle = calculateEventStyle(
      event["start time"],
      event["end time"]
    );

    return (
      <div
        key={`${event.Type}-${event["start time"]}-${event.event}`}
        className={`${bg} ${text} p-1 relative border-b-4 text-[10px] overflow-hidden`}
        style={eventStyle}
      >
        <div className="text-[12px] text-center">
          <div>{event["start time"] + "-" + event["end time"]}</div>
          {event.event}
        </div>
      </div>
    );
  };

  // Generate time slots for the calendar
  const timeSlots = generateTimeSlots();

  return (
    <div className="w-full max-w-4xl  mb-200">
      <DatePicker data={data} onDateChange={handleDateChange} />

      <div className="flex flex-col border border-gray-300 h-[500px] mb-100 mt-20 ">
        <div className="flex sticky top-0  bg-white">
          <div className="w-10 bg-[#15151E] text-white shrink-0"></div>
          <div className="flex-1 bg-[#1C1ACB] text-white p-2 text-center font-bold text-[12px]">
            レーシングコース
          </div>
          <div className="flex-1 bg-[#FE699F] text-white p-2 text-center font-bold whitespace-pre-line text-[12px]">
            GPスクエア オフィシャルステージ
          </div>
        </div>

        <div className="overflow-y-auto max-h-[70vh] relative">
          <div className="relative">
            {/* Hour markers */}
            {timeSlots.map((hour) => (
              <div
                key={`hour-${hour}`}
                className="flex"
                style={{ height: `${HOUR_HEIGHT}px` }}
              >
                <div className="w-10 bg-[#15151E] text-white flex items-start justify-center font-bold shrink-0 pt-2 text-[13px]">
                  {hour.toString().padStart(2, "0")}:00
                </div>

                {/* Grid columns for Racing Course and GP Square */}
                <div className="flex-1 border-r border-gray-200 bg-white"></div>
                <div className="flex-1 bg-white"></div>
              </div>
            ))}

            {/* Overlay events */}
            <div className="absolute top-0 left-10 right-0 h-full">
              <div className="flex h-full">
                {/* Racing Course events */}
                <div className="flex-1 relative">
                  {filteredEvents
                    .filter((event) => event.Type === "レーシングコース")
                    .map((event) => renderEvent(event))}
                </div>

                {/* GP Square events */}
                <div className="flex-1 relative">
                  {filteredEvents
                    .filter(
                      (event) =>
                        event.Type === "GPスクエア オフィシャルステージ"
                    )
                    .map((event) => renderEvent(event))}
                </div>
              </div>
            </div>

            <div className="absolute top-0 left-10 right-0 h-full">
              {filteredEvents
                .filter((event) => isFullWidthEvent(event.Type))
                .map((event) => {
                  const eventStyle = calculateEventStyle(
                    event["start time"],
                    event["end time"]
                  );

                  return (
                    <div
                      key={`fullwidth-${event["start time"]}-${event.event}`}
                      className={`bg-[#FAF75F]  p-1 w-full `}
                      style={{
                        ...eventStyle,
                        zIndex: 20,
                      }}
                    >
                      <div className="text-sm flex justify-center items-center">
                        <div>{event.event}</div>
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
