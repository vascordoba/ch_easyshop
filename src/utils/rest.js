const REST_SERVER = "http://localhost:3000";

const get = async (url) => {
  const opts = {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(REST_SERVER + url, opts);
  const data = await response.json();
  return data;
};

const post = async (url, jsonBody) => {
  const opts = {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  };
  const response = await fetch(REST_SERVER + url, opts);
  const data = await response.json();
  return data;
};

export { get, post };
