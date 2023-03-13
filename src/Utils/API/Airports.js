import { DUFFEL_AUTH_TOKEN, DUFFEL_VERSION } from ".";
import { BASE_URL } from "./Offler";

export const getAirPorts = (query, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Duffel-Version", DUFFEL_VERSION);
  myHeaders.append("Authorization", DUFFEL_AUTH_TOKEN);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(BASE_URL + "/offer/airports?place=" + query, requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
