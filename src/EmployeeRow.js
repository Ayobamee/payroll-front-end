import React from "react";
import CustomDropdown from "./CustomDropdown"; // Make sure this path is correct

function EmployeeRow({
  employee,
  index,
  handleChange,
  handleRemoveRow,
  calculateNetSalary,
}) {
  // Calculate derived values like net salary and W.H.T
  const { netSalary, wht } = calculateNetSalary(employee);

  return (
    <tr>
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
        <CustomDropdown
          employeeType={employee.employeeType}
          index={index}
          onSelect={(value) => handleChange(index, "employeeType", value)}
        />
      </td>
      <td>
        <input
          className="input-field"
          data-testid="Gross Pay"
          type="textarea"
          value={employee.grossPay}
          onChange={(e) => handleChange(index, "grossPay", e.target.value)}
        />
      </td>
      <td>
        <input
          className="input-field"
          data-testid="Loan Deduction"
          type="number"
          value={employee.loanRepayment}
          onChange={(e) => handleChange(index, "loanRepayment", e.target.value)}
        />
      </td>
      <td>
        {employee.employeeType !== "Contract" && employee.grossPay
          ? (parseFloat(employee.grossPay) * 0.05).toFixed(2)
          : ""}
      </td>
      <td>{wht}</td>
      <td>{netSalary}</td>
      <td>
        <input
          type="textarea"
          data-testid="Prorated Days"
          placeholder="Prorated Days"
          value={employee.proratedDays}
          onChange={(e) => handleChange(index, "proratedDays", e.target.value)}
        />
      </td>
      <td>{employee.proratedPay ? employee.proratedPay : ""}</td>
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
  );
}

export default EmployeeRow;
