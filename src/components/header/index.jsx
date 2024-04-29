import "./index.css";
import addNoteSVG from "../../assets/addNote.svg";
import loginSVG from "../../assets/login.svg";
import logoutSVG from "../../assets/logout.svg";

const Header = ({ newNote, logged, login }) => {
  console.log(logged);

  return (
    <div className="header">
      <div className="header-center">
        <img onClick={newNote} className="header-add" src={addNoteSVG} />
      </div>
      {!logged ? (
        <img src={loginSVG} className="header-login" onClick={login} />
      ) : (
        <img src={logoutSVG} className="header-login" />
      )}
    </div>
  );
};

export default Header;
