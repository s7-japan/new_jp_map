export type EventItem = {
  Type: string;
  "start time": string;
  "end time": string;
  event: string;
  Date?: string;
  event_id: string;
  gradient: string;
};

export type CalendarData = EventItem[];
