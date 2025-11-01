import VoiceRecorder from '../VoiceRecorder';

export default function VoiceRecorderExample() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <VoiceRecorder
        onRecordingComplete={(blob, duration) => {
          console.log('Recording complete:', { size: blob.size, duration });
        }}
      />
    </div>
  );
}
