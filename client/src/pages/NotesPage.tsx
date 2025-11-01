import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Mic, FileText } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import NoteCard from "@/components/NoteCard";
import EmptyState from "@/components/EmptyState";
import NoteEditor from "@/components/NoteEditor";

// TODO: remove mock functionality
const mockNotes = [
  {
    id: "1",
    title: "আগামীকালের মিটিং",
    body: "প্রোজেক্ট ম্যানেজারের সাথে মিটিং আছে সকাল ১০টায়। গুরুত্বপূর্ণ বিষয়গুলো নিয়ে আলোচনা করতে হবে।",
    isImportant: true,
    hasAudio: true,
    hasEvent: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "কেনাকাটার তালিকা",
    body: "দুধ, ডিম, আলু, পেঁয়াজ, রসুন কিনতে হবে",
    isImportant: false,
    hasAudio: false,
    hasEvent: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "প্রোজেক্ট আইডিয়া",
    body: "একটি Bangla ভাষার নোট-টেকিং অ্যাপ তৈরি করতে হবে যেটিতে ভয়েস রেকর্ডিং, ট্রান্সক্রিপশন এবং AI সামারাইজেশন থাকবে।",
    isImportant: true,
    hasAudio: true,
    hasEvent: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

export default function NotesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [notes, setNotes] = useState(mockNotes);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  const handleToggleImportant = (id: string) => {
    setNotes(notes.map((note) => 
      note.id === id ? { ...note, isImportant: !note.isImportant } : note
    ));
  };

  const handleSaveNote = (title: string, body: string, isImportant: boolean) => {
    console.log("Save note:", { title, body, isImportant });
    setSelectedNote(null);
  };

  const handleCreateNote = (type: "text" | "voice") => {
    console.log("Create note:", type);
    setSelectedNote("new");
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) ||
                         note.body.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = 
      filter === "all" ||
      (filter === "important" && note.isImportant) ||
      (filter === "audio" && note.hasAudio) ||
      (filter === "recent" && Date.now() - note.createdAt.getTime() < 24 * 60 * 60 * 1000);
    
    return matchesSearch && matchesFilter;
  });

  if (selectedNote) {
    const note = selectedNote === "new" 
      ? { title: "", body: "", isImportant: false, hasAudio: false }
      : notes.find(n => n.id === selectedNote);
    
    if (note) {
      return (
        <NoteEditor
          title={note.title}
          body={note.body}
          isImportant={note.isImportant}
          hasAudio={note.hasAudio}
          onSave={handleSaveNote}
          onBack={() => setSelectedNote(null)}
          onTranscribeAndSummarize={() => console.log("Transcribe and summarize")}
          onCreateCalendarEvent={(provider) => console.log("Create event:", provider)}
        />
      );
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold mb-2">সরল নোট</h1>
          <p className="text-muted-foreground">আপনার সব নোট এক জায়গায়</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleCreateNote("text")} data-testid="button-create-text-note">
            <FileText className="w-4 h-4 mr-2" />
            টেক্সট নোট
          </Button>
          <Button onClick={() => handleCreateNote("voice")} data-testid="button-create-voice-note">
            <Mic className="w-4 h-4 mr-2" />
            ভয়েস নোট
          </Button>
        </div>
      </div>

      <div className="sticky top-0 z-10 bg-background pb-4 space-y-4">
        <SearchBar value={search} onChange={setSearch} />
        <FilterChips activeFilter={filter} onFilterChange={setFilter} />
      </div>

      {filteredNotes.length === 0 ? (
        <EmptyState
          title={search ? "কোন নোট পাওয়া যায়নি" : "কোন নোট নেই"}
          message={
            search
              ? "আপনার অনুসন্ধানের সাথে কোন নোট মিলছে না"
              : "আপনার প্রথম নোট তৈরি করুন অথবা ভয়েস রেকর্ড করুন"
          }
          actionLabel={!search ? "নতুন নোট" : undefined}
          onAction={!search ? () => handleCreateNote("text") : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              {...note}
              onToggleImportant={handleToggleImportant}
              onClick={setSelectedNote}
            />
          ))}
        </div>
      )}
    </div>
  );
}
