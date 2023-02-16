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





// import { useState } from "react";
// import "./App.css";
// import data from "./mock-data.json";
// import Form from "./components/Form";
// import Filter from "./components/Filter";

// function App() {
//   const [list, setList] = useState(data);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [id, setId] = useState("");
//   const [nameError, setNameError] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [search, setSearch] = useState("");
//   const deleteUser = (id) => {
//     const filteredUsers = list.filter((item) => item.id !== id);
//     setList(filteredUsers);
//   };

//   let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//   const addUser = () => {
//     const newArr = [...list];
//     // newArr.push({ id: Math.floor(Math.random() * 100), name: name, email: email, password: password });
//     // setList(newArr);
//     if (!nameError && !emailError && !passwordError) {
//       newArr.push({ id: Math.floor(Math.random() * 100), name: name, email: email, password: password });
//       setList(newArr);
//     }
//   };
//   const updateUser = () => {
//     if (!nameError && !emailError && !passwordError) {
//       const newArr = [...list];
//       const index = newArr.findIndex((item) => item.id === id);
//       newArr[index] = { id, name, email, password };
//       setList(newArr);
//     }
//   };
//   return (
//     <>
//       <body>
//       <div className="allInputs">
//         <h1>User Form</h1>
//         <input
//           type="text"
//           value={name}
//           required
//           placeholder="Enter your name"
//           onChange={(e) => {
//             if (name.length < 4) {
//               setNameError(true);
//             } else {
//               setNameError(false);
//             }
//             setName(e.target.value);
//           }}
//         />
//         {nameError ? <span>Name length should be greater than 4</span> : ""}
//         <input
//           type="email"
//           value={email}
//           required
//           placeholder="Enter your email"
//           onChange={(e) => {
//             if (!email.match(emailRegex)) {
//               setEmailError(true);
//             } else {
//               setEmailError(false);
//             }
//             setEmail(e.target.value);
//             console.log(e.target.value);
//           }}
//         />
//         {emailError ? <span>Invalid email</span> : ""}
//         <input
//           type="password"
//           value={password}
//           required
//           placeholder="Enter your password"
//           onChange={(e) => {
//             if (password.length < 5) {
//               setPasswordError(true);
//             } else {
//               setPasswordError(false);
//             }
//             setPassword(e.target.value);
//           }}
//         />
//         {passwordError ? <span>Password length should be greater than 5</span> : ""}
//         <div className="btn-2">
//           <button onClick={addUser}>Add</button>
//           <button onClick={updateUser}>Update</button>
//         </div>
//       </div>
//         <div className="container">
//         <input
//           className="searchBtn"
//           type="text"
//           placeholder="Search here"
//           onChange={(e) => {
//             setSearch(e.target.value);
//           }}
//         />
//       </div>
//         <h1 className="hClass">User Table</h1>
//         <table>
//           <thead>
//             <th>id</th>
//             <th>name</th>
//             <th>email</th>
//             <th>password</th>
//             <th>Edit / Delete</th>
//           </thead>
//           <tbody>
//             {list
//               .filter((contact) => {
//                 return search.toLocaleLowerCase() === "" ? contact : contact.fullName.toLocaleLowerCase().includes(search);
//               })
//               .map((item) => {
//                 return (
//                   <tr key={item.id}>
//                     <td>{item.id}</td>
//                     <td>{item.name}</td>
//                     <td>{item.email}</td>
//                     <td>{item.password}</td>
//                     <td>
//                       <button
//                         onClick={() => {
//                           setName(item.name);
//                           setEmail(item.email);
//                           setPassword(item.password);
//                           setId(item.id);
//                         }}>
//                         edit
//                       </button>
//                       <button onClick={() => deleteUser(item.id)}>delete</button>
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//       </body>
//     </>
//   );
// }

// export default App;

