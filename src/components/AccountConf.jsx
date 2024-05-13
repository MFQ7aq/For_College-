import { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AccountConf = () => {
  const token = localStorage.getItem('token');
  const [id, setId] = useState('');
  const [userData, setUserData] = useState({
    name: '',
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8092/api/user/name', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const name = response.data.user.name;
        setUserData(name);
      } catch (error) {
        console.log(error);
      }
    };

    const getUserId = async () => {
      try {
        const response = axios.get('http://localhost:8092/api/user/id', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const id = response.data[0];
        setId(id);
        console.log((await response).data[0]);
      } catch (error) {
        console.log(error);
        console.log(id);
      }
    };

    getUserData();
    getUserId();
  }, [id, token, userData.data]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <div className="account__config">
      <div className="avatar__container"><div className="avatar"></div></div>
      <h4 className="user__name">{userData.name}</h4>
      <ul className="config__list">
        <li className="config__items-li">
          <Link to={`/my_account/${id}`} className="config__items">Моя учётная запись</Link>
        </li>
        <li className="config__items-li">
          <Link to="/Authorization" onClick={handleLogout} className="config__items">Выйти</Link>
        </li>
      </ul>
    </div>
  );
}

export default AccountConf;