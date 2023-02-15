import { useState } from "react";
import "./App.css";
import data from "./raw-data.json";
import Form from "./components/Form";
import Table from "./components/Table";

function App() {
  const [list, setList] = useState(data);
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");
  const [addData, setAddData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ name: false, email: false, password: false });
  const deleteUser = (id) => {
    const newArr = list.filter((item) => item.id !== id);
    setList(newArr);
  };
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const handleOnchange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newErrors = { ...errors }; // make a copy of the errors object
    if (fieldName === "name" && fieldValue.length < 3) {
      newErrors.name = true;
    } else {
      newErrors.name = false;
    }
    if (fieldName === "email" && !fieldValue.match(emailRegex)) {
      newErrors.email = true;
    } else {
      newErrors.email = false;
    }
    if (fieldName === "password" && fieldValue.length < 5) {
      newErrors.password = true;
    } else {
      newErrors.password = false;
    }
    setErrors(newErrors); // update the errors state with the modified object
    const newArray = { ...addData };
    newArray[fieldName] = fieldValue;
    setAddData(newArray);
  };
  const updateUser = (event) => {
    event.preventDefault();
    const index = list.findIndex((listItem) => listItem.id === id);
    const newData = [...list];
    if (!errors.name && !errors.email && !errors.password) {
      newData[index] = { id: id, name: addData.name, email: addData.email, password: addData.password };
      setList(newData);
    }
  };
  const addUser = (event) => {
    event.preventDefault();
    const newErrors = { ...errors }; // make a copy of the errors object
    if (addData.name.length < 3) {
      newErrors.name = true;
    } else {
      newErrors.name = false;
    }
    if (!addData.email.match(emailRegex)) {
      newErrors.email = true;
    } else {
      newErrors.email = false;
    }
    if (addData.password.length < 5) {
      newErrors.password = true;
    } else {
      newErrors.password = false;
    }
    setErrors(newErrors);
    if (!errors.name && !errors.email && !errors.password) {
      const newObj = {
        id: Math.floor(Math.random() * 100),
        name: addData.name,
        email: addData.email,
        password: addData.password,
      };
      const newArray = [...list, newObj];
      setList(newArray);
    }
  };
  return (
    <>
      <body>
        <Form addData={addData} handleOnchange={handleOnchange} errors={errors} addUser={addUser} updateUser={updateUser} setErrors={setErrors} emailRegex={emailRegex} />
        <Table setSearch={setSearch} list={list} search={search} setAddData={setAddData} setId={setId} deleteUser={deleteUser} />
      </body>
    </>
  );
}

export default App;
