import { useCallback, useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import axios from "axios";
import { Link } from "react-router-dom";

function Lppsa() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState('')
  const token = localStorage.getItem('token');

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8092/api/rating/users");
      const data = response.data.users;
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, isAdmin, token]);

  const getUserRole = async () => {
    try {
      const response = await axios.get("http://localhost:8092/api/get/role", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsAdmin(response.data.role);
      console.log(isAdmin);
    } catch (error) {
      console.log(error);
    }
  };

  if (token) {
    getUserRole();
  }

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="private-office-contents">
      <div className="header">
        <NavBar />
      </div>
      <div className="admin-panel__main">
        <label htmlFor="" className="search__label-admin">
          <button onClick={getUserRole()}>Получить роль</button>
          <input
            type="text"
            className="search__input Montherat"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <div className="search__btn">
            <div className="search__btn-in"></div>
          </div>
        </label>
        <div className="users">
          {filteredUsers.map((user, i) => (
            <div
              key={user.id}
              className="user"
              style={{
                backgroundColor: i % 2 === 0 ? "#0047FF4D" : "#33FF001A",
              }}
            >
              <Link to={`http://localhost:5173/user/admin/${user.id}`}>{user.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lppsa;