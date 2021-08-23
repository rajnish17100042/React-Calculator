import React, { useState } from 'react';
import './App.css';
import Buttons from './Buttons.js';


//delFlag is used to handle the function(calculate func,display func,del func)....if delFlag is 0 then function will not execute  
// i.e if result is calculated then del button should be disabled 

let delFlag = 1;

function App() {



  let [calc, setCalc] = useState("");
  let [history, setHistory] = useState("");

  let ops = ['+', '-', '/', '*', '.'];
  let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')'];

  // arrow function to clear the screen
  let clearScreen = () => {
    // although the data type of calc is changed to number after the expression is evaluated using eval() function which returns a number data type we are setting calc back to the string
    setCalc("");
    setHistory("");
    delFlag = 1;
  }

  // arrow function to display the result on  the screen
  let display = (value) => {
    //  check if the expression is evaluated i.e if data type calc is a number 
    if (delFlag) {
      // check for the correct expression like  5+2 ...not 5++2
      if (
        ((ops.includes(value)) && (calc === '')) ||
        ((ops.includes(value)) && (ops.includes(calc.slice(-1).toString())))

      ) {

        alert('not a valid expression');
        return;
      }

      // if every thing is fine then update the calculation

      setCalc(calc + value);

    }



  }




  // arrow function to calculate the result
  let calculate = () => {

    // check if the result is already calculated using the data type of calc and calc is not an empty string
    // check if the last entered value is not an operator
    if ((delFlag) && !(ops.includes(calc.slice(-1))) && calc != '') {

      try {
        // first store the history
        setHistory(calc);

        setCalc(eval(calc).toString());
        delFlag = 0;
        // alert('inside try block');
      }
      catch (error) {
        setCalc("Error");
        delFlag = 0;
        // alert('inside catch block');
      }

    }


  }

  // arrow function to delete the last character
  let deleteLast = () => {
    // alert(delFlag);

    if (calc === "") {
      return;
    }

    // check if the calc value is a number ..if it is a number then it means the expression is evaluated then don't allow to press delete button
    else if (delFlag) {
      let value = calc.slice(0, -1);
      setCalc(value);
    }


  }


  return (

    <div className="app">
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
