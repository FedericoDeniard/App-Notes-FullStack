const checkStorage = (parseNote, notes) => {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    const parsedNotes = JSON.parse(storedNotes);
    console.log("Se detecto algo");
    console.log(storedNotes);
    parseNote(parsedNotes);
  } else {
    console.log("No se detecto nada");
  }
};

const updateNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export { checkStorage, updateNotes };
