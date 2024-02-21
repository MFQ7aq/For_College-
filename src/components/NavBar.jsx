import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
      <nav className='nav'>
        <div className="nav__in">
          <Link to="/home" className='nav__title'><h2>Рейтинг ППС!</h2></Link>
          <ul className='nav__list'>
            <li><Link to="/home">Главная</Link></li>
            <li><Link to="/MUIT">МУИТ</Link></li>
            <li><Link to="/KOMTEHNO">Комтехно</Link></li>
            <li><Link to="/KITE">КИТЭ</Link></li>
            <li>
            <div className="hamburger-menu">
              <input id="menu__toggle" type="checkbox"/>
              <ul className="menu__box">
                <li><Link to="/LPPS" className="menu__item">Список ППС</Link></li>
                <li><Link to="/Authorization" className="menu__item">Авторизация</Link></li>
                <li><Link to="/AuthorizationPPS" className='menu__item'>Анкета ППС</Link></li>
                <li><Link to="/Questionnaire" className="menu__item">Анкета институтов</Link></li>
                <li><Link to="/private_office" className="menu__item">Личный кабинет</Link></li>
              </ul>
            </div>
            </li>
          </ul>
        </div>
      </nav>
  );
}

export default NavBar;