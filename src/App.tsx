import React from "react";
import { NotesProvider } from "./context/NotesContext";
import Sidebar from "./components/Sidebar/Sidebar";
import NoteEditor from "./components/NoteEditor/NoteEditor";

const App: React.FC = () => {
  return (
    <NotesProvider>
      <div className="app">
        <Sidebar />
        <NoteEditor />
      </div>
    </NotesProvider>
  );
};

export default App;
