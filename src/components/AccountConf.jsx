import { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AccountConf = () => {
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState({
    name: ''
  });
  
  useEffect(() => {
    const userInfo = async () => {
      try {
        const resp = await axios.get('http://localhost:8092/api/user/name', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const { name} = resp.data.user;
        setUserData({ name });
      } catch (error) {
        console.log(error);
      }
    };

    const checkAuthentication = async () => {
      try {
        const resp = await axios.get('http://localhost:8092/api/user/name', {
          headers: {
            Authorization: `Bearer ${token}`
          }
          
        });
        const { name } = resp.data.user;
        setUserData({ name });
      } catch (error) {
        console.log(error);
      }
    };

    userInfo();
    checkAuthentication();
  }, [token]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <>
      <div className="account__config">
        <div className="avatar__container"><div className="avatar"></div></div>
        <h4 className="user__name">{userData.name}</h4>
        <ul className="config__list">
          <li className="config__items-li"><Link to="" className="config__items">Моя учётная запись</Link></li>
          <li className="config__items-li"><Link to="/Authorization"  onClick={handleLogout} className="config__items">Выйти</Link></li>
        </ul>
      </div>
    </> 
  )}

export default AccountConf;
