import "./index.css";
import addNote from "../../assets/addNote.svg";

const Header = ({ newNote }) => {
  return (
    <div className="header">
      <img onClick={newNote} className="header-add" src={addNote}></img>
    </div>
  );
};

export default Header;
