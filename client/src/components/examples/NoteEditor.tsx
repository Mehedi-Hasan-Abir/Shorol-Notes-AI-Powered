import NoteEditor from '../NoteEditor';

export default function NoteEditorExample() {
  return (
    <div className="h-screen">
      <NoteEditor
        title="আগামীকালের মিটিং"
        body="প্রোজেক্ট ম্যানেজারের সাথে মিটিং আছে সকাল ১০টায়।"
        isImportant={true}
        hasAudio={true}
        onSave={(title, body, isImportant) => {
          console.log('Save:', { title, body, isImportant });
        }}
        onBack={() => console.log('Back clicked')}
        onTranscribeAndSummarize={() => console.log('Transcribe clicked')}
        onCreateCalendarEvent={(provider) => console.log('Create event:', provider)}
      />
    </div>
  );
}
