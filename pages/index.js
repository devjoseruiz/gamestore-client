import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import BaseLayout from "../layouts/BaseLayout";
import { size } from "lodash";
import { getLastGamesApi } from "../api/game";
import GamesList from "../components/GamesList/GamesList";

export default function Home() {
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastGamesApi(20);
      setGames(response || []);
    })();
  }, []);

  return (
    <div className="home">
      <BaseLayout>
        {!games && <Loader active>Loadign games...</Loader>}
        {games && size(games) === 0 && (
          <div>
            <h3>There are not games</h3>
          </div>
        )}
        {size(games) > 0 && <GamesList games={games} />}
      </BaseLayout>
    </div>
  );
}
