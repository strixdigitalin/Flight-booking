import { BASE_URL } from "./Offler";

export const StripePayment = (user, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    user: user,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(BASE_URL + "/payment/create-checkout-session", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const getPayment = (id, callBack) => {
  try {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(BASE_URL + "/payment/get?_id=" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => callBack(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  } catch (error) {}
};
