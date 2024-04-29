import { useEffect, useState } from "react";
import Cell from "./Cell";
import { Player } from "./Cell";

export default function Board() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const [winner, setWinner] = useState<Player>(null);

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

  function reset() {
    setCells(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  }

  const checkWin = (cells: any) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const w = checkWin(cells);
    if (w) {
      setWinner(w);
    }

    if (!w && !cells.filter((cell) => !cell).length) {
      setWinner("BOTH");
    }
  }, []);

  return (
    <div>
      {!winner && <p>Hey {currentPlayer} its your turn!</p>}
      {winner && winner !== "BOTH" && <p>Congrats {winner}</p>}
      {winner && winner === "BOTH" && <p>Congrats you are both winners</p>}
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
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
