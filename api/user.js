import getConfig from "next/config";
import { authFecth } from "./token";

const {
  publicRuntimeConfig: { server_address, server_port },
} = getConfig();

export async function registerApi(formData) {
  try {
    const url = `${server_address}:${server_port}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function loginApi(formData) {
  try {
    const url = `${server_address}:${server_port}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function resetPasswordApi(email) {
  try {
    const url = `${server_address}:${server_port}/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function getMeApi(logout) {
  try {
    const url = `${server_address}:${server_port}/users/me`;
    const result = await authFecth(url, null, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function updateNameApi(userId, data, logout) {
  try {
    const url = `${server_address}:${server_port}/users/${userId}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await authFecth(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}

export async function updateEmailApi(userId, email, logout) {
  try {
    const url = `${server_address}:${server_port}/users/${userId}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    const result = await authFecth(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return null;
  }
}
