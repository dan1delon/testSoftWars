import React, { useEffect, useState } from "react";
import { useNotes } from "../../context/NotesContext";

const NoteEditor: React.FC = () => {
  const { state, dispatch } = useNotes();
  const selectedNote = state.notes.find(
    (note) => note.id === state.selectedNoteId
  );
  const [content, setContent] = useState(selectedNote?.content || "");

  useEffect(() => {
    if (selectedNote) {
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  useEffect(() => {
    if (selectedNote) {
      dispatch({
        type: "UPDATE_NOTE",
        payload: { id: selectedNote.id, content },
      });
    }
  }, [content]);

  const handleDelete = () => {
    if (selectedNote) {
      dispatch({ type: "DELETE_NOTE", payload: selectedNote.id });
    }
  };

  if (!selectedNote) {
    return <div>Select a note to edit</div>;
  }

  return (
    <div className="note-editor">
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default NoteEditor;
