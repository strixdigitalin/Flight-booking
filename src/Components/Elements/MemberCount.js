import React, { useRef, useState } from "react";

function MemberCount({ membersCount, handleMemberCount }) {
  const [showHide, setShowHide] = useState(false);
  const dropRef = useRef(0);
  const handleClose = () => {
    // dropRef.current.style.display = "block";
    setShowHide(true);
  };
  window.addEventListener("click", function (event) {
    let { className } = event.target;
    let matchit = className.match("showdrop");
    // console.log(matchit, "<<<meme");
    if (matchit) {
      setShowHide(true);
    } else {
      setShowHide(false);
    }
  });
  return (
    <div className="booking-members">
      <div onClick={handleClose} style={{ cursor: "pointer" }}>
        <div
          style={{ fontSize: "12px", fontWeight: "bold" }}
          className="showdrop"
        >
          Passengers{" "}
        </div>
        <div className="members-text showdrop">
          {" "}
          {membersCount?.adult}Adult, {membersCount?.child} child
        </div>
      </div>
      {showHide && (
        <div className="members-select showdrop" ref={dropRef} style={{}}>
          <div className="single-memberselect showdrop">
            <div style={{ width: "40%" }}>Adult</div>
            <div
              className="box showdrop"
              onClick={() => handleMemberCount("adult", "-")}
            >
              -
            </div>
            <div className="showdrop">{membersCount?.adult}</div>
            <div
              className="box showdrop"
              onClick={() => handleMemberCount("adult", "+")}
            >
              +
            </div>
          </div>
          <div className="single-memberselect showdrop">
            <div style={{ width: "40%" }} className="showdrop">
              Children
            </div>
            <div
              className="box showdrop"
              onClick={() => handleMemberCount("child", "-")}
            >
              -
            </div>
            <div className="showdrop">{membersCount?.child}</div>
            <div
              className="box showdrop"
              onClick={() => handleMemberCount("child", "+")}
            >
              +
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export const MemberCountMulti = ({ membersCount, handleMemberCount }) => {
  const [showHide, setShowHide] = useState(false);
  const handleClose = () => setShowHide(!showHide);
  return (
    <div className="booking-members">
      {/* <div onClick={handleClose} style={{ cursor: "pointer" }}>
        <div style={{ fontSize: "12px", fontWeight: "bold" }}>Passengers ></div>
        <div className="members-text">
          {" "}
          {membersCount?.adult}Adult, {membersCount?.child} child
        </div>
      </div>
      {showHide && (
        <div className="members-select">
          <div className="single-memberselect">
            <div style={{ width: "40%" }}>Adult</div>
            <div
              className="box"
              onClick={() => handleMemberCount("adult", "-")}
            >
              -
            </div>
            <div>{membersCount?.adult}</div>
            <div
              className="box"
              onClick={() => handleMemberCount("adult", "+")}
            >
              +
            </div>
          </div>
          <div className="single-memberselect">
            <div style={{ width: "40%" }}>Children</div>
            <div
              className="box"
              onClick={() => handleMemberCount("child", "-")}
            >
              -
            </div>
            <div>{membersCount?.child}</div>
            <div
              className="box"
              onClick={() => handleMemberCount("child", "+")}
            >
              +
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default MemberCount;
