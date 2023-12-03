import NavBar from "../../components/NavBar"
import { Link } from "react-router-dom"

function GiED() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <button className="btn" ><Link to="/" className="btn__link" >Инструкция по заполнению анкеты</Link></button>
        <div className="Kite-link">
          <div className="Kite-link__name">ГиЭД</div>
        </div>
        <div className="table__kite-link">
          <div className="row">
            <h5>№</h5>
          </div>
          <div className="row">
            <h5>ФИО</h5>
          </div>
          <div className="row">
            <h5>Итого</h5>
          </div>
          <div className="row">
            <h6 className="h6">1</h6>
          </div>
          <div className="row">
            <h6 className="h6">Табышбекова Элнура Эркинбековна</h6>
          </div>
          <div className="row">
            <h6 className="h6">0</h6>
          </div>
          <div className="row">
            <h6 className="h6">2</h6>
          </div>
          <div className="row">
            <h6 className="h6">Советова Каныкей Эрнстбековна</h6>
          </div>
          <div className="row">
            <h6 className="h6">1198</h6>
          </div>
          <div className="row">
            <h6 className="h6">3</h6>
          </div>
          <div className="row">
            <h6 className="h6">Дастанова Назима</h6>
          </div>
          <div className="row">
            <h6 className="h6">0</h6>
          </div>
          <div className="row">
            <h6 className="h6">4</h6>
          </div>
          <div className="row">
            <h6 className="h6">Карыбекова Загида Ажыбековна</h6>
          </div>
          <div className="row">
            <h6 className="h6">0</h6>
          </div>
        </div>
        <div className="forBtn"><button className="btn__Back" ><Link to="/home" className="Back__link" >Назад</Link></button></div>
      </div>
    </div>
  )
}

export default GiED