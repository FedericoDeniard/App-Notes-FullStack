import CloseButton from "../closeButton";
import "./index.css";

const Note = ({ title, date, body, id, onDelete }) => {
  const deleteNote = () => {
    onDelete(id);
  };
  return (
    <div className="note">
      <div className="note-header">
        <h4 className="note-header__title"> {title}</h4>
        <p className="note-header__date">{date}</p>
        <CloseButton closeNote={deleteNote} />
      </div>
      <p className="note-body">{body}</p>
    </div>
  );
};

export default Note;
