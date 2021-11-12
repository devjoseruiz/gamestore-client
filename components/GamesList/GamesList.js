import { map } from "lodash";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";
import {
  breakpointUpSm,
  breakpointUpMd,
  breakpointUpLg,
  breakpointUpXl,
} from "../../utils/breakpoint";

export default function GamesList(props) {
  const { games } = props;
  const { width } = useWindowSize();

  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpXl:
        return 6;

      case width > breakpointUpLg:
        return 5;

      case width > breakpointUpMd:
        return 3;

      case width > breakpointUpSm:
        return 2;

      default:
        return 1;
    }
  };

  return (
    <div className="games-list">
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(games, (game) => (
            <Game key={game.id} game={game} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

function Game(props) {
  const { game } = props;
  let gamePrice = game.price;

  if (game.discount)
    gamePrice -= ((game.price * game.discount) / 100).toFixed(2);

  return (
    <Grid.Column className="games-list__game">
      <Link href={`/${game.url}`}>
        <a>
          <div className="games-list__game-poster">
            <Image src={game.poster.url} alt={game.title}></Image>
            <div className="games-list__game-poster-info">
              {game.discount ? (
                <span className="discount">-{game.discount}%</span>
              ) : (
                <span></span>
              )}
              <span className="price">{gamePrice}$</span>
            </div>
          </div>
          <h2>{game.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
}
