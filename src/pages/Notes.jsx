import React, { useState } from 'react';
// import { useNotes } from '../context/NotesContext';
import NoteForm from '../components/NotesComponent/NoteForm';
import NoteList from '../components/NotesComponent/NotesList';
import { Plus } from 'lucide-react';

const Notes = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📝 Your Notes</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex"
        >
          <Plus className="w-5 h-5 m-1 text-white " />
          <span>Add Note</span>
        </button>
      </div>

      {showForm && <NoteForm closeForm={() => setShowForm(false)} />}

      <NoteList />
    </div>
  );
};

export default Notes;