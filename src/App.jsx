import { useEffect, useState } from "react";
import "./App.css";
import Note from "./components/note";
import CreateNote from "./components/createNote";
import { checkStorage, updateNotes } from "./resources/localstorage";
import Header from "./components/header";
import EditableNote from "./components/editableNote";
import RegisterPage from "./components/register";

function App() {
  const [notes, setNotes] = useState([]);
  const [addNewNote, setAddNewNote] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [registerPage, setLoginPage] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
    setAddNewNote(false);
    updateNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    console.log(id);
    if (isLogged && username) {
      fetch(`http://127.0.0.1:8000/users/${username}/notes/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to delete note");
          }
        })
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
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
    checkStorage({ parseNote, setUsername, setPassword, setNotes });
  }, []);

  useEffect(() => {}, []);

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
      if (isLogged) {
        const requestBody = {
          id: editedNote.id,
          title: editedNote.title,
          date: editedNote.date,
          body: editedNote.body,
        };
        fetch(`http://127.0.0.1:8000/users/notes/${username}/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update note");
            }
            return response.json();
          })
          .then((data) => {
            alert(data["message"]);
          })
          .catch((error) => {
            console.error(error);
            alert("Failed to update note");
          });
      }
    }
  };

  const handleGetNotes = (data) => {
    setNotes(data);
    localStorage.setItem("notes", JSON.stringify(data));
  };

  const login = () => {
    setLoginPage(true);
  };

  const setIsLogin = (data) => {
    setUsername(data);
    setIsLogged(true);
    setLoginPage(false);
    localStorage.setItem("logged", true);
  };

  return (
    <>
      <Header
        login={login}
        newNote={() => setAddNewNote(true)}
        logged={isLogged}
        username={username}
      />
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

      {addNewNote && (
        <CreateNote onSave={addNote} closeNote={() => setAddNewNote(false)} />
      )}
      {editingNote && (
        <EditableNote
          closeNote={() => setEditingNote(false)}
          onSave={saveEditNote}
          prevNote={noteToEdit}
        />
      )}
      {registerPage && (
        <RegisterPage
          setPass={(data) => {
            setPassword(data), localStorage.setItem("password", data);
          }}
          setUser={(data) => setUsername(data)}
          setIsLogin={setIsLogin}
          closeLogin={() => setLoginPage(false)}
          notes={notes}
          getNotes={handleGetNotes}
        />
      )}
    </>
  );
}

export default App;
