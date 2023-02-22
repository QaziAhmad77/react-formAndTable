import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const User = ({ addData }) => {
  const param = useParams();
  const nagigate = useNavigate();
  const goToBack = () => {
    nagigate(-1);
  };
  const goToForm = () => {
    nagigate("/");
  };
  const goTotable = () => {
    nagigate("/table");
  };
  return (
    <>
      <h1 style={{ color: "black", fontSize: "75px" }}>{addData.name} Info</h1>
      <div className="user">
        <h1 style={{ fontSize: "60px", color: "white" }}>Hi! I'm {addData.name}</h1>
        <h1 style={{ fontSize: "60px", color: "white" }}>My email is {addData.email}</h1>
        <h1 style={{ fontSize: "60px", color: "white" }}>And password is : {addData.password}</h1>
        <h1 style={{ fontSize: "60px", color: "white" }}>My Id is : {param.id}</h1>
      </div>
      <div className="parent">
        <button className="userBtn" onClick={goToBack}>
          go back
        </button>
        <button className="userBtn" onClick={goToForm}>
          go to form
        </button>
        <button className="userBtn" onClick={goTotable}>
          go to table
        </button>
      </div>
    </>
  );
};

export default User;
