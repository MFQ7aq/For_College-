import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="header__menu">
      <Link to="/Personal_Data" className="head__item Montherat">Личные данные и достижения</Link>
      <Link to="/User_Activity" className="head__item Montherat">Научно-исследовательская деятельность</Link>
      <Link to="/test3" className="head__item Montherat">Инновационно-образовательная деятельность</Link>
      <Link to="/test4" className="head__item Montherat">Воспетательная, общественная деятельность</Link>
      <Link to="/test4" className="head__item Montherat">Дополнительные данные</Link>
  </div>
  );
}

export default NavBar;