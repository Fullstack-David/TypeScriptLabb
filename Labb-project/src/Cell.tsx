type Player = "X" | "O" | null;

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
    return <button onClick={onClick} disabled={Boolean(winner)} />;
  }
  return <button className={`cell cell_${value}`}>{value}</button>;
}
