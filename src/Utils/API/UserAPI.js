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
