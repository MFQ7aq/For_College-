import NavBar from "../components/NavBar"
import BackButton from "../components/Back"
import { Link } from "react-router-dom"

function Kite() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <button className="btn" ><Link to="/" className="btn__link" >Инструкция по заполнению анкеты</Link></button>
        <div className="Edu__logo-name">
          <div className="Kite__logo"></div>
          <div className="Edu__text-L Kite__name">Колледж инновационных технологий и экономики</div>
        </div>
        <div className="Edu__table">
          <div className="row">
            <h5>Отделения</h5>
          </div>
          <div className="row">
            <h5>Средний балл</h5>
          </div>
          <div className="row">
            <h5>Итого</h5>
          </div>
          <div className="row">
            <Link to="/KITE/GiED" className="h6">Гуманитарных и экономических дисциплин</Link>
          </div>
          <div className="row">
            <h6>383</h6>
          </div>
          <div className="row">
            <h6>383</h6>
          </div>
          <div className="row">
            <h6><Link to="/KITE/EiTD">Естественных и технических дисциплин</Link></h6>
          </div>
          <div className="row">
            <h6>186</h6>
          </div>
          <div className="row">
            <h6>186</h6>
          </div>
        </div>
        <BackButton/>
      </div>
    </div>
  )
}

export default Kite