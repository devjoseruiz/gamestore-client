import getConfig from "next/config";
import { authFetch } from "./token";
import { size } from "lodash";

const {
  publicRuntimeConfig: { server_address, server_port },
} = getConfig();

export async function getIsFavouriteGameApi(idUser, idGame, logout) {
  try {
    const res_user = `user=${idUser}`;
    const res_game = `game=${idGame}`;
    const url = `${server_address}:${server_port}/favourites?${res_user}&${res_game}`;
    const result = await authFetch(url, null, logout);
    if (result?.statusCode === 500) throw "Server error";
    return result ? result[0] : null;
  } catch (error) {
    return null;
  }
}

export async function createFavouriteApi(idUser, idGame, logout) {
  try {
    const isFavourite = await getIsFavouriteGameApi(idUser, idGame, logout);

    if (!size(isFavourite)) {
      const url = `${server_address}:${server_port}/favourites`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: idUser,
          game: idGame,
        }),
      };
      const result = await authFetch(url, params, logout);
      return result ? result : null;
    } else return null;
  } catch (error) {
    return null;
  }
}

export async function deleteFavouriteApi(idUser, idGame, logout) {
  try {
    const isFavourite = await getIsFavouriteGameApi(idUser, idGame, logout);
    if (size(isFavourite)) {
      const url = `${server_address}:${server_port}/favourites/${isFavourite.id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await authFetch(url, params, logout);
      if (result?.statusCode === 500) throw "Server error";
      return result ? result : null;
    } else return null;
  } catch (error) {
    return null;
  }
}

export async function getFavouritesByUserApi(idUser, logout, limit, start) {
  try {
    const res_user = `_user=${idUser}`;
    const res_limit = `_limit=${limit}`;
    const res_start = `_start=${start}`;
    const url =
      `${server_address}:${server_port}/favourites?` +
      `${res_user}&${res_limit}&${res_start}`;
    const result = await authFetch(url, null, logout);
    if (result?.statusCode === 500) throw "Server error";
    return result ? result : null;
  } catch (error) {
    return null;
  }
}
