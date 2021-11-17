import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BaseLayout from "../layouts/BaseLayout";
import { Loader } from "semantic-ui-react";
import { getSearchGameApi } from "../api/game";
import { size } from "lodash";
import GamesList from "../components/GamesList";
import Seo from "../components/Seo";

export default function Search() {
  const { query } = useRouter();
  const [matchGames, setMatchGames] = useState(null);

  useEffect(() => {
    document.getElementById("search").focus();
  }, []);

  useEffect(() => {
    (async () => {
      if (size(query.query) >= 3) {
        const response = await getSearchGameApi(query.query);
        setMatchGames(response || []);
      }
    })();
  }, [query]);

  return (
    <div className="search">
      <BaseLayout>
        <Seo title={`Searching for ${query.query || "..."} | Gamestore`} />
        {size(query.query) >= 3 && !matchGames && (
          <Loader active>Loadign games...</Loader>
        )}
        {matchGames && size(matchGames) === 0 && (
          <div>
            <h3>There are not matches</h3>
          </div>
        )}
        {size(matchGames) > 0 && <GamesList games={matchGames} />}
      </BaseLayout>
    </div>
  );
}
