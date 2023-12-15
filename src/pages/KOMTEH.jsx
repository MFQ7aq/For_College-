import NavBar from "../components/NavBar"
import BackButton from "../components/Back"
import { Link } from "react-router-dom"

function Komteh() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <button className="btn" ><Link to="/" className="btn__link" >Инструкция по заполнению анкеты</Link></button>
        <div className="Edu__logo-name">
          <div className="Komteh__logo"></div>
          <div className="Edu__text-L Komteh__name">Бишкекский колледж компьютерных систем и технологий</div>
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
          <Link to="/KOMTEHNO/IVTD" className="h6">Информатика, вычислительная техника и дизайна</Link>
          </div>
          <div className="row">
            <h6 className="h6">865</h6>
          </div>
          <div className="row">
            <h6 className="h6">865</h6>
          </div>
          <div className="row">
            <Link to="/KOMTEHNO/EUBD" className="h6">Экономика, управление и банковское дело</Link>
          </div>
          <div className="row">
            <h6 className="h6">504</h6>
          </div>
          <div className="row">
            <h6 className="h6">504</h6>
          </div>
        </div>
        <BackButton/>
      </div>
    </div>
  )
}

export default Komteh