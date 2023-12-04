// src/service.js in your React app
import axiosInstance from "./api";

export const fetchEmployees = () => {
  return axiosInstance.get("/employees");
};

export const addEmployee = (employeeData) => {
  return axiosInstance.post("/employees", employeeData);
};

// ... other functions for PUT, DELETE, etc.
