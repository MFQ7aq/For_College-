import NavBar from "../../components/NavBar"
import { Link } from "react-router-dom"

function Ivtd() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <button className="btn" ><Link to="/" className="btn__link" >Инструкция по заполнению анкеты</Link></button>
        <div className="Kite-link">
          <div className="Kite-link__name">Информатика, вычислительная техника и дизайна</div>
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
            <h6 className="h6">Давлетбекова Айзада Давлетбековна</h6>
          </div>
          <div className="row">
            <h6 className="h6">1508</h6>
          </div>
          <div className="row">
            <h6 className="h6">2</h6>
          </div>
          <div className="row">
            <h6 className="h6">Исхакова Гульбахар Ашимжановна</h6>
          </div>
          <div className="row">
            <h6 className="h6">968</h6>
          </div>
          <div className="row">
            <h6 className="h6">3</h6>
          </div>
          <div className="row">
            <h6 className="h6">Абдиев Азамат Шейшенбаевич</h6>
          </div>
          <div className="row">
            <h6 className="h6">986</h6>
          </div>
          <div className="row">
            <h6 className="h6">4</h6>
          </div>
          <div className="row">
            <h6 className="h6">Калыков Алымбек Абдумаликович</h6>
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

export default Ivtd