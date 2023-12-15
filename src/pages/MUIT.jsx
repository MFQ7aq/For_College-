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
        <button className="btn" ><Link to="/" className="btn__link" >Инструкция по заполнению анкеты</Link></button>
        <div className="Edu__logo-name">
          <div className="MUIT__logo"></div>
          <div className="Edu__text-L MUIT__name">Международный университет инновационных технологий</div>
        </div>
        <div className="MUIT__links Edu__text-M">
          <ul>
            <li><Link to="/MUIT/">Приказ МУИТ «О проведении рейтинговой оценки ППС и структурных подразделений»</Link></li>
            <li><Link to="/MUIT/">Предварительный просмотр «Анкету рейтинговой оценки преподавателя»</Link></li>
            <li><Link to="/MUIT/">Предварительный просмотр «Анкету рейтинговой оценки институтов»</Link></li>
            <li><Link to="/MUIT/">РЕЙТИНГ ППС</Link></li>
            <li><Link to="/MUIT/">РЕЙТИНГ ИНСТИТУТОВ</Link></li>
          </ul>
        </div>
        <BackButton/>
      </div>
    </div>
  )
}

export default Muit