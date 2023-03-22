import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPayment } from "../../Utils/API/PaymentAPI";
import { getDateTimeFun } from "../../Utils/Flight/CommonFunctions";

function PaymentSuccess() {
  const [getorderConfirmData, setgetorderConfirmData] = useState({});
  const { orderId } = useParams();
  useEffect(() => {
    getPayment(orderId, (res) => {
      console.log(res, "<<< this is order id");
      if (res.success) {
        setgetorderConfirmData(res.data[0]);
      }
    });
  }, []);

  return (
    <div>
      <div className="paymentsuccess">
        <Grid
          container
          spacing={1}
          // columnSpacing={3  }
          mt={1}
          style={{ alignItems: "center" }}
        >
          <Grid item md={12} textAlign="center">
            <Typography fontSize={35} color="success">
              {" "}
              Payment Successfull
            </Typography>
          </Grid>
          <Grid
            mt={1}
            container
            spacing={2}
            columnSpacing={3}
            style={{ alignItems: "center" }}
          >
            <Grid item md={5} textAlign="right">
              <Typography fontWeight={"bold"}>Order Id :</Typography>
            </Grid>
            <Grid item md={7}>
              {getorderConfirmData?._id}
            </Grid>
          </Grid>
          {/* <Grid
            mt={1}
            container
            spacing={2}
            columnSpacing={3}
            style={{ alignItems: "center" }}
          >
            <Grid item md={5} textAlign="right">
              <Typography fontWeight={"bold"}>Stripe Order Id :</Typography>
            </Grid>
            <Grid item md={7} textOverflow="">
              {getorderConfirmData?.detail?.id}
            </Grid>
          </Grid> */}
          <Grid
            mt={1}
            container
            spacing={2}
            columnSpacing={3}
            style={{ alignItems: "center" }}
          >
            <Grid item md={5} textAlign="right">
              <Typography fontWeight={"bold"}>Amount :</Typography>
            </Grid>
            <Grid item md={7}>
              {getorderConfirmData?.detail?.currency}{" "}
              {getorderConfirmData?.detail?.amount_total}
            </Grid>
            <Grid item md={4}></Grid>
          </Grid>
          <Grid
            mt={1}
            container
            spacing={2}
            columnSpacing={3}
            style={{ alignItems: "center" }}
          >
            <Grid item md={5} textAlign="right">
              <Typography fontWeight={"bold"}>Mode :</Typography>
            </Grid>
            <Grid item md={7}>
              {getorderConfirmData?.detail?.mode}
            </Grid>
          </Grid>
          <Grid
            mt={1}
            container
            spacing={2}
            columnSpacing={3}
            style={{ alignItems: "center" }}
          >
            <Grid item md={5} textAlign="right">
              <Typography fontWeight={"bold"}>Payment Method :</Typography>
            </Grid>
            <Grid item md={7}>
              {getorderConfirmData?.detail?.payment_method_types[0]}
            </Grid>
          </Grid>
          <Grid
            mt={1}
            container
            spacing={2}
            columnSpacing={3}
            style={{ alignItems: "center" }}
          >
            <Grid item md={5} textAlign="right">
              <Typography fontWeight={"bold"}>Created At :</Typography>
            </Grid>
            <Grid item md={7}>
              {getorderConfirmData?.createdAt}
              {/* {getDateTimeFun(getorderConfirmData?.createdAt)} */}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export const PaymentFailed = () => {
  return (
    <div>
      <div className="paymentsuccess" style={{ backgroundColor: "red" }}>
        <Grid
          container
          spacing={1}
          // columnSpacing={3  }
          mt={1}
          style={{ alignItems: "center" }}
        >
          <Grid item md={12} textAlign="center">
            <Typography fontSize={35} color="success">
              {" "}
              Payment Failed
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PaymentSuccess;
