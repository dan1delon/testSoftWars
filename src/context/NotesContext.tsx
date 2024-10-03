import React, { createContext, useReducer, useContext } from "react";

interface Note {
  id: string;
  content: string;
  date: string;
}

type State = {
  notes: Note[];
  selectedNoteId: string | null;
};

type Action =
  | { type: "ADD_NOTE"; payload: Note }
  | { type: "UPDATE_NOTE"; payload: { id: string; content: string } }
  | { type: "DELETE_NOTE"; payload: string }
  | { type: "SELECT_NOTE"; payload: string };

const initialState: State = {
  notes: [],
  selectedNoteId: null,
};

const NotesContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

const notesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.payload] };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? { ...note, content: action.payload.content }
            : note
        ),
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
        selectedNoteId: null,
      };
    case "SELECT_NOTE":
      return { ...state, selectedNoteId: action.payload };
    default:
      return state;
  }
};

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
