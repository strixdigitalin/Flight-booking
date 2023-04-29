import React from "react";
import { CardPayment } from "@duffel/components";
import { Card } from "@mui/material";

// const token =
//   "eyJjbGllbnRfc2VjcmV0IjoicGlfM01zampMR0Nia0tWUmNzWjFFMU5ueURwX3NlY3JldF9DbVh5MUdZVFlVRHMyMTB2bHVxOHpFeFpRIiwicHVibGlzaGFibGVfa2V5IjoicGtfbGl2ZV81MUo3b1p0R0Nia0tWUmNzWmlTd2tHOTQzMHJvZG1QdDFsRjcyVWx6ajROUUtqQlJKaFNrZzNrMWFwTnhpejF1MWRSSGpOd3U1aGZiYkdRampJRG1QZ212TTAwUERrNHk4b2sifQ==";

function DuffelPayment({
  token,
  successfulPaymentHandlerFn,
  errorPaymentHandlerFn,
}) {
  return (
    <Card style={{ marginTop: "2rem" }}>
      <div
        style={{
          display: "flex",
          Width: "100%",
          justifyContent: "center",
        }}
      >
        <CardPayment
          duffelPaymentIntentClientToken={token}
          successfulPaymentHandler={successfulPaymentHandlerFn}
          errorPaymentHandler={errorPaymentHandlerFn}
        />
      </div>
    </Card>
  );
}

export default DuffelPayment;
