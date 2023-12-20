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
          <div className="Edu__text-M MUIT__name">Международный университет инновационных технологий</div>
        </div>
        <div className="table__links Edu__text-S">
          <ul>
            <li><Link className="Link" to="https://reyting-intuit.kg/wp-content/uploads/2022/06/%D0%9F%D0%A0%D0%98%D0%9A%D0%90%D0%97.pdf">Приказ МУИТ «О проведении рейтинговой оценки ППС и структурных подразделений»</Link></li>
            <li><Link className="Link" to="/MUIT/rating_pred">Предварительный просмотр «Анкету рейтинговой оценки преподавателя»</Link></li>
            <li><Link className="Link" to="/MUIT/rating_inst">Предварительный просмотр «Анкету рейтинговой оценки институтов»</Link></li>
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