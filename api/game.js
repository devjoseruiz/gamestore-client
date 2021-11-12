import getConfig from "next/config";
import axios from "axios";

const {
  publicRuntimeConfig: { server_address, server_port },
} = getConfig();

export async function getLastGamesApi(limit) {
  try {
    const res_limit = `_limit=${limit}`;
    const res_sort = "_sort=createdAt:desc";
    const url = `${server_address}:${server_port}/games?${res_limit}&${res_sort}`;
    const result = await axios.get(url);
    if (result?.status === 500) throw "Server error";
    return result.data;
  } catch (error) {
    return null;
  }
}
