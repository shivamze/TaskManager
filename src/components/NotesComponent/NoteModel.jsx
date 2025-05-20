import React from 'react';
import { FaTimes, FaStar, FaRegStar, FaTrashAlt } from 'react-icons/fa';

const NoteModal = ({ note, onClose, onToggleFavorite, onDelete }) => {
  if (!note) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-[90%] max-w-2xl shadow-lg relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-gray-500 hover:text-black text-xl "
        >
          <FaTimes />
        </button>

        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold break-words w-3/4">{note.title}</h2>
          <div className="flex gap-3 text-xl text-gray-600">
            <button onClick={() => onToggleFavorite(note.$id, note.isFavorite)}>
              {note.isFavorite ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
            </button>
            <button onClick={() => onDelete(note.$id)} className="hover:text-red-500">
              <FaTrashAlt />
            </button>
          </div>
        </div>

        <div
          className="prose text-gray-800 text-sm break-words"
          dangerouslySetInnerHTML={{ __html: note.body }}
        />
      </div>
    </div>
  );
};

export default NoteModal;
