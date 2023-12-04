import React from "react";
import SalaryTable from "./SalaryTable"; // Make sure the path matches the location of your component
import logoImage from "./logoo.png";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoImage} alt="Logo" className="logo" />
        <h1>Payroll Calculator</h1>
      </header>
      <main>
        <SalaryTable />
      </main>
    </div>
  );
}

export default App;
