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
        <div className="MUIT">
          <div className="MUIT__logo"></div>
          <div className="MUIT__name">Международный университет инновационных технологий</div>
        </div>
        <div className="MUIT__links">
          <ul>
            <li>Приказ МУИТ «О проведении рейтинговой оценки ППС и структурных подразделений»</li>
            <li>Предварительный просмотр «Анкету рейтинговой оценки преподавателя»</li>
            <li>Предварительный просмотр «Анкету рейтинговой оценки институтов»</li>
            <li>РЕЙТИНГ ППС</li>
            <li>РЕЙТИНГ ИНСТИТУТОВ</li>
          </ul>
        </div>
        <div className="forBtn"><button className="btn__Back" ><Link to="/home" className="Back__link" >Назад</Link></button></div>
      </div>
    </div>
  )
}

export default Muit