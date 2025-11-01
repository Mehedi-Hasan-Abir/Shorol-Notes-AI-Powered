import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-6" data-testid="empty-state">
      <FileText className="w-24 h-24 text-muted-foreground opacity-40 mb-6" />
      <h2 className="text-2xl font-semibold mb-2" data-testid="text-empty-title">
        {title}
      </h2>
      <p className="text-muted-foreground text-center mb-6 max-w-md" data-testid="text-empty-message">
        {message}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} data-testid="button-empty-action">
          <Plus className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
