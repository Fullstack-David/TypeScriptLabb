import { useEffect, useState } from "react";
import Cell from "./Cell";
import { Player } from "./Cell";

export default function Board() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const [winner, setWinner] = useState<Player>(null);

  //  Mapapr över cellerna
  //  om index i är lika med indexValue så returnar den currentPlayer
  //  Annars retuneras det ursprungliga värdet i cellen
  //  Uppdaterar cellerna med den nya datan
  //  Om currentPlayer är lika med "X" så sätter den till "O" annars "X"
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

  // Tömmer arrayen och sätter alla värden til noll
  // nollsätter vinnarstatus
  // Väljer en slumpmässigt startspelare om indexet är lika med 1 så kör den "X" annars "O"
  function reset() {
    setCells(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  }
  // CheckWin funktionen bestämmer om det finns en vinnare i spelet baserat på de aktuella cellernas tillstånd.
  // Parametern 'cells' är en array av Player där varje element representerar spelaren i en cell ('X', 'O' eller null).
  // Funktionen itererar över definierade linjer (rader, kolumner, diagonaler) för att kontrollera om en spelare har tre i rad.
  // Om alla tre positioner i någon linje är ockuperade av samma spelare (och inte null), returneras den spelarens värde ('X' eller 'O').
  // Annars returneras null om ingen vinnare finns.
  const checkWin = (cells: Player[]) => {
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
  // useEffecten används för att bestämma spelets utfall baserat på nuvarande celltillstånd.
  // Kallar på checkWin för att se om det finns en vinnare
  // Uppdaterar vinnarstatus om en vinnare finns
  // Sätter vinnarstatus till "BOTH" om spelet är oavgjort
  // Lägger till cells i beroendelistan för att reagera på dess förändringar
  useEffect(() => {
    const w = checkWin(cells);
    if (w) {
      setWinner(w);
    }

    if (!w && !cells.filter((cell) => !cell).length) {
      setWinner("BOTH");
    }
  }, [cells]);

  return (
    <div>
      {!winner && (
        <p>
          Hey <span>{currentPlayer} </span>its your turn!
        </p>
      )}
      {winner && winner !== "BOTH" && (
        <p>
          Congrats <span className="winner">{winner} 👑</span>
        </p>
      )}
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
