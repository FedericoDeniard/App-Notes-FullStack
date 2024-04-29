import { useEffect, useState } from "react";
import "./App.css";
import Note from "./components/note";
import CreateNote from "./components/createNote";
import { checkStorage, updateNotes } from "./resources/localstorage";
import Header from "./components/header";

function App() {
  const [notes, setNotes] = useState([]);
  const [addNewNote, setAddNewNote] = useState(false);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
    setAddNewNote(false);
    updateNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    updateNotes(updatedNotes);
  };

  const parseNote = (parsedNotes) => {
    if (Array.isArray(parsedNotes)) {
      setNotes(parsedNotes);
    } else {
      setNotes([]);
    }
  };

  useEffect(() => {
    checkStorage(parseNote);
  }, []);

  return (
    <>
      <Header newNote={() => setAddNewNote(true)} />
      <div className="notes-container">
        {notes.map((note, index) => (
          <Note
            key={index}
            id={note.id}
            title={note.title}
            date={note.date}
            body={note.body}
            onDelete={deleteNote}
          />
        ))}
      </div>

      {addNewNote ? (
        <CreateNote onSave={addNote} closeNote={() => setAddNewNote(false)} />
      ) : (
        ""
      )}
    </>
  );
}

export default App;
