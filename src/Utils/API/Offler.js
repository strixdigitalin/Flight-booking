import { DUFFEL_AUTH_TOKEN, DUFFEL_VERSION } from ".";
export const BASE_URL = "http://localhost:5000";
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
  const { origin, destination, departure_date, cabin_class } = payload;
  var formdata = new FormData();
  formdata.append("ORIGIN", origin);
  formdata.append("DESTINATION", destination);
  formdata.append("DATE", departure_date);
  formdata.append("CABIN", cabin_class);

  var requestOptions = {
    method: "POST",
    body: formdata,
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