import { useState, useCallback } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";

function AuthorizationPPS() {
  const [title, setTitle] = useState("");
  const [total, setTotal] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    axios.post('http://localhost:8092/pps/awards', {
      "title": title,
      "total": parseInt(total),
      "date": parseInt(date),
      "file": file,
      "category": category
    })
    .then(function (response) {
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        setIsSubmitted(true);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [title, total, date, file, category]);

  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <div className="title__contain"><h2 className="Edu__text-L center">Анкета</h2></div>
        <div className="auth__contain">
          <form onSubmit={handleSubmit}>
            <input type="text" className="auth__input Montherat" value={title} onChange={e => setTitle(e.target.value)} placeholder="Наименование показателя" />
            <input type="number" className="auth__input Montherat" value={total} onChange={e => setTotal(e.target.value)} placeholder="Весомость показателя (в баллах)" />
            <input type="number" className="auth__input Montherat" value={date} onChange={e => setDate(e.target.value)} placeholder="Значение показателя (количество)" />
            <input type="text" className="auth__input Montherat" value={file} onChange={e => setFile(e.target.value)} placeholder="Периодичность измерения" />
            <input type="text" className="auth__input Montherat" value={category} onChange={e => setCategory(e.target.value)} placeholder="Документ, подтверждающий выполнение показателя" />
            <div className="auth__btn">
              <button onClick={handleSubmit} className="bnt__log Edu__text-S">Отправить</button>
              {isSubmitted && <div className="trued"><p className="Edu__text-S white">Отправлено</p></div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthorizationPPS;