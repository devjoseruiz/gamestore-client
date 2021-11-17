import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BaseLayout from "../layouts/BaseLayout";
import GameHeader from "../components/Game/GameHeader";
import GameTabs from "../components/Game/GameTabs";
import { getGameApi } from "../api/game";
import Seo from "../components/Seo";

export default function Game() {
  const { query } = useRouter();
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getGameApi(query.game);
      setGameData(response || null);
    })();
  }, [query]);

  if (!gameData) return null;

  return (
    <div className="game">
      <BaseLayout>
        <Seo title={`${gameData.title} | Gamestore`} />
        <GameHeader gameData={gameData} />
        <GameTabs gameData={gameData} />
      </BaseLayout>
    </div>
  );
}
