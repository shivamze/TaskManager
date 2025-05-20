import React, { useState, useEffect } from 'react';
import { useNotes } from '../context/NotesContext';
import NoteItem from '../components/NotesComponent/NoteItem';
import NoteModal from '../components/NotesComponent/NoteModel';

const BookmarksNotes = () => {
  const { notes, deleteNote, ToggleFavorite } = useNotes();
  const [bookmarked, setBookmarked] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    setBookmarked(notes.filter(note => note.isFavorite));
  }, [notes]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">⭐ Bookmarked Notes</h1>

      {bookmarked.length === 0 ? (
        <p className="text-gray-500">No bookmarked notes yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {bookmarked.map(note => (
            <NoteItem
              key={note.$id}
              note={note}
              onOpen={setSelectedNote} 
            />
          ))}
        </div>
      )}

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onToggleFavorite={ToggleFavorite}
          onDelete={(id) => {
            deleteNote(id);
            setSelectedNote(null);
          }}
        />
      )}
    </div>
  );
};

export default BookmarksNotes;

