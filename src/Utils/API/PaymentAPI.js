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

export const createPaymentIntent = (payload, callBack) => {
  const { currency, amount } = payload;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    currency: currency,
    amount: amount,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(BASE_URL + "/payment/intent", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const createOrderAPI = (payload, callBack) => {
  var myHeaders = new Headers();
  const { userData, orderData } = payload;
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    OFFER_ID: orderData?.id,
    type: "balance",
    TOTAL_CURRENCY: orderData?.total_currency,
    TOTAL_AMOUNT: orderData?.total_amount,
    ADULT_PASSENGER_ID_1: orderData?.passengers[0].id,
    userData: payload.userData,
    email: payload.email,
    // phone_number: userData?.phone_number,
    // email: userData?.email,
    // born_on: userData?.born_on,
    // gender: userData?.gender,
    // lastName: userData?.lastName,
    // firstName: userData?.firstName,
    // middleName: userData?.middleName,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(BASE_URL + "/order/create", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => callBack(JSON.parse(error)));
};

export const confirmPayment = (id, callBack) => {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  fetch(BASE_URL + "/payment/confirm/" + id, requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
