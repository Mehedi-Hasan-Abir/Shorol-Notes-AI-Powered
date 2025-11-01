import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface CalendarEvent {
  id: string;
  title: string;
  startsAt: Date;
  endsAt: Date;
  provider: "google" | "outlook";
}

interface CalendarViewProps {
  events: CalendarEvent[];
  onEventClick: (eventId: string) => void;
}

export default function CalendarView({ events, onEventClick }: CalendarViewProps) {
  const sortedEvents = [...events].sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">ক্যালেন্ডার ইভেন্ট</h1>
        <p className="text-muted-foreground">
          আপনার সব ক্যালেন্ডার ইভেন্ট এক জায়গায়
        </p>
      </div>

      {events.length === 0 ? (
        <Card className="p-12">
          <div className="flex flex-col items-center text-center">
            <CalendarIcon className="w-16 h-16 text-muted-foreground opacity-40 mb-4" />
            <h3 className="text-xl font-semibold mb-2">কোন ইভেন্ট নেই</h3>
            <p className="text-muted-foreground">
              নোট থেকে ক্যালেন্ডার ইভেন্ট তৈরি করুন
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {sortedEvents.map((event) => (
            <Card
              key={event.id}
              className="p-4 border-l-4 border-l-primary hover-elevate cursor-pointer transition-all"
              onClick={() => onEventClick(event.id)}
              data-testid={`card-event-${event.id}`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2" data-testid={`text-event-title-${event.id}`}>
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      {format(event.startsAt, "PPP")}
                    </span>
                    <span>
                      {format(event.startsAt, "p")} - {format(event.endsAt, "p")}
                    </span>
                  </div>
                </div>
                <Badge variant="secondary" data-testid={`badge-provider-${event.id}`}>
                  {event.provider === "google" ? "Google" : "Outlook"}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
