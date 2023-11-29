import React, { useState } from "react";
import Modal from "./Modal"; // Ensure this component is created
import "./SalaryTable.css"; // Ensure the CSS path is correct

function SalaryTable() {
  const initialEmployeeState = {
    month: "",
    name: "",
    employeeType: "Founder",
    grossPay: "",
    loanRepayment: "",
    netSalary: "",
    wht: "", // Withholding Tax
    proratedDays: "", // Prorated Days (optional)
    proratedPay: "", // Prorated Pay (calculated)
    error: "",
  };
  const [employees, setEmployees] = useState([initialEmployeeState]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState({});

  const handleAddRow = () => {
    setEmployees([...employees, { ...initialEmployeeState }]);
  };

  const handleRemoveRow = (index) => {
    const rows = [...employees];
    rows.splice(index, 1);
    setEmployees(rows);
  };

  const handleChange = (index, field, value) => {
    const newEmployees = [...employees];
    newEmployees[index][field] = value;
    setEmployees(newEmployees);
  };

  const toggleDropdown = (index) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const selectOption = (index, value) => {
    handleChange(index, "employeeType", value);
    setDropdownOpen((prevState) => ({
      ...prevState,
      [index]: false,
    }));
  };

  const calculateNetSalary = (employee) => {
    const grossPay = parseFloat(employee.grossPay || 0);
    const loanRepayment = parseFloat(employee.loanRepayment || 0);
    const proratedDays = parseInt(employee.proratedDays || 0, 10);
    let taxDeduction = 0;
    let wht = 0;

    if (employee.employeeType === "Contract") {
      wht = grossPay * 0.1; // 10% W.H.T
    } else {
      taxDeduction = grossPay * 0.05; // 5% tax deduction
    }

    let netSalary = grossPay - taxDeduction - wht - loanRepayment;
    let proratedPay = proratedDays ? netSalary / proratedDays : netSalary;

    return {
      netSalary: netSalary.toFixed(2),
      proratedPay: proratedPay.toFixed(2),
    };
  };

  const handleSubmit = () => {
    let hasError = false;
    let errorMessage = "";

    const updatedEmployees = employees.map((employee) => {
      if (!employee.name.trim() || !employee.grossPay) {
        hasError = true;
        errorMessage = "Name and Gross Pay are required";
        return { ...employee, error: errorMessage };
      }
      const { netSalary, proratedPay } = calculateNetSalary(employee);
      return {
        ...employee,
        netSalary,
        proratedPay,
        wht:
          employee.employeeType === "Contract"
            ? (employee.grossPay * 0.1).toFixed(2)
            : "",
        error: "",
      };
    });

    if (hasError) {
      setModalMessage(errorMessage);
      setShowModal(true);
    } else {
      setEmployees(updatedEmployees);
    }
  };

  const handleClearAll = () => {
    setEmployees([initialEmployeeState]);
  };

  return (
    <div>
      <table className="salary-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Staff Name</th>
            <th>StaffCategory</th>
            <th>Gross Pay</th>
            <th>LoanDeduction</th>
            <th>V.A.T(5%)</th>
            <th>W.H.T(10%)</th>
            <th>NetPay</th>
            <th>ProratedDays</th>
            <th>ProratedPay</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>
                <input
                  data-testid="Month"
                  type="month"
                  value={employee.month}
                  onChange={(e) => handleChange(index, "month", e.target.value)}
                />
              </td>
              <td>
                <input
                  data-testid="Employee Name"
                  type="textarea"
                  value={employee.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </td>
              <td>
                <div className="custom-dropdown">
                  <button
                    className="drop-btn"
                    onClick={() => toggleDropdown(index)}
                    data-testid="Employee Type"
                  >
                    {employee.employeeType || "Select Employee Type"}
                  </button>
                  {dropdownOpen[index] && (
                    <div className="dropdown-content">
                      <a
                        href="#!"
                        onClick={() => selectOption(index, "Founder")}
                      >
                        Founder
                      </a>
                      <a
                        href="#!"
                        onClick={() => selectOption(index, "Permanent")}
                      >
                        Permanent
                      </a>
                      <a
                        href="#!"
                        onClick={() => selectOption(index, "Contract")}
                      >
                        Contract
                      </a>
                    </div>
                  )}
                </div>
              </td>
              <td>
                <input
                  className="input-field" // Add this class to your input
                  data-testid="Gross Pay"
                  type="textarea"
                  value={employee.grossPay}
                  onChange={(e) =>
                    handleChange(index, "grossPay", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  className="input-field" // Ensure this class is also here
                  data-testid="Loan Deduction"
                  type="number"
                  value={employee.loanRepayment}
                  onChange={(e) =>
                    handleChange(index, "loanRepayment", e.target.value)
                  }
                />
              </td>
              <td>
                {employee.employeeType !== "Contract" && employee.grossPay
                  ? (parseFloat(employee.grossPay) * 0.05).toFixed(2)
                  : ""}
              </td>
              <td>
                {employee.employeeType === "Contract" && employee.grossPay
                  ? (parseFloat(employee.grossPay) * 0.1).toFixed(2)
                  : ""}
              </td>
              <td>{employee.netSalary}</td>
              <td>
                <input
                  type="textarea"
                  data-testid="Prorated Days"
                  placeholder="Prorated Days"
                  value={employee.proratedDays}
                  onChange={(e) =>
                    handleChange(index, "proratedDays", e.target.value)
                  }
                />
              </td>
              <td>{employee.proratedPay}</td>
              <td>
                <button
                  className="remove-btn"
                  data-testid="Remove-btn"
                  onClick={() => handleRemoveRow(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-remove-btns">
        <button
          className="add-btn"
          data-testid="Add Employee"
          onClick={handleAddRow}
        >
          Add Employee
        </button>
        <button
          className="calculate-btn"
          data-testid="Calculate Salaries"
          onClick={handleSubmit}
        >
          Calculate Salaries
        </button>
        <button
          className="clear-btn"
          data-testid="Clear All"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default SalaryTable;
