import getConfig from "next/config";
import axios from "axios";

const {
  publicRuntimeConfig: { server_address, server_port },
} = getConfig();

export async function getPlatformsApi() {
  try {
    const url = `${server_address}:${server_port}/platforms`;
    const result = await axios.get(url);
    if (result?.status === 500) throw "Server error";
    return result.data;
  } catch (error) {
    return null;
  }
}
