import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getDateTimeFun } from "../../Utils/Flight/CommonFunctions";
import blogImage from "../../assets/Frontcard/logo.png";
import { ThemeColor } from "../../Utils/Flight/Colors";
import { useNavigate } from "react-router";

// (({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function SingleBlogCard({ item = {} }) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={item?.title}
        subheader={getDateTimeFun(item?.createdAt).date}
      />
      <div
        style={{
          backgroundColor: ThemeColor.primaryColor,
          height: "194px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          onClick={() => {
            navigate(`/blog-detail/${item._id}`);
          }}
          //   height="194px"
          style={{
            backgroundColor: ThemeColor.primaryColor,
            objectFit: "contain",
            // width: "40%",
          }}
          src={false ? item?.image : blogImage}
          //   width="40%"
        />
      </div>
      {/* <CardMedia
        component="img"
        height="194"
        backgroundColor="black"
        image={false ? item?.image : blogImage}
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item?.shortDescription}
        </Typography>
      </CardContent>
    </Card>
  );
}
