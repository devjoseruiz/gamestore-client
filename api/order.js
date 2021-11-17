import getConfig from "next/config";
import { authFetch } from "./token";

const {
  publicRuntimeConfig: { server_address, server_port },
} = getConfig();

export async function getOrdersApi(idUser, logout) {
  try {
    const url = `${server_address}:${server_port}/orders?user=${idUser}&_sort=createdAt:desc`;
    const result = await authFetch(url, null, logout);
    if (result?.statusCode === 500) throw "Server error";
    return result ? result : null;
  } catch (error) {
    return null;
  }
}
