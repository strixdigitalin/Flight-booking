import React, { useEffect, useState } from "react";
import { getBlogsSingle } from "../../Utils/API/Offler";
import { useParams } from "react-router";
import { AdBanner } from "../../Utils/Flight/Image";
function BlogDetail() {
  const { id } = useParams();
  const [data, setdata] = useState({});
  useEffect(() => {
    getBlogsSingle(id, (res) => {
      setdata(res.data[0]);
    });
  }, []);

  return (
    <div className="blog-detail-cover">
      <div className="blog-heading">{data?.title}</div>
      {data?.image && (
        <div className="blog-image">
          <img src={data?.image} width="50%" />
        </div>
      )}

      <img src={AdBanner.customerSupport2} width="100%" />

      <div dangerouslySetInnerHTML={{ __html: data?.detail }} />
    </div>
  );
}

export default BlogDetail;
