export const getDateTimeFun = (da) => {
  const datetiem = new Date(da);
  const date = datetiem.getDate();
  const month = +datetiem.getMonth() + 1;
  const year = +datetiem.getFullYear();
  const hour = datetiem.getHours();
  const minute = datetiem.getMinutes();
  console.log(datetiem.toDateString(), "<<<thisisdate");
  return {
    // date: `${date}-${month}-${year}`,
    date: datetiem.toDateString(),
    // time: `${hour}:${minute}`,
    time: ``,
  };
};
// const monthValue=["01,02,03"]
export const getBookingDate = (da) => {
  const datetiem = new Date(da);
  const date =
    datetiem.getDate() < 10 ? "0" + datetiem.getDate() : datetiem.getDate();
  const month =
    +datetiem.getMonth() + 1 < 10
      ? "0" + (+datetiem.getMonth() + 1)
      : +datetiem.getMonth() + 1;
  const year = +datetiem.getFullYear();
  const hour = datetiem.getHours();
  const minute = datetiem.getMinutes();
  return {
    // date: `${date}-${month}-${year}`,
    date: datetiem.toDateString() + " " + datetiem.toTimeString(),
    // time: `${hour}:${minute}`,
    time: ``,
  };
};

export const getMonths = [
  {
    label: "Jan",
    value: 0,
  },
  {
    label: "Feb",
    value: "01",
  },
  {
    label: "March",
    value: "02",
  },
  {
    label: "April",
    value: "03",
  },
  {
    label: "May",
    value: "04",
  },
  {
    label: "June",
    value: "05",
  },
  {
    label: "July",
    value: "06",
  },
  {
    label: "August",
    value: "07",
  },
  {
    label: "September",
    value: "08",
  },
  {
    label: "October",
    value: "09",
  },
  {
    label: "November",
    value: "10",
  },
  {
    label: "December",
    value: "11",
  },
];
export const getYears = () => {
  let init = 1900;
  let final = 2012;
  let years = [];
  for (let index = init; index <= final; index++) {
    years.push({ label: index, value: index });
  }
  return years;
};

export const getDates = () => {
  let init = 1;
  let final = 31;
  let dates = [];

  for (let index = init; index <= final; index++) {
    dates.push({ label: index, value: index });
  }
  return dates;
};
