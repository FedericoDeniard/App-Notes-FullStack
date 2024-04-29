import { useEffect, useState } from "react";
import "./App.css";
import Note from "./components/note";
import CreateNote from "./components/createNote";

function App() {
  const [notes, setNote] = useState([]);

  const addNote = (newNote) => {
    setNote([...notes, newNote]);
  };

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <>
      {notes.map((note, index) => (
        <Note
          key={note.id}
          title={note.title}
          date={note.date}
          body={note.body}
        />
      ))}
      <CreateNote onSave={addNote} />
    </>
  );
}

export default App;
