import getConfig from "next/config";

const {
  publicRuntimeConfig: { host, port },
} = getConfig();

export async function registerApi(formData) {
  try {
    const url = `${host}:${port}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
  } catch (error) {
    return null;
  }
}