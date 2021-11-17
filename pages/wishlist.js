import React, { useState, useEffect } from "react";
import BaseLayout from "../layouts/BaseLayout";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size, forEach } from "lodash";
import { getFavouritesByUserApi } from "../api/favourite";
import useAuth from "../hooks/useAuth";
import GamesList from "../components/GamesList/GamesList";
import Pagination from "../components/Pagination/Pagination";
import Seo from "../components/Seo";

export default function Platform() {
  const { query } = useRouter();
  const { auth, logout } = useAuth();
  const [games, setGames] = useState(null);
  const [totalGames, setTotalGames] = useState(0);
  const limitPerPage = 20;

  const getStartItem = () => {
    const currentPage = parseInt(query.page);
    if (!query.page || currentPage === 1) return 0;
    else return currentPage * limitPerPage - limitPerPage;
  };

  useEffect(() => {
    (async () => {
      const response = await getFavouritesByUserApi(
        auth.idUser,
        logout,
        limitPerPage,
        getStartItem()
      );

      let gamesList = [];
      const listSize = size(response);
      if (listSize > 0) {
        forEach(response, (data) => {
          gamesList.push(data.game);
        });
      }

      setTotalGames(listSize);
      setGames(gamesList);
    })();
  }, [query]);

  return (
    <div className="wishlist">
      <BaseLayout>
        <Seo title="My wishlist | Gamestore" />
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
