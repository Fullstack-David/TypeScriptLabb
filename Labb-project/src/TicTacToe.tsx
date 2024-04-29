import { useState } from "react";

export type ClickProps = {
  handleClick: (test: string) => void;
};

const handleclick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  console.log("HandleClick");
};

const TicTacToe = ({ handleClick }: ClickProps) => {
  const [click, setClick] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("X");

  return (
    <>
      <button
        className="container"
        style={{
          cursor: "pointer",
          border: "1px solid",
          height: "50px",
          width: "50px",
        }}
        onClick={(e) => handleClick(e)}
      >
        
      </button>
    </>
  );
};

export default TicTacToe;
