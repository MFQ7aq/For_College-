import { useCallback, useEffect, useState } from "react";
import NavBar from "../../components/NavBar"
import axios from "axios";
import { Link } from "react-router-dom";

function Lpps() {
  const [users, setUsers] = useState([]);

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
  }, [fetchData]);

  return (
    <div className="private-office-contents">
      <div className="header">
        <NavBar />
      </div>
      <div className="admin-panel__main">
        <label htmlFor="" className="search__label-admin">
          <input type="text" className="search__input" />
          <div className="search__btn"><div className="search__btn-in"></div></div>
        </label>
        <div className="users">
          {users.map((user, i) => (
            <div key={user.id} className="user" style={{ backgroundColor: i % 2 == 0 ? '#0047FF4D' : '#33FF001A' }}>
              <Link to={`http://localhost:5173/user/${user.id}`}>{user.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Lpps