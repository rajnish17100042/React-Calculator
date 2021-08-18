import React, { useState } from 'react';
import './App.css';



function App() {

  let [calc, setCalc] = useState("");
  let [result, setResult] = useState("");

  let ops = ['+', '-', '/', '*', '.'];
  let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')'];

  // arrow function to clear the screen
  let clearScreen = () => {

    setCalc("");
  }

  // arrow function display the result on  the screen
  let display = (value) => {

    // check for the correct expression like  5+2 ...not 5++2
    if (
      ops.includes(value) && calc === '' ||
      ops.includes(value) && ops.includes(calc.slice(-1))

    ) {

      alert('not a valid expression');
      return;
    }
    else {
      setCalc(calc + value);
      setResult(calc + value);
    }

  }

  let calculate = () => {

    setCalc(eval(calc));
  }

  let deleteLast = () => {
    if (calc === "") {
      return;
    }
    else {
      let value = calc.slice(0, -1);
      setCalc(value);
    }
  }

  return (
    <div className="App">
      <div className="calculator">
        <input type="text" id="resultScreen" className="screen" value={calc} disabled />

        <input type="text" id="showHistory" className="history" value={result} disabled />

        {/* code to create operators */}
        <div className="operators">
          {ops.map((operator, index) => {
            return (<button key={index} onClick={() => { display(operator) }}>{operator}</button>);
          })}

          <button classNmae="operators" onClick={deleteLast}>Del</button>
        </div>






        {/* code to create numbers */}
        <div className="digits">
          {digits.map((digit) => {
            return (<button key={digit} onClick={() => { display(digit) }}>{digit}</button>);
          })}


        </div>

        {/* for equal sign */}
        <div className="digits evaluate">
          <button className="equal-sign" onClick={calculate}>=</button>
          <button className="digits clear-button" id="clear" onClick={clearScreen}> C </button>
          <button className="digits" onClick={() => { display('00') }}> 00</button>
        </div>



      </div>

    </div>

  );
}


export default App;
