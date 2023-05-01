import React, { useContext, useState } from "react";
import { useEffect } from "react";
// import MainContext from "../../context/MainContext";
// import BlogCard from "../Card/BlogCard";
import { BsEyeFill } from "react-icons/bs";
import BlogCard from "./BlogCard";
import { getBlogs } from "../../Utils/API/Offler";
import { Grid } from "@mui/material";
import SingleBlogCard from "./SingleBlogCard";

const Blog = () => {
  //   const context = useContext(MainContext);
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // const data = await context.getBlogs();
    await getBlogs((res) => {
      setData(res?.data);
      console.log(res?.data);
    });
  };

  return (
    <div>
      <div className="blog-heading">Latest Updates</div>

      <div className="blog-card-cover">
        <Grid container>
          {data?.map((item, key) => {
            return (
              <Grid item md={4} key={key}>
                <SingleBlogCard item={item} />
              </Grid>
            );
          })}

          <Grid item md={4}></Grid>
          <Grid item md={4}></Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Blog;
