import React from "react";
import "./Modal.css"; // Ensure you create a corresponding CSS file for styling

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
