import { DUFFEL_AUTH_TOKEN, DUFFEL_VERSION } from ".";

export const PostOffer = (payload, callBack) => {
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
