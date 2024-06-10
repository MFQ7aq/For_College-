import BackButton from "../components/Back"
import NavBar from "../components/NavBar"
import { Link } from "react-router-dom"

function Muit() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <div className="Edu__logo-name">
          <div className="MUIT__logo"></div>
          <div className="Edu__text-M MUIT__name">Международный университет инновационных технологий</div>
        </div>
        <div className="table__links Edu__text-S">
          <ul>
            <li><Link className="Link" to="/MUIT/rating_pps-un">РЕЙТИНГ ППС</Link></li>
            <li><Link className="Link" to="/MUIT/rating_inst-un">РЕЙТИНГ ИНСТИТУТОВ</Link></li>
          </ul>
        </div>
        <BackButton/>
      </div>
    </div>
  )
}

export default Muit