import React, { useState } from "react";
import Modal from "./Modal"; // Ensure this component is created
import EmployeeRow from "./components/EmployeeRow"; // Import the EmployeeRow component
import "./SalaryTable.css"; // Ensure the CSS path is correct

function SalaryTable() {
  const initialEmployeeState = {
    // ... initial state properties ...
    month: "",
    name: "",
    employeeType: "Founder",
    grossPay: "",
    loanRepayment: "",
    netSalary: "",
    wht: "",
    proratedDays: "",
    proratedPay: "",
    error: "",
  };

  const [employees, setEmployees] = useState([initialEmployeeState]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isTableVisible, setIsTableVisible] = useState(false);

  const handleAddRow = () => {
    setIsTableVisible(true);
    setEmployees([...employees, { ...initialEmployeeState }]);
  };

  const handleRemoveRow = (index) => {
    const rows = [...employees];
    rows.splice(index, 1);
    setEmployees(rows);
    if (rows.length === 0) {
      setIsTableVisible(false);
    }
  };

  const handleChange = (index, field, value) => {
    const newEmployees = [...employees];
    newEmployees[index][field] = value;
    setEmployees(newEmployees);
  };

  const calculateNetSalary = (employee) => {
    // ... implementation ...
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
    let proratedPay =
      employee.proratedDays > 0
        ? (netSalary / employee.proratedDays).toFixed(2)
        : "";

    return {
      wht: wht.toFixed(2),
      netSalary: netSalary.toFixed(2),
      proratedPay: proratedPay,
    };
  };

  const handleSubmit = () => {
    // ... implementation ...
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
    setIsTableVisible(false);
  };

  return (
    <div>
      {isTableVisible && (
        <table className="salary-table">
          <thead>
            {/* Table headers */}
            <tr>
              <th>Month</th>
              <th>Staff Name</th>
              <th>StaffCategory</th>
              <th>Gross Pay</th>
              <th>Loans</th>
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
              <EmployeeRow
                key={index}
                employee={employee}
                index={index}
                handleChange={handleChange}
                handleRemoveRow={handleRemoveRow}
                calculateNetSalary={calculateNetSalary}
              />
            ))}
          </tbody>
        </table>
      )}
      <div className="add-remove-btns">
        <button
          className="add-employee-btn"
          data-testid="add-employee"
          onClick={handleAddRow}
        >
          Add Employee
        </button>

        <button
          className="calculate-salaries-btn"
          data-testid="calculate-salaries"
          onClick={handleSubmit}
        >
          Calculate Salary
        </button>
        <button
          className="clear-all-btn"
          data-testid="clear-all"
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
