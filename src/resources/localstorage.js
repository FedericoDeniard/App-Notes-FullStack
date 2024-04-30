const checkStorage = ({ parseNote, setUsername, setPassword, setNotes }) => {
  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");
  const storedNotes = localStorage.getItem("notes");

  if (storedUsername && storedPassword) {
    setUsername(storedUsername);
    setPassword(storedPassword);
    fetch(
      `http://127.0.0.1:8000/users/notes/${storedUsername}?password=${storedPassword}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        return response.json();
      })
      .then((data) => {
        setNotes(data);
        localStorage.setItem("notes", JSON.stringify(data));
        parseNote(data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  } else {
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);
      parseNote(parsedNotes);
    }
  }
};

const updateNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export { checkStorage, updateNotes };
