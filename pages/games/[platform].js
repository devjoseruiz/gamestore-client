import React, { useState, useEffect } from "react";
import BaseLayout from "../../layouts/BaseLayout";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import {
  getGamesByPlatformApi,
  getTotalGamesByPlatformApi,
} from "../../api/game";
import GamesList from "../../components/GamesList/GamesList";
import Pagination from "../../components/Pagination/Pagination";
import Seo from "../../components/Seo";

export default function Platform() {
  const { query } = useRouter();
  const [games, setGames] = useState(null);
  const [totalGames, setTotalGames] = useState(0);
  const limitPerPage = 20;

  const capitalize = (text) => {
    return text.slice(0, 1).toUpperCase() + text.slice(1, text.length);
  };

  const getStartItem = () => {
    const currentPage = parseInt(query.page);
    if (!query.page || currentPage === 1) return 0;
    else return currentPage * limitPerPage - limitPerPage;
  };

  useEffect(() => {
    (async () => {
      if (query.platform) {
        const response = await getTotalGamesByPlatformApi(query.platform);
        setTotalGames(response || 0);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      if (query.platform) {
        const response = await getGamesByPlatformApi(
          query.platform,
          limitPerPage,
          getStartItem()
        );
        setGames(response || []);
      }
    })();
  }, [query]);

  return (
    <div className="platform">
      <BaseLayout>
        <Seo title={`${capitalize(query.platform)} | Gamestore`} />
        {!games && <Loader active>Loadign games...</Loader>}
        {games && size(games) === 0 && (
          <div>
            <h3>There are not games</h3>
          </div>
        )}
        {size(games) > 0 && <GamesList games={games} />}

        {totalGames ? (
          <Pagination
            totalGames={totalGames}
            currentPage={query.page ? parseInt(query.page) : 1}
            limitPerPage={limitPerPage}
          />
        ) : null}
      </BaseLayout>
    </div>
  );
}
