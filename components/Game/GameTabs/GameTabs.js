import { Tab } from "semantic-ui-react";
import GameInfo from "../GameInfo/GameInfo";

export default function GameTabs(props) {
  const { gameData } = props;

  const panes = [
    {
      menuItem: "More info",
      render: () => (
        <Tab.Pane>
          <GameInfo gameData={gameData} />
        </Tab.Pane>
      ),
    },
  ];

  return <Tab className="game-tabs" panes={panes}></Tab>;
}
