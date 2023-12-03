import NavBar from "../components/NavBar"
import { Link } from "react-router-dom"

function Kite() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <button className="btn" ><Link to="/" className="btn__link" >Инструкция по заполнению анкеты</Link></button>
        <div className="Kite">
          <div className="Kite__logo"></div>
          <div className="Kite__name">Колледж инновационных технологий и экономики</div>
        </div>
        <div className="table__kite">
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
            <h6 className="h6">383</h6>
          </div>
          <div className="row">
            <h6 className="h6">383</h6>
          </div>
          <div className="row">
            <h6><Link to="/KITE/EiTD" className="h6">Естественных и технических дисциплин</Link></h6>
          </div>
          <div className="row">
            <h6 className="h6">186</h6>
          </div>
          <div className="row">
            <h6 className="h6">186</h6>
          </div>
        </div>
        <div className="forBtn"><button className="btn__Back" ><Link to="/home" className="Back__link" >Назад</Link></button></div>
      </div>
    </div>
  )
}

export default Kite