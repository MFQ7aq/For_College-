import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:8092/api/get/role", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIsAdmin(response.data.role);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      getUserRole();
    }
  }, [token]);

  return (
    <nav className='nav'>
      <div className="nav__in">
        <Link to="/home" className='nav__title'><h2>Рейтинг ППС!</h2></Link>
        <ul className='nav__list'>
          <li><Link to="/home">Главная</Link></li>
          <li><Link to="/MUIT">МУИТ</Link></li>
          <li><Link to="/COMTEHNO">Комтехно</Link></li>
          <li><Link to="/KITE">КИТЭ</Link></li>
          <li>
            <div className="hamburger-menu">
              <input id="menu__toggle" type="checkbox" />
              {isAdmin === '' && (
                <>
                  <input id="menu__toggle" type="checkbox" />
                  <ul className="menu__box">
                    <li><Link to="/LPPS" className="menu__item">Список ППС</Link></li>
                    <li><Link to="/Authorization" className="menu__item">Авторизация</Link></li>
                    <li><Link to="/Questionnaire" className="menu__item">Анкета институтов</Link></li>
                  </ul>
                </>
              )}
              {isAdmin === 'admin' && (
                <>
                  <input id="menu__toggle" type="checkbox" />
                  <ul className="menu__box">
                    <li><Link to="/LPPS" className="menu__item">Список ППС</Link></li>
                    <li><Link to="/Authorization" className="menu__item">Авторизация</Link></li>
                    <li><Link to="/Questionnaire" className="menu__item">Анкета институтов</Link></li>
                    <li><Link to="/private_office" className="menu__item">Личный кабинет</Link></li>
                    <li><Link to="/admin" className="menu__item">Админ Панель</Link></li>
                  </ul>
                </>
              )}
              {isAdmin === 'user' && (
                <>
                  <input id="menu__toggle" type="checkbox" />
                  <ul className="menu__box">
                    <li><Link to="/LPPS" className="menu__item">Список ППС</Link></li>
                    <li><Link to="/Authorization" className="menu__item">Авторизация</Link></li>
                    <li><Link to="/Questionnaire" className="menu__item">Анкета институтов</Link></li>
                    <li><Link to="/private_office" className="menu__item">Личный кабинет</Link></li>
                  </ul>
                </>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;