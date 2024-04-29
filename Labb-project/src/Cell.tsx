export type Player = "X" | "O" | "BOTH" | null;

export default function Cell({
  value,
  onClick,
  winner,
}: {
  winner: Player;
  value: Player;
  onClick: () => void;
}) {
  if (!value) {
    return (
      <button className="cell" onClick={onClick} disabled={Boolean(winner)} />
    );
  }
  return (
    <button className={`cell cell_${value}`} disabled>
      {value}
    </button>
  );
}
