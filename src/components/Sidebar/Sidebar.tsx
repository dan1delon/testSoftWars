import React, { useState } from "react";
import { useNotes } from "../../context/NotesContext";

const Sidebar: React.FC = () => {
  const { state, dispatch } = useNotes();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = state.notes.filter((note) =>
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectNote = (id: string) => {
    dispatch({ type: "SELECT_NOTE", payload: id });
  };

  return (
    <div className="sidebar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredNotes.map((note) => (
          <li key={note.id} onClick={() => handleSelectNote(note.id)}>
            {note.content.slice(0, 20)}...
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          dispatch({
            type: "ADD_NOTE",
            payload: {
              id: Date.now().toString(),
              content: "",
              date: new Date().toLocaleString(),
            },
          })
        }
      >
        Add Note
      </button>
    </div>
  );
};

export default Sidebar;
