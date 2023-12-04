// EmployeeRow.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import EmployeeRow from "./EmployeeRow";

test("renders employee name", () => {
  // Create the mock data to match what EmployeeRow expects
  const mockEmployee = {
    // ... other properties that EmployeeRow might be expecting
    name: "John Doe",
  };

  // Render the component with mock data
  render(<EmployeeRow employee={mockEmployee} />);

  // Assert that the component correctly displays the name
  expect(screen.getByText("John Doe")).toBeInTheDocument();
});
