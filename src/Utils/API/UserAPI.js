import { BASE_URL } from "./Offler";

export const loginAPI = (payload, callBack) => {
  var formdata = new FormData();
  formdata.append("emailId", payload.emailId);
  formdata.append("password", payload.password);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(BASE_URL + "/user/login", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      callBack(JSON.parse(result));
    })
    .catch((error) => console.log("error", error));
};

export const SendConfirmEmail = (email, callBack) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: email,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(BASE_URL + "/user/mail", requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const PreviousORders = (email, callBack) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(BASE_URL + "/user/get?email=" + email, requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};

export const getORderById = (id, callBack) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(BASE_URL + "/order/get/" + id, requestOptions)
    .then((response) => response.text())
    .then((result) => callBack(JSON.parse(result)))
    .catch((error) => console.log("error", error));
};
