import { Link } from "react-router-dom";
import NavBar from "../../../../components/NavBar";

function RadactStage() {
  return (
    <div className="сontents">
      <div className="private-office-contents">
        <div className="header">
          <NavBar />
        </div>
        <>
          <div className="header__menu-m">
            <Link to="/redact_progres" className="head__item_1 Montherat">Личные достижения</Link>
            <Link to="/redact_resaerch" className="head__item Montherat">Научно-исследовательская деятельность</Link>
            <Link to="/redact_education" className="head__item Montherat">Инновационно-образовательная деятельность</Link>
            <Link to="/redact_social" className="head__item Montherat">Воспитательная, общественная деятельность</Link>
          </div>
        </>
      </div>
    </div>
  );
}

export default RadactStage;