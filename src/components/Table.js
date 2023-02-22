import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Table = ({ setSearch, list, search, setAddData, setId, deleteUser }) => {
  const navigate = useNavigate();
  const goToBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="parent">
        <button className="userBtn" onClick={goToBack}>
          go to form
        </button>
      </div>
      <h1 className="hClass">User Table</h1>
      <div className="container">
        <input className="searchBtn" onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search here" />
      </div>
      <table>
        <thead>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>password</th>
          <th>Edit / Delete</th>
        </thead>
        <tbody>
          {list
            .filter((item) => {
              return search.toLocaleLowerCase() === "" ? item : item.name.toLocaleLowerCase().includes(search) || item.email.toLocaleLowerCase().includes(search);
            })
            .map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <NavLink
                      to={`/user/${item.id}`}
                      onClick={() => {
                        setAddData({ id: item.id, name: item.name, email: item.email, password: item.password });
                      }}>
                      {item.name}
                    </NavLink>
                  </td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>
                    <button
                      onClick={() => {
                        setAddData({ id: item.id, name: item.name, email: item.email, password: item.password });
                        setId(item.id);
                        navigate("/");
                      }}>
                      edit
                    </button>
                    <button onClick={() => deleteUser(item.id)}>delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
