import ReactPlayer from "react-player/lazy";
import Screenshots from "../Screenshots/Screenshots";

export default function GameInfo(props) {
  const { gameData } = props;

  return (
    <div className="game-info">
      <ReactPlayer className="game-info__video" url={gameData.video} controls />
      <Screenshots title={gameData.title} screenshots={gameData.screenshots} />
    </div>
  );
}
