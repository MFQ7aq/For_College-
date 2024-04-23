import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

  const token = localStorage.getItem('token');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:8092/api/get/role", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.log(error);
        setUserRole(false);
      }
    };

    if (token) {
      getUserRole();
    } else {
      setUserRole(null);
    }
  }, [token]);

  return (
    <>
      {userRole === 'admin' && (
        <div className="header__menu">
          <Link to="/private_office" className="head__item_1 Montherat">Личные данные</Link>
          <Link to="/Progress" className="head__item Montherat">Личные достижения</Link>
          <Link to="/Ural" className="head__item Montherat">Научно-исследовательская деятельность</Link>
          <Link to="/Education" className="head__item Montherat">Инновационно-образовательная деятельность</Link>
          <Link to="/Social" className="head__item Montherat">Воспитательная, общественная деятельность</Link>
          <Link to="/Offence" className="head__item Montherat">Дополнительные данные</Link>
        </div>
      )}
      {userRole === 'user' && (
        <div className="header__menu-s">
          <Link to="/private_office" className="head__item_1 Montherat">Личные данные</Link>
          <Link to="/Progress" className="head__item Montherat">Личные достижения</Link>
          <Link to="/Ural" className="head__item Montherat">Научно-исследовательская деятельность</Link>
          <Link to="/Education" className="head__item Montherat">Инновационно-образовательная деятельность</Link>
          <Link to="/Social" className="head__item Montherat">Воспитательная, общественная деятельность</Link>
        </div>
      )}
    </>
  );
}

export default NavBar;