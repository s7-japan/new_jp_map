"use client";

import { useState, useEffect } from "react";
import type { EventItem, CalendarData } from "../types";

import DatePicker from "./DatePicker";
import {
  parseTime,
  calculateDuration,
  getEventColor,
  filterEventsByDate,
  generateTimeSlots,
  isFullWidthEvent,
} from "../lib/utils";

export default function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<EventItem[][]>([]);

  const HOUR_HEIGHT = 120;
  const MINUTE_HEIGHT = HOUR_HEIGHT / 60;
  const [eventData, setEventData] = useState<CalendarData>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((json) => setEventData(json));
  }, []);
  useEffect(() => {
    const dates = Array.from(
      new Set(
        eventData?.filter((event) => event.Date).map((event) => event.Date)
      )
    ).sort();

    if (dates.length > 0) {
      // @ts-expect-error: dates is not empty
      setSelectedDate(dates[0]);
    }
  }, [eventData]);

  useEffect(() => {
    if (selectedDate) {
      const eventsForDate = filterEventsByDate(eventData, selectedDate);
      setFilteredEvents(Array.from(Object.values(eventsForDate)));
      console.log(eventData);
    }
  }, [selectedDate, eventData]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const calculateEventStyle = (
    startTime: string,
    endTime: string,
    totalInGroup: number,
    index: number
  ) => {
    const { hour: startHour, minute: startMinute } = parseTime(startTime);
    const duration = calculateDuration(startTime, endTime);

    const minutesFromDayStart = (startHour - 8) * 60 + startMinute;
    const topPosition = minutesFromDayStart * MINUTE_HEIGHT;

    const width = totalInGroup > 1 ? `${100 / totalInGroup}%` : "100%";
    const left = totalInGroup > 1 ? `${(index / totalInGroup) * 100}%` : "0";
    const height = duration * MINUTE_HEIGHT;
    return {
      top: `${topPosition}px`,
      height: `${height}px`,
      minHeight: "30px",
      position: "absolute" as const,
      width,
      left,
    };
  };

  const renderEvent = (
    event: EventItem,
    totalInGroup: number,
    index: number
  ) => {
    const { bg, text } = getEventColor(event.Type, event.event);
    const eventStyle = calculateEventStyle(
      event["start time"],
      event["end time"],
      totalInGroup,
      index
    );

    return (
      <div
        key={`${event.Type}-${event["start time"]}-${event.event}`}
        className={`${bg} ${text} p-1 relative border-b-4 text-[10px] overflow-hidden`}
        style={eventStyle}
      >
        <div className="absolute top-0 right-2 font-extrabold">
          {event["Event No"]}
        </div>
        <div className="text-[10px] text-center">
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
      <DatePicker data={eventData} onDateChange={handleDateChange} />
      <div className="flex flex-col border border-gray-300 h-[500px] mb-100 ">
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
                    .filter((event) => event[0].Type === "レーシングコース")
                    .map((overlapping_event) => {
                      console.log(overlapping_event);
                      return (
                        <div
                          key={crypto.randomUUID()}
                          className="flex flex-row flex-1/2"
                        >
                          {overlapping_event.map((event) =>
                            renderEvent(
                              event,
                              overlapping_event.length,
                              overlapping_event.indexOf(event)
                            )
                          )}
                        </div>
                      );
                    })}
                </div>
                {/* GP Square events */}
                <div className="flex-1 relative">
                  {filteredEvents
                    .filter(
                      (event) =>
                        event[0].Type === "GPスクエア オフィシャルステージ"
                    )
                    .map((overlapping_event) => (
                      <div key={crypto.randomUUID()} className="flex flex-row">
                        {overlapping_event.map((event) =>
                          renderEvent(
                            event,
                            overlapping_event.length,
                            overlapping_event.indexOf(event)
                          )
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="absolute top-0 left-10 right-0 h-full">
              {filteredEvents
                .filter((event) => isFullWidthEvent(event[0].Type))
                .map((event) => {
                  const eventStyle = calculateEventStyle(
                    event[0]["start time"],
                    event[0]["end time"],
                    1,
                    0
                  );

                  return (
                    <div
                      key={`fullwidth-${event[0]["start time"]}-${event[0].event}`}
                      className={`bg-[#FAF75F]  p-1 w-full `}
                      style={{
                        ...eventStyle,
                        zIndex: 20,
                      }}
                    >
                      <div className="text-sm flex justify-center items-center">
                        <div>{event[0].event}</div>
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
