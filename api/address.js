import getConfig from "next/config";
import { authFecth } from "./token";

const {
  publicRuntimeConfig: { server_address, server_port },
} = getConfig();

export async function createAddressApi(address, logout) {
  try {
    const url = `${server_address}:${server_port}/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFecth(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}
