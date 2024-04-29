import CloseButton from "../closeButton";
import editButton from "../../assets/edit.svg";
import "./index.css";

const Note = ({ title, date, body, id, onDelete, onEdit }) => {
  const deleteNote = () => {
    onDelete(id);
  };
  const editNote = () => {
    onEdit(id);
  };
  return (
    <div className="note">
      <div className="note-header">
        <h4 className="note-header__title"> {title}</h4>
        <p className="note-header__date">{date}</p>
        <CloseButton closeNote={deleteNote} />
      </div>
      <p className="note-body">{body}</p>
      <div className="note-footer">
        <img className="note-edit" src={editButton} onClick={editNote} />
      </div>
    </div>
  );
};

export default Note;
