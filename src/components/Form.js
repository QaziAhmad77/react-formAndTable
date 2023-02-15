import React from "react";

const Form = ({ addData, handleOnchange, errors, addUser, updateUser }) => {
  return (
    <>
      <h1>User Form</h1>
      <form action="" className="allInputs">
        <input type="text" value={addData.name} name="name" required placeholder="Enter your name" onChange={handleOnchange} />
        {errors.name ? <span>Name should be at least 3 characters</span> : ""}
        <input type="email" value={addData.email} name="email" required placeholder="Enter your email" onChange={handleOnchange} />
        {errors.email ? <span>Invalid email</span> : ""}
        <input type="password" value={addData.password} name="password" required placeholder="Enter your password" onChange={handleOnchange} />
        {errors.password ? <span>Password should be at least 5 characters</span> : ""}
        <div className="btn-2">
          <button onClick={addUser}>Add</button>
          <button onClick={updateUser}>Update</button>
        </div>
      </form>
    </>
  );
};

export default Form;
