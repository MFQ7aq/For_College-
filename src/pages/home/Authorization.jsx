import { useState, axios } from "react";
import NavBar from "../../components/NavBar"
import { Link, useNavigate } from "react-router-dom"

function Authorization() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8092/pps/awards', {
      "username": name,
      "password": parseInt(password),
    })
    .then(function (response) {
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        navigate("/private_office")
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
        <div className="title__contain"><h2 className="Edu__text-L center">Авторизация</h2></div>
        <div className="auth__contain">
          <label htmlFor="" className="auth__label">
            <form onSubmit={handleSubmit}>
              <p className="input__text Montherat">Имя пользователя или E-mail</p>
              <input type="text" className="auth__input Montherat" value={name} onChange={e => setName(e.target.value)} placeholder="Имя пользователя или E-mail" />
              <p className="input__text Montherat">Пароль</p>
              <input type="number" className="auth__input Montherat" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
            </form>
          </label>
          <div className="remember">         
            <input className="checkbox" type="checkbox" />
            <span className="checkbox__text Montherat">Запомнить меня</span>
          </div>
          <div className="auth__btn">
            <button onClick={handleSubmit} className="bnt__log Edu__text-S">Войти</button>
            <button onClick={handleSubmit} className="bnt__reg Edu__text-S">Зарегистрироваться</button>
          </div>
          <Link className="forgot__text Montherat">Забыли пароль?</Link>
        </div>
      </div>
    </div>
  )
}

export default Authorization