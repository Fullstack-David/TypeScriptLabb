import { useState } from "react";
import Cell from "./Cell";

export default function Board() {
  const [cells, setCells] = useState([Array(9).fill(null)]);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const [winner, setWinner] = useState(null);

  function setCellValue(index: number) {
    const newData = cells.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      } else {
        return val;
      }
    });
    setCells(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  return (
    <div>
      <p>Hey {currentPlayer} its your turn!</p>
      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Cell
                winner={winner}
                key={i}
                onClick={() => setCellValue(i)}
                value={cells[i]}
              />
            );
          })}
      </div>
    </div>
  );
}
