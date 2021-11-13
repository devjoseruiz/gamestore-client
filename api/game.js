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

export async function getGamesByPlatformApi(platform, limit, start) {
  try {
    const res_platform = `_platform.url=${platform}`;
    const res_sort = `_sort=createdAt:desc`;
    const res_limit = `_limit=${limit}`;
    const res_start = `_start=${start}`;
    const url =
      `${server_address}:${server_port}/games?` +
      `${res_platform}&${res_limit}&${res_sort}&${res_start}`;

    const result = await axios.get(url);
    if (result?.status === 500) throw "Server error";
    return result.data;
  } catch (error) {
    return null;
  }
}

export async function getTotalGamesByPlatformApi(platform) {
  try {
    const res_platform = `_platform.url=${platform}`;
    const url = `${server_address}:${server_port}/games/count?${res_platform}`;
    const result = await axios.get(url);
    if (result?.status === 500) throw "Server error";
    return result.data;
  } catch (error) {
    return null;
  }
}
