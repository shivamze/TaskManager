import React, { useState } from 'react';
import { useNotes } from '../../context/NotesContext';
import { IoClose } from 'react-icons/io5';

const NoteForm = ({ closeForm }) => {
  const { addNote } = useNotes();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) return;

    await addNote(title, body);

    setTitle('');
    setBody('');
    closeForm(); 
  };

  return (
    <div className="relative p-4 border rounded shadow bg-gray-50 mb-6">
      
      <button
        onClick={closeForm}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
        title="Close"
      >
        <IoClose />
      </button>

      <h2 className="text-xl font-bold mb-2">Add New Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Note content (supports HTML)"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border p-2 rounded h-32"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
