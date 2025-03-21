export type EventItem = {
  Type: string;
  "start time": string;
  "end time": string;
  event: string;
  Date?: string;
  "Event No": string;
  color: string;
};

export type CalendarData = EventItem[];
