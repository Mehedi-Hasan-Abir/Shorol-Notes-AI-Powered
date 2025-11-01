import NoteCard from '../NoteCard';

export default function NoteCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <NoteCard
        id="1"
        title="আগামীকালের মিটিং"
        body="প্রোজেক্ট ম্যানেজারের সাথে মিটিং আছে সকাল ১০টায়। গুরুত্বপূর্ণ বিষয়গুলো নিয়ে আলোচনা করতে হবে।"
        isImportant={true}
        hasAudio={true}
        hasEvent={true}
        createdAt={new Date(Date.now() - 2 * 60 * 60 * 1000)}
        onToggleImportant={(id) => console.log('Toggle important:', id)}
        onClick={(id) => console.log('Click note:', id)}
      />
    </div>
  );
}
