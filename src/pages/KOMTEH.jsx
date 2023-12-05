import NavBar from "../components/NavBar"
import { Link } from "react-router-dom"

function Komteh() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <button className="btn" ><Link to="/" className="btn__link" >Инструкция по заполнению анкеты</Link></button>
        <div className="Komteh">
          <div className="Komteh__logo"></div>
          <div className="Komteh__name">Бишкекский колледж компьютерных систем и технологий</div>
        </div>
        <div className="table__komteh">
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
        <div className="forBtn"><button className="btn__Back" ><Link to="/home" className="Back__link" >Назад</Link></button></div>
      </div>
    </div>
  )
}

export default Komteh