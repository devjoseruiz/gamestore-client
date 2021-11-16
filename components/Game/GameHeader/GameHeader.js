import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import moment from "moment";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import {
  getIsFavouriteGameApi,
  createFavouriteApi,
  deleteFavouriteApi,
} from "../../../api/favourite";

export default function GameHeader(props) {
  const { gameData } = props;

  return (
    <Grid className="game-header">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={gameData.poster.url} alt={gameData.title} fluid />
      </Grid.Column>
      <Grid.Column className="game-info" mobile={16} tablet={10} computer={11}>
        <Info gameData={gameData} />
      </Grid.Column>
    </Grid>
  );
}

function Info(props) {
  const { gameData } = props;
  const [isFavourite, setIsFavourite] = useState(false);
  const { auth, logout } = useAuth();
  const { addProductToCart } = useCart();
  let gamePrice = gameData.price;

  if (gameData.discount)
    gamePrice -= ((gameData.price * gameData.discount) / 100).toFixed(2);

  useEffect(() => {
    (async () => {
      if (auth) {
        const response = await getIsFavouriteGameApi(
          auth.idUser,
          gameData.id,
          logout
        );
        if (response) setIsFavourite(true);
        else setIsFavourite(false);
      }
    })();
  }, [gameData]);

  const addFavourite = () => {
    (async () => {
      if (auth) {
        const response = await createFavouriteApi(
          auth.idUser,
          gameData.id,
          logout
        );
        if (response) setIsFavourite(true);
      }
    })();
  };

  const deleteFavourite = () => {
    (async () => {
      if (auth) {
        const response = await deleteFavouriteApi(
          auth.idUser,
          gameData.id,
          logout
        );
        if (response) setIsFavourite(false);
      }
    })();
  };

  return (
    <>
      <div className="game-header__title">
        {gameData.title}
        {auth && (
          <Icon
            className={`${isFavourite && "like"}`}
            name={!isFavourite ? "heart outline" : "heart"}
            link
            onClick={isFavourite ? deleteFavourite : addFavourite}
          />
        )}
      </div>

      <div className="game-header__summary">
        {gameData.summary}
        <div className="game-header__summary-release-date">
          <h4>Release date:</h4>
          <p>{moment(gameData.release_date).format("LL")}</p>
        </div>
      </div>

      <div className="game-header__buy">
        <div className="game-header__buy-price">
          <p>The best price guaranteed for you!</p>
          <div className="game-header__buy-price-actions">
            {gameData.discount && <p>-{gameData.discount}%</p>}
            <p>{gamePrice}$</p>
          </div>
        </div>
        <Button
          className="game-header__buy-btn"
          onClick={() => addProductToCart(gameData.url)}
        >
          Buy
        </Button>
      </div>
    </>
  );
}
