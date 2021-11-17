import jwtDecode from "jwt-decode";

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function hasTokenExpired(token) {
  const tokenDecoded = jwtDecode(token);
  const expirationDate = tokenDecoded.exp * 1000;
  const currentDate = new Date().getTime();

  if (currentDate > expirationDate) {
    return true;
  }

  return false;
}

export const authFetch = async (url, params, logout) => {
  const token = getToken();

  if (!token) {
    logout();
  } else {
    if (hasTokenExpired(token)) {
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result;
      } catch (error) {
        return null;
      }
    }
  }
};
