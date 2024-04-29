import { useEffect, useState } from "react";
import "./App.css";
import Note from "./components/note";
import CreateNote from "./components/createNote";
import { checkStorage, updateNotes } from "./resources/localstorage";
import Header from "./components/header";
import EditableNote from "./components/editableNote";

function App() {
  const [notes, setNotes] = useState([]);
  const [addNewNote, setAddNewNote] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

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

  const saveEditNote = (editedNote) => {
    const index = notes.findIndex((note) => note.id === editedNote.id);

    if (index !== -1) {
      const updatedNotes = [
        ...notes.slice(0, index),
        editedNote,
        ...notes.slice(index + 1),
      ];
      setNotes(updatedNotes);
      updateNotes(updatedNotes);
      setEditingNote(false);
    }
  };

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
            onEdit={() => {
              setEditingNote(true);
              setNoteToEdit(notes.find((n) => n.id === note.id));
            }}
          />
        ))}
      </div>

      {addNewNote ? (
        <CreateNote onSave={addNote} closeNote={() => setAddNewNote(false)} />
      ) : (
        ""
      )}
      {editingNote ? (
        <EditableNote
          closeNote={() => setEditingNote(false)}
          onSave={saveEditNote}
          prevNote={noteToEdit}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default App;
