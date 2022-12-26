import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import cardBack from "../../assets/card/bgimage.jpg";

export default function HomeCard() {
  return (
    <Card
      sx={{ maxWidth: 445, marginTop: "20px", width: "350px" }}
      className="single-card"
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={cardBack}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Vistra Flight Sale <span style={{ color: "red" }}> Live</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Book your tickets NOW!!
        </Typography>
      </CardContent>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardActions>
          <Button size="small" variant="contained">
            Book Now
          </Button>
          {/* <Button size="small">Learn More</Button> */}
        </CardActions>
      </div>
    </Card>
  );
}
