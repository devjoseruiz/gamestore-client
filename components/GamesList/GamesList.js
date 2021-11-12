import { map } from "lodash";

export default function GamesList(props) {
  const { games } = props;
  return (
    <div className="games-list">
      {map(games, (game) => (
        <h3 key={game.id}>{game.title}</h3>
      ))}
    </div>
  );
}
