import CloseButton from "../closeButton";
import { useState, useRef } from "react";
import "./index.css";

const EditableNote = ({ onSave, closeNote, prevNote }) => {
  const [title, setTitle] = useState(prevNote.title);
  const [body, setBody] = useState(prevNote.body);

  const textRef = useRef(null);

  const resizeTextArea = () => {
    textRef.current.style.cssText = `height: ${textRef.current.scrollHeight}px; overflow-y: hidden`;
  };

  const editNote = () => {
    if (title === "" || body === "") {
      alert("Please enter a title and body");
      return;
    }
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    const note = {
      id: prevNote.id,
      title,
      body,
      date: formattedDate,
    };
    onSave(note);
    setTitle("");
    setBody("");
    resizeTextArea();
  };
  return (
    <div className="editable">
      <input
        type="text"
        maxLength={30}
        placeholder="Title"
        className="editable-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        type="text"
        className="editable-body"
        value={body}
        onChange={(e) => {
          setBody(e.target.value), resizeTextArea();
        }}
        ref={textRef}
      ></textarea>
      <button className="editable-create" onClick={editNote}>
        Save
      </button>
      <CloseButton
        closeNote={closeNote}
        position={"editable-close__absolute"}
      />
    </div>
  );
};

export default EditableNote;
