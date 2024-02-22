import { useState, useCallback } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { useNavigate, Link } from "react-router-dom";

function Authorization() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = useCallback((e) => {
    e.preventDefault();
    axios.post('http://localhost:8092/api/login_check', {
      "username": name,
      "password": password,
    })
    .then(function (response) {
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        setIsLoggedIn(true);
        navigate("/private_office");
        localStorage.setItem('ten', response.data.token);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [name, navigate, password]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('ten');
  }, []);

  return (
    <div className="сontents">
      <div className="header">
        <NavBar/>
      </div>
      <div className="main">
        <div className="title__contain"><h2 className="Edu__text-L center">Авторизация</h2></div>
        <div className="auth__contain">
          <label htmlFor="" className="auth__label">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="bnt__log Edu__text-S">Выйти</button>
            ) : (
              <form onSubmit={handleLogin}>
                <p className="input__text Montherat">Логин</p>
                <input type="text" className="auth__input Montherat" value={name} onChange={e => setName(e.target.value)} placeholder="Логин" />
                <p className="input__text Montherat">Пароль</p>
                <input type="password" className="auth__input Montherat" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
              </form>
            )}
          </label>
          <div className="auth__btn">
            {!isLoggedIn && (
              <button onClick={handleLogin} className="bnt__log Edu__text-S">Войти</button>
            )}
            <Link to="/Registration" className="bnt__reg Edu__text-S link_btn">Регистрация</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authorization;