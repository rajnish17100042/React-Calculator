import React, { useState } from 'react';
import './App.css';



function App() {

  let [calc, setCalc] = useState("");
  let [history, setHistory] = useState("");

  let ops = ['+', '-', '/', '*', '.'];
  let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')'];

  // arrow function to clear the screen
  let clearScreen = () => {
    setCalc("");
  }

  // arrow function to display the result on  the screen
  let display = (value) => {

    // check for the correct expression like  5+2 ...not 5++2
    if (
      ((ops.includes(value)) && (calc === '')) ||
      ((ops.includes(value)) && (ops.includes(calc.slice(-1))))

    ) {

      alert('not a valid expression');
      return;
    }

    // if every thing is fine then update the calculation
    setCalc(calc + value);

  }

  // arrow function to calculate the result
  let calculate = () => {

    // check if the last entered value is not an operator
    if (!(ops.includes(calc.slice(-1)))) {

      // first store the history
      setHistory(calc);

      setCalc(eval(calc).toString());   //eval() returns a number 
    }


  }

  // arrow function to delete the last character
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
        <input type="text" className="screen" value={calc || "0"} disabled />

        <input type="text" className="history" value={history} disabled />

        {/* code to create operators */}
        <div className="operators">
          {ops.map((operator, index) => {
            // if key is not added to the button then there is a warning
            return (<button key={index} onClick={() => { display(operator) }}>{operator}</button>);
          })}

          <button id="del-btn" onClick={deleteLast}>Del</button>
        </div>






        {/* code to create numbers */}
        <div className="digits">
          {digits.map((digit) => {
            return (<button key={digit} onClick={() => { display(digit) }}>{digit}</button>);
          })}


        </div>

        {/* special button*/}
        <div className="special-btn">
          <button onClick={calculate}>=</button>
          <button id="clear" onClick={clearScreen}>C </button>
          <button onClick={() => { display('00') }}> 00</button>
        </div>



      </div>

    </div>

  );
}


export default App;
