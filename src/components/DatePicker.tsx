"use client";

import type React from "react";

import { useState } from "react";
import type { CalendarData } from "../types";

type DatePickerProps = {
  data: CalendarData;
  onDateChange: (date: string) => void;
};

export default function DatePicker({ data, onDateChange }: DatePickerProps) {
  // Extract unique dates from the data
  const uniqueDates = Array.from(
    new Set(data.filter((event) => event.Date).map((event) => event.Date))
  ).sort();

  // Set default selected date to the first date in the list
  const [selectedDate, setSelectedDate] = useState(uniqueDates[0] || "");

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  // Format date for display (MM/DD/YYYY to YYYY年MM月DD日)
  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const [month, day, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="mb-4">
      <select
        id="date-select"
        value={selectedDate}
        onChange={handleDateChange}
        className="w-full p-2 border border-gray-300 rounded-md bg-white"
      >
        {uniqueDates.map((date) => (
          <option key={date} value={date}>
            {formatDateForDisplay(date || "")}
          </option>
        ))}
      </select>
    </div>
  );
}
