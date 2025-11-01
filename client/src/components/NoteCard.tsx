import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Mic, Calendar, MoreVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
  id: string;
  title: string;
  body: string;
  isImportant: boolean;
  hasAudio: boolean;
  hasEvent: boolean;
  createdAt: Date;
  onToggleImportant: (id: string) => void;
  onClick: (id: string) => void;
}

export default function NoteCard({
  id,
  title,
  body,
  isImportant,
  hasAudio,
  hasEvent,
  createdAt,
  onToggleImportant,
  onClick,
}: NoteCardProps) {
  return (
    <Card
      className="p-4 hover-elevate cursor-pointer transition-all"
      onClick={() => onClick(id)}
      data-testid={`card-note-${id}`}
    >
      <div className="flex justify-between items-start mb-3 gap-2">
        <h3 className="text-xl font-semibold line-clamp-2 flex-1" data-testid={`text-note-title-${id}`}>
          {title}
        </h3>
        <div className="flex gap-1 flex-shrink-0">
          <Button
            size="icon"
            variant="ghost"
            className={isImportant ? "text-yellow-500" : "text-muted-foreground"}
            onClick={(e) => {
              e.stopPropagation();
              onToggleImportant(id);
            }}
            data-testid={`button-star-${id}`}
          >
            <Star className={`w-5 h-5 ${isImportant ? "fill-current" : ""}`} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => e.stopPropagation()}
            data-testid={`button-more-${id}`}
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <p className="text-base text-muted-foreground line-clamp-3 mb-3" data-testid={`text-note-preview-${id}`}>
        {body || "কোন বিষয়বস্তু নেই"}
      </p>

      <div className="flex gap-4 items-center text-sm text-muted-foreground flex-wrap">
        <span className="flex items-center gap-2" data-testid={`text-note-time-${id}`}>
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </span>
        {hasAudio && (
          <Badge variant="secondary" className="flex items-center gap-1" data-testid={`badge-audio-${id}`}>
            <Mic className="w-4 h-4" />
            অডিও
          </Badge>
        )}
        {hasEvent && (
          <Badge variant="secondary" className="flex items-center gap-1" data-testid={`badge-calendar-${id}`}>
            <Calendar className="w-4 h-4" />
            ইভেন্ট
          </Badge>
        )}
      </div>
    </Card>
  );
}
