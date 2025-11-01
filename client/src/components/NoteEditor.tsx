import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, ArrowLeft, Star, Mic, Sparkles, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import VoiceRecorder from "./VoiceRecorder";

interface NoteEditorProps {
  title: string;
  body: string;
  isImportant: boolean;
  hasAudio: boolean;
  onSave: (title: string, body: string, isImportant: boolean) => void;
  onBack: () => void;
  onTranscribeAndSummarize?: () => void;
  onCreateCalendarEvent?: (provider: "google" | "outlook") => void;
}

export default function NoteEditor({
  title: initialTitle,
  body: initialBody,
  isImportant: initialImportant,
  hasAudio,
  onSave,
  onBack,
  onTranscribeAndSummarize,
  onCreateCalendarEvent,
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [isImportant, setIsImportant] = useState(initialImportant);
  const [showRecorder, setShowRecorder] = useState(false);

  const handleSave = () => {
    onSave(title, body, isImportant);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-background border-b p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={onBack}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-lg font-semibold">নোট সম্পাদনা</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className={isImportant ? "text-yellow-500" : ""}
            onClick={() => setIsImportant(!isImportant)}
            data-testid="button-toggle-important"
          >
            <Star className={`w-5 h-5 ${isImportant ? "fill-current" : ""}`} />
          </Button>
          <Button onClick={handleSave} data-testid="button-save">
            <Save className="w-4 h-4 mr-2" />
            সংরক্ষণ
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="নোটের শিরোনাম..."
            className="text-2xl font-semibold border-0 border-b rounded-none px-0 focus-visible:ring-0"
            data-testid="input-note-title"
          />

          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="এখানে লিখুন..."
            className="min-h-96 text-lg resize-none border-0 focus-visible:ring-0"
            data-testid="textarea-note-body"
          />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowRecorder(!showRecorder)}
                data-testid="button-toggle-recorder"
              >
                <Mic className="w-4 h-4 mr-2" />
                {showRecorder ? "রেকর্ডার বন্ধ করুন" : "ভয়েস রেকর্ড করুন"}
              </Button>
              {hasAudio && (
                <Badge variant="secondary">
                  <Mic className="w-3 h-3 mr-1" />
                  অডিও সংযুক্ত
                </Badge>
              )}
            </div>

            {showRecorder && (
              <VoiceRecorder
                onRecordingComplete={(blob, duration) => {
                  console.log("Recording saved:", { size: blob.size, duration });
                  setShowRecorder(false);
                }}
              />
            )}
          </div>

          {hasAudio && (
            <Card className="p-4 space-y-3">
              <h3 className="font-semibold">AI সুবিধা</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={onTranscribeAndSummarize}
                  data-testid="button-transcribe-summarize"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  ট্রান্সক্রাইব + সামারি
                </Button>
              </div>
            </Card>
          )}

          <Card className="p-4 space-y-3">
            <h3 className="font-semibold">ক্যালেন্ডার ইভেন্ট তৈরি করুন</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => onCreateCalendarEvent?.("google")}
                data-testid="button-create-google-event"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Google Calendar
              </Button>
              <Button
                variant="outline"
                onClick={() => onCreateCalendarEvent?.("outlook")}
                data-testid="button-create-outlook-event"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Outlook Calendar
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
