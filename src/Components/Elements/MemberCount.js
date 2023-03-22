import React, { useState } from "react";

function MemberCount({ membersCount, handleMemberCount }) {
  const [showHide, setShowHide] = useState(false);
  const handleClose = () => setShowHide(!showHide);
  return (
    <div className="booking-members">
      <div onClick={handleClose} style={{ cursor: "pointer" }}>
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
      )}
    </div>
  );
}

export default MemberCount;
