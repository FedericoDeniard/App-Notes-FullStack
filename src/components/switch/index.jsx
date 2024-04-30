import "./index.css";

const SwitchButton = ({ onChange }) => {
  return (
    <>
      <label className="switch">
        <input onChange={onChange} type="checkbox" />
        <span className="slider"></span>
      </label>
    </>
  );
};

export default SwitchButton;
