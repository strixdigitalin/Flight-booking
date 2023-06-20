export const BASE_URL = "https://pokeapi.co/api/v2";
let getHeader = async () => {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  return headers;
};

export const API = {
  get: (url, callBack, payload) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    let newUrl = url;
    for (const key in payload) {
      newUrl = url + "?";
      if (Object.hasOwnProperty.call(payload, key)) {
        const element = key;
        newUrl = newUrl + key + "=" + payload[key];
      }
    }
    fetch(BASE_URL + newUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => callBack(JSON.parse(result)))
      .catch((error) => {});
  },

  queryGet: (url, callBack, payload) => {
    const queryString = Object.entries(payload)
      .filter(([_, value]) => value !== null) // [ [ 'pageNum', 3 ], [ 'perPageNum', 10 ], [ 'category', 'food' ] ]
      .map(([key, value], index) => `${key}=${value}`) // [ 'pageNum=3', 'perPageNum=10', 'category=food' ]
      .join("&"); // 'pageNum=3&perPageNum=10&category=food'
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    let newUrl = url + "?" + queryString;
    fetch(BASE_URL + newUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => callBack(JSON.parse(result)))
      .catch((error) => {});
  },

  formPost: (url, payload, callBack) => {
    var requestOptions = {
      method: "POST",
      body: payload,
      redirect: "follow",
    };

    fetch(BASE_URL + url, requestOptions)
      .then((response) => response.text())
      .then((result) => callBack(JSON.parse(result)))
      .catch((error) => {});
  },

  post: async (url, payload, callBack) => {
    let headers = await getHeader();
    var raw = JSON.stringify(payload);

    var requestOptions = {
      method: "POST",
      headers,
      body: raw,
      redirect: "follow",
    };

    fetch(BASE_URL + url, requestOptions)
      .then((response) => response.text())
      .then((result) => callBack(JSON.parse(result)))
      .catch((error) => {});
  },
  update: (url, payload, callBack) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(payload);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(BASE_URL + url, requestOptions)
      .then((response) => response.text())
      .then((result) => callBack(JSON.parse(result)))
      .catch((error) => {});
  },

  delete: (url, callBack) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(BASE_URL + url, requestOptions)
      .then((response) => response.text())
      .then((result) => callBack(JSON.parse(result)))
      .catch((error) => {});
  },
};

