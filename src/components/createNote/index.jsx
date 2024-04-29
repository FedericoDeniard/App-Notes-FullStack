import "./index.css";
import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const CreateNote = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const textRef = useRef(null);

  const resizeTextArea = () => {
    textRef.current.style.cssText = `height: ${textRef.current.scrollHeight}px; overflow-y: hidden`;
  };

  const newNote = () => {
    if (title === "" || body === "") {
      alert("Please enter a title and body");
      return;
    }
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    const note = {
      id: uuidv4(),
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
    <div className="new">
      <input
        type="text"
        maxLength={15}
        placeholder="Title"
        className="new-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        type="text"
        className="new-body"
        value={body}
        onChange={(e) => {
          setBody(e.target.value), resizeTextArea();
        }}
        ref={textRef}
      >
        Body
      </textarea>
      <button className="new-create" onClick={newNote}>
        Create
      </button>
    </div>
  );
};

export default CreateNote;
