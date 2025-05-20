import React, { useState } from 'react';
import { useNotes } from '../../context/NotesContext';
import NoteItem from './NoteItem';
import NoteModal from './NoteModel';

const NoteList = () => {
  const { notes, deleteNote, ToggleFavorite } = useNotes();
  const [selectedNote, setSelectedNote] = useState(null);

  if (!notes.length) {
    return <p className="text-center text-gray-500 mt-6">No notes available. Add one!</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {notes.map(note => (
          <NoteItem key={note.$id} note={note} onOpen={() => setSelectedNote(note)} />
        ))}
      </div>

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
    </>
  );
};

export default NoteList;