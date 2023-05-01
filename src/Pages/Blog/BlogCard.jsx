import React from "react";
import { NavLink } from "react-router-dom";
// import img from "../assets/web.jpg";

const BlogCard = ({ image, title, description, buttonLabel, Icon, id }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden w-[100%]">
      <div className="md:flex md:flex-col">
        <div
          className="h-[200px] w-[100%]"
          style={{
            // background: `url(${img})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="uppercase tracking-wide text-md text-indigo-500 bg-[rgba(255,255,255,0.4)] backdrop-blur-sm font-semibold p-4"
            style={{}}
          >
            {title}
          </div>
        </div>
        <div className="p-4 relative">
          <p className="mt-2 text-gray-500">
            {description.length > 50
              ? description.slice(0, 50) + "..."
              : description}
          </p>
          <NavLink
            to={`/blog/${id}`}
            className="mt-2 hover:underline text-indigo-500 bg-white text-right block font-bold py-1 px-4 rounded-[3rem] border-4 absolute top-[-1.8rem] right-[0.5rem] flex items-center"
          >
            {Icon} {buttonLabel}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
