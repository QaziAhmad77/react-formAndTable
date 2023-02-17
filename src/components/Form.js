import React from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ addData, handleOnchange, errors, addUser, updateUser }) => {
  const navigate = useNavigate();
  const goToBack = () => {
    navigate("/table");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser();
    navigate("/table");
  };
  const handleSub = (event) => {
    event.preventDefault();
    addUser();
    navigate("/table");
  };
  return (
    <>
      <div className="parent">
        <button className="userBtn" onClick={goToBack}>
          go to table
        </button>
      </div>
      <h1>User Form</h1>
      <form action="" className="allInputs">
        <input type="text" value={addData.name} name="name" required placeholder="Enter your name" onChange={handleOnchange} />
        {errors.name ? <span>Name should be at least 3 characters</span> : ""}
        <input type="email" value={addData.email} name="email" required placeholder="Enter your email" onChange={handleOnchange} />
        {errors.email ? <span>Invalid email</span> : ""}
        <input type="password" value={addData.password} name="password" required placeholder="Enter your password" onChange={handleOnchange} />
        {errors.password ? <span>Password should be at least 5 characters</span> : ""}
        <div className="btn-2">
          <button type="submit" onClick={handleSub}>
            Add
          </button>
          <button type="submit" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
