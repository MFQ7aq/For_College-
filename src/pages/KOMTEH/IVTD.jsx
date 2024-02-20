import axios from "axios"
import { useState } from 'react';
import BackButton from "../../components/Back"
import NavBar from "../../components/NavBar"
import { Link } from "react-router-dom"

function Ivtd() {
  const [title, setTitle] = useState("");
  const [total, setTotal] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();
    axios.post('http://localhost:8092/pps/awards', {
      title: String,
      total: Number,
      date: Number,
      file: String,
      category: String,
    })
      .then(function (response) {
        if (response.status === 200 || response.status === 204) {
          console.log("200 || 204")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <button className="btn" ><Link to="https://intuit.kg/questionnaire/" className="btn__link" >Инструкция по заполнению анкеты</Link></button>
          <div className="Edu__logo-name">
          <div className="Link__name Edu__text-M">Информатика, вычислительная техника и дизайна</div>
        </div>
        <div className="table__link">
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
            <h6>1</h6>
          </div>
          <div className="row">
            <h6>Давлетбекова Айзада Давлетбековна</h6>
          </div>
          <div className="row">
            <h6>1508</h6>
          </div>
          <div className="row">
            <h6>2</h6>
          </div>
          <div className="row">
            <h6>Исхакова Гульбахар Ашимжановна</h6>
          </div>
          <div className="row">
            <h6>968</h6>
          </div>
          <div className="row">
            <h6>3</h6>
          </div>
          <div className="row">
            <h6>Абдиев Азамат Шейшенбаевич</h6>
          </div>
          <div className="row">
            <h6>986</h6>
          </div>
          <div className="row">
            <h6>4</h6>
          </div>
          <div className="row">
            <h6>Калыков Алымбек Абдумаликович</h6>
          </div>
          <div className="row">
            <h6>0</h6>
          </div>
        </div>
        <div className="register">
          <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
            <input type="text" value={total} onChange={e => setTotal(e.target.value)} placeholder="Total" />
            <input type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="Date" />
            <input type="text" value={file} onChange={e => setFile(e.target.value)} placeholder="File" />
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
            <button type="submit">Отправить</button>
          </form>
        </div>
        <BackButton/>
      </div>
    </div>
  )
}

export default Ivtd