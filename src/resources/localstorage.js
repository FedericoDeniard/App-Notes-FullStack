const checkStorage = (parseNote) => {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    const parsedNotes = JSON.parse(storedNotes);
    parseNote(parsedNotes);
  } else {
  }
};

const updateNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export { checkStorage, updateNotes };
