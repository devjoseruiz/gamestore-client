import getConfig from "next/config";
import { authFetch } from "./token";

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
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function getAddressesApi(idUser, logout) {
  try {
    const url = `${server_address}:${server_port}/addresses?user=${idUser}`;
    const result = await authFetch(url, null, logout);
    if (result?.statusCode === 500) throw "Server error";
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function deleteAddressApi(idAddress, logout) {
  try {
    const url = `${server_address}:${server_port}/addresses/${idAddress}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await authFetch(url, params, logout);
    if (result?.statusCode === 500) throw "Server error";
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function updateAddressApi(idAddress, address, logout) {
  try {
    const url = `${server_address}:${server_port}/addresses/${idAddress}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}
