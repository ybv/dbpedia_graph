import fetch from "isomorphic-fetch";

// const BACKEND = `${process.env.BACKEND}`;
const BACKEND = "http://localhost:64210";

const windowGlobal = typeof window !== "undefined" && window;

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  if (
    response.status === 200 ||
    response.status === 201 ||
    response.status === 302
  ) {
    return response.json();
  }

  return response;
}

export function checkAndReturnJson(response) {
  if (
    response.status === 200 ||
    response.status === 201 ||
    response.status === 302
  )
    try {
      return response.json();
    } catch {
      return response;
    }
  return response;
}

export function PostApiCall(endPoint, data = null) {
  let callParams = {
    headers: {
      Origin: "*",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  };

  if (data) {
    callParams = {
      ...callParams,
      method: "POST",
      body: data
    };
  }

  return fetch(`${BACKEND}${endPoint}`, callParams)
    .then(checkStatus)
    .then(parseJSON)
    .then(resp => resp)
    .catch(err => err);
}

export function fetchWithTimeOut(url, options, timeout = 20000) {
  return Promise.race([
    fetch(url, options),
    new Promise((resolve, reject) =>
      setTimeout(
        () =>
          resolve({
            status: 200,
            success: true
          }),
        timeout
      )
    )
  ]);
}

export function FilePostApiCall(endPoint, file = null) {
  let callParams = {
    headers: {
      Origin: "*"
    }
  };

  if (file) {
    const formData = new FormData();
    formData.append("NQuadFile", file);

    callParams = {
      ...callParams,
      method: "POST",
      body: formData
    };
  }

  return fetchWithTimeOut(`${BACKEND}${endPoint}`, callParams)
    .then(checkStatus)
    .then(checkAndReturnJson)
    .then(resp => resp)
    .catch(err => err);
}
