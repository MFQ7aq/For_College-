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
            <li><Link to="" className='burger'></Link></li>
          </ul>
        </div>
      </nav>
  );
}

export default NavBar;