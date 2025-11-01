import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Square, Play, Pause, Trash2 } from "lucide-react";

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob, duration: number) => void;
}

export default function VoiceRecorder({ onRecordingComplete }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        onRecordingComplete(audioBlob, recordingTime);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("মাইক্রোফোন অ্যাক্সেস করতে সমস্যা হয়েছে");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl!);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setRecordingTime(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="p-6" data-testid="card-voice-recorder">
      <div className="flex flex-col items-center gap-6">
        {!isRecording && !audioUrl && (
          <Button
            size="lg"
            variant="default"
            className="w-20 h-20 rounded-full"
            onClick={startRecording}
            data-testid="button-start-recording"
          >
            <Mic className="w-8 h-8" />
          </Button>
        )}

        {isRecording && (
          <>
            <div className="relative">
              <Button
                size="lg"
                variant="destructive"
                className="w-20 h-20 rounded-full animate-pulse"
                onClick={stopRecording}
                data-testid="button-stop-recording"
              >
                <Square className="w-8 h-8" />
              </Button>
              <div className="absolute -inset-2 border-4 border-destructive rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="text-2xl font-mono" data-testid="text-recording-time">
              {formatTime(recordingTime)}
            </div>
          </>
        )}

        {audioUrl && !isRecording && (
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                size="icon"
                variant="default"
                onClick={togglePlayback}
                data-testid="button-play-pause"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <div className="text-lg font-mono" data-testid="text-playback-time">
                {formatTime(recordingTime)}
              </div>
              <Button
                size="icon"
                variant="destructive"
                onClick={deleteRecording}
                data-testid="button-delete-recording"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-0 transition-all"></div>
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground text-center">
          {!isRecording && !audioUrl && "রেকর্ড শুরু করতে বোতামে ক্লিক করুন"}
          {isRecording && "রেকর্ডিং চলছে..."}
          {audioUrl && !isRecording && "রেকর্ডিং সম্পন্ন হয়েছে"}
        </p>
      </div>
    </Card>
  );
}
