import NavBar from "../../components/NavBar"
import { Link } from "react-router-dom"

function Authorization() {
  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <div className="title__contain"><h2 className="Edu__text-L">Авторизация</h2></div>
        <div className="auth__contain">
          <label htmlFor="" className="auth__label">
            <p className="input__text Montherat">Имя пользователя или E-mail</p>
            <input type="text" className="auth__input Montherat"/>
            <p className="input__text Montherat">Пароль</p>
            <input type="text" className="auth__input Montherat"/>
          </label>
          <div className="remember">          
            <input className="checkbox" type="checkbox" />
            <span className="checkbox__text Montherat">Запомнить меня</span>
          </div>
          <div className="auth__btn">
            <button className="bnt__log Edu__text-S">Войти</button>
            <button className="bnt__reg Edu__text-S">Зарегистрироваться</button>
          </div>
          <Link className="forgot__text Montherat">Забыли пароль?</Link>
        </div>
      </div>
    </div>
  )
}

export default Authorization