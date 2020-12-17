import React      from "react";
import './App.css';
import "milligram";
import { Select } from "./select";
import CountriesData from "./countries";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Select
            data={CountriesData}
            selectedValues={["AF", "AW"]}
            value="code"
            label="name"
          />
        </div>
      </header>
    </div>
  );
}

export default App;
