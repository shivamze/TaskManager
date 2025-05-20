import React, { useMemo } from 'react';
import { FaTrashAlt, FaStar, FaRegStar } from 'react-icons/fa';
import { useNotes } from '../../context/NotesContext';

const NoteItem = ({ note: initialNote, onOpen }) => {
  const { notes, deleteNote, ToggleFavorite } = useNotes();

  const updatedNote = useMemo(() => {
    return notes.find(n => n.$id === initialNote.$id) || initialNote;
  }, [notes, initialNote.$id]);

  return (
    <div
      className="p-4 border rounded bg-white relative cursor-pointer h-48 overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-200 hover:scale-[1.02] transition-transform"
      onClick={() => onOpen(updatedNote)}
    >
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-lg line-clamp-1 w-3/4 break-words mb-2">{updatedNote.title}</h2>

        <div
          className="flex items-center gap-2 text-xl text-gray-600"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => ToggleFavorite(updatedNote.$id, updatedNote.isFavorite)}>
            {updatedNote.isFavorite ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
          </button>
          <button onClick={() => deleteNote(updatedNote.$id)}>
            <FaTrashAlt className="hover:text-red-500" />
          </button>
        </div>
      </div>

      <div
        className="text-sm text-gray-700 mt-2 prose break-words line-clamp-5"
        dangerouslySetInnerHTML={{ __html: updatedNote.body }}
      />
    </div>
  );
};

export default NoteItem;