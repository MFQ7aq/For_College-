import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="header__menu">
      <Link to="/private_office" className="head__item_1 Montherat">Личные данные</Link>
      <Link to="/Progress" className="head__item Montherat">Личные достижения</Link>
      <Link to="/Ural" className="head__item Montherat">Научно-исследовательская деятельность</Link>
      <Link to="/Education" className="head__item Montherat">Инновационно-образовательная деятельность</Link>
      <Link to="/Social" className="head__item Montherat">Воспитательная, общественная деятельность</Link>
      <Link to="/Offence" className="head__item Montherat">Дополнительные данные</Link>
    </div>  
  );
}

export default NavBar;