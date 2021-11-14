import { Grid, Image, Icon, Button } from "semantic-ui-react";
import moment from "moment";

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
  let gamePrice = gameData.price;

  if (gameData.discount)
    gamePrice -= ((gameData.price * gameData.discount) / 100).toFixed(2);

  return (
    <>
      <div className="game-header__title">
        {gameData.title}
        <Icon name="heart" link />
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
        <Button className="game-header__buy-btn">Buy</Button>
      </div>
    </>
  );
}
