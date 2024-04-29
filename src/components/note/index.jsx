import "./index.css";

const Note = ({ title, date, body }) => {
  return (
    <div className="note">
      <div className="note-header">
        <h4 className="note-header__title"> {title}</h4>
        <p className="note-header__date">{date}</p>
      </div>
      <p className="note-body">{body}</p>
    </div>
  );
};

export default Note;
