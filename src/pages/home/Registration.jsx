import { useState, useCallback } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar"
import { useNavigate} from "react-router-dom"

function Registration() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    axios.post('http://localhost:8092/pps/sign-up ', {
      "username": name,
      "password": password,
    })
    .then(function (response) {
      if (response.status >= 200 && response.status <= 204) {
        navigate(-1)
        console.log(response)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [name, navigate, password]);

  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <div className="title__contain"><h2 className="Edu__text-L center">Регистрация</h2></div>
        <div className="auth__contain">
          <label htmlFor="" className="auth__label">
            <form onSubmit={handleSubmit}>
              {/* <input type="text" className="auth__input Montherat" value={name} onChange={e => setName(e.target.value)} placeholder="Имя" /> */}
              {/* <input type="text" className="auth__input Montherat" value={name} onChange={e => setName(e.target.value)} placeholder="Фамилия" /> */}
              <input type="text" className="auth__input Montherat" value={name} onChange={e => setName(e.target.value)} placeholder="Логин" />
              <input type="password" autoComplete="on" className="auth__input Montherat" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль (Не менее 7 символов)" />
            </form>
          </label>
          <div className="auth__btn-center">
            <button className="bnt__reg Edu__text-S" onClick={handleSubmit}>Зарегистрироваться</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration