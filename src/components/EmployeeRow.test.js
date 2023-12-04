// EmployeeRow.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import EmployeeRow from "./EmployeeRow";

test("renders employee name in input", () => {
  // Create the mock data to match what EmployeeRow expects
  const mockEmployee = {
    name: "John Doe",
    // ... other properties that EmployeeRow might be expecting
  };

  // Mock the calculateNetSalary function
  const mockCalculateNetSalary = jest
    .fn()
    .mockReturnValue({ netSalary: "5000", wht: "500" });

  // Render the component with mock data
  render(
    <EmployeeRow
      employee={mockEmployee}
      calculateNetSalary={mockCalculateNetSalary}
    />
  );

  // Assert that the input element correctly displays the name
  expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
});
