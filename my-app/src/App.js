import {useRef, useState} from "react";
import "./App.css";
import _ from "lodash";

function App() {

    const [xoState, setXoState] = useState([
        ["","",""],
        ["","",""],
        ["","",""]
    ]);

    const currentPlayer = useRef("X");
    
    const click = (row, column) => {
      if (xoState[row][column] === "") {
        let newXoState = _.cloneDeep(xoState);
        newXoState[row][column]=currentPlayer.current;

        if (currentPlayer.current === "X")
          currentPlayer.current="O";
        else 
          currentPlayer.current="X";
        
        setXoState(newXoState);

        if (hasWin("X", newXoState)) alert("A castigat X!");
        if (hasWin("O", newXoState)) alert("A castigat O!");
      }
    };


    const hasWin = (player, xoState) => {
      
      //liniile
      for (let row=0;row<3;++row) {
        if (xoState[row][0] === player && xoState[row][1] === player && xoState[row][2] === player)   return true;
      }

      //coloane
      for (let column=0;column<3;++column) {
        if (xoState[0][column] === player && xoState[1][column] && xoState[2][column] === player) return true;
      }

      //diagonale
      if (xoState[0][0] === player && xoState[1][1] === player && xoState[2][2] === player) return true;

      if (xoState[0][2] === player && xoState[1][1] === player && xoState[2][0] === player) return true;

      return false;
    }


    const generateCells = () => {
        let cellsArray = [];

        for (let row=0;row<3;++row) {
            for (let column=0;column<3;++column) {
                cellsArray.push(
                    <div className="cell" style={{gridColumnStart: column + 1, gridRowStart: row +1}} 
                    onClick={() =>click(row,column)}>
                    {xoState[row][column]}
                    </div>
                )
            }
        }

        return cellsArray;

    };

    return <div clasName="App">
        <div className="xoGrid">{generateCells()}</div>
    </div>;
}

export default App;