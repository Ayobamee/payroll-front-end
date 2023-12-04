import React, { useState } from "react";

function CustomDropdown({ employeeType, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <button
        className="drop-btn"
        data-testid="dropdown"
        onClick={toggleDropdown}
      >
        {employeeType || "Select Employee Type"}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <a href="#!" onClick={() => handleSelect("Founder")}>
            Founder
          </a>
          <a href="#!" onClick={() => handleSelect("Permanent")}>
            Permanent
          </a>
          <a href="#!" onClick={() => handleSelect("Contract")}>
            Contract
          </a>
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
