import "./index.css";

const CloseButton = ({ closeNote, position }) => {
  return (
    <button className={`new-close ${position}`} onClick={closeNote}>
      x{" "}
    </button>
  );
};

export default CloseButton;
