import axios from "axios"
import { useState } from 'react';
import BackButton from "../../components/Back"
import NavBar from "../../components/NavBar"
import { Link } from "react-router-dom"

function Ivtd() {
  const [title, setTitle] = useState('');
  const [total, setTotal] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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