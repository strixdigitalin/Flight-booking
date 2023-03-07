import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function ShowLoader({ mt = 3 }) {
  return (
    <Box
      style={{
        display: "flex",
        width: "100%",

        justifyContent: "center",
        marginTop: `${mt}rem`,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
