export const DUFFEL_AUTH_TOKEN =
  "Bearer duffel_test_BwJrtGR8AhhQEmPHH5As4DmCl3pLtIpTD4gcqYk2uVl";
export const DUFFEL_VERSION = "v1";
export const LOCAL_STORE = {
  saveFlightData: async (data) => {
    await localStorage.setItem("FLIGHT_DETAIL", JSON.stringify(data));
  },
  getFlightData: async () =>
    JSON.parse(await localStorage.getItem("FLIGHT_DETAIL")),
};
