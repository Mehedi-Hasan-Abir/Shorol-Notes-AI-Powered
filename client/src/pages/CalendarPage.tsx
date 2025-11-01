import { useState } from "react";
import CalendarView from "@/components/CalendarView";

// TODO: remove mock functionality
const mockEvents = [
  {
    id: "1",
    title: "প্রোজেক্ট মিটিং",
    startsAt: new Date(2025, 10, 5, 10, 0),
    endsAt: new Date(2025, 10, 5, 11, 0),
    provider: "google" as const,
  },
  {
    id: "2",
    title: "টিম রিভিউ",
    startsAt: new Date(2025, 10, 6, 14, 0),
    endsAt: new Date(2025, 10, 6, 15, 30),
    provider: "outlook" as const,
  },
  {
    id: "3",
    title: "ক্লায়েন্ট প্রেজেন্টেশন",
    startsAt: new Date(2025, 10, 8, 15, 0),
    endsAt: new Date(2025, 10, 8, 16, 30),
    provider: "google" as const,
  },
];

export default function CalendarPage() {
  const [events] = useState(mockEvents);

  const handleEventClick = (eventId: string) => {
    console.log("Event clicked:", eventId);
  };

  return <CalendarView events={events} onEventClick={handleEventClick} />;
}
