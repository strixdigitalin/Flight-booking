import { DUFFEL_AUTH_TOKEN, DUFFEL_VERSION } from ".";
export const BASE_URL = "http://localhost:5000";
// export const BASE_URL = "http://100.26.10.214:5000";
// export const BASE_URL = "https://flight-o1qw.onrender.com";
export const parse = (data) => JSON.parse(data);
export const GetOFfer = (payload, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Duffel-Version", DUFFEL_VERSION);
  myHeaders.append("Authorization", DUFFEL_AUTH_TOKEN);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    data: {
      cabin_class: "economy",
      slices: [
        {
          origin: "DEL",
          destination: "BLR",
          departure_time: {
            to: "24:00",
            from: "09:45",
          },
          departure_date: "2023-01-26",
          arrival_time: {
            to: "24:00",
            from: "09:45",
          },
        },
      ],
      private_fares: {
        QF: [
          {
            corporate_code: "FLX53",
            tracking_reference: "ABN:2345678",
          },
        ],
        UA: [
          {
            corporate_code: "1234",
          },
        ],
      },
      passengers: [
        {
          family_name: "Earhart",
          given_name: "Amelia",
          loyalty_programme_accounts: [
            {
              account_number: "12901014",
              airline_iata_code: "BA",
            },
          ],
          type: "adult",
        },
      ],
      max_connections: 0,
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://api.duffel.com/air/offer_requests", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const PostOffer = (payload, callBack) => {
  const { origin, destination, departure_date, cabin_class, passengers } =
    payload;
  console.log(passengers, "<<<< thisispassengers");
  // return null;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    PASSENGERS: passengers,
    ORIGIN: origin,
    DESTINATION: destination,
    DATE: departure_date,
    CABIN: cabin_class,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(BASE_URL + "/offer/search", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
export const PostOffer2 = (payload, callBack) => {
  const { cabinClass, passengers, slices } = payload;
  console.log(passengers, "<<<< thisispassengers");
  // return null;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    PASSENGERS: passengers,
    slices,

    CABIN: cabinClass,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(BASE_URL + "/offer/search", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const GetOffersById = (id, callBack) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Duffel-Version", DUFFEL_VERSION);
    myHeaders.append("Authorization", DUFFEL_AUTH_TOKEN);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(BASE_URL + "/offer/fetch?OFFER_REQUEST_ID=" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => callBack(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }
};

export const getOnlyOfferbyOfferId = (offerId, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Duffel-Version", DUFFEL_VERSION);
  myHeaders.append("Authorization", DUFFEL_AUTH_TOKEN);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(BASE_URL + "/offer/fetch-by-id?OFFER_ID=" + offerId, requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const cancelOrder = (id, callBack) => {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  fetch(BASE_URL + "/order/cancel/" + id, requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const createOrder = (payload, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Duffel-Version", DUFFEL_VERSION);
  myHeaders.append("Authorization", DUFFEL_AUTH_TOKEN);
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    OFFER_ID: payload.OFFER_ID,
    TOTAL_AMOUNT: payload.TOTAL_AMOUNT,
    TOTAL_CURRENCY: payload.TOTAL_CURRENCY,
    ADULT_PASSENGER_ID_1: payload.ADULT_PASSENGER_ID_1,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(BASE_URL + "/booking/create", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const getBlogs = (callBack) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Duffel-Version", DUFFEL_VERSION);
    myHeaders.append("Authorization", DUFFEL_AUTH_TOKEN);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(BASE_URL + "/blog/get", requestOptions)
      .then((response) => response.text())
      .then((result) => callBack(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }
};
export const getBlogsSingle = (id, callBack) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Duffel-Version", DUFFEL_VERSION);
    myHeaders.append("Authorization", DUFFEL_AUTH_TOKEN);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(BASE_URL + "/blog/get?_id=" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => callBack(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }
};
