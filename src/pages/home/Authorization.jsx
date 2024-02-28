import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { Link, useNavigate } from "react-router-dom";

function Authorization() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate()

  const handleLogin = useCallback((e) => {
    e.preventDefault();
    axios.post('http://localhost:8092/api/login', {
      "username": name,
      "password": password,
    })
    .then(function (response) {
      if (response.status >= 200 && response.status <= 204) {
        localStorage.setItem('token', response.data.token);
        navigate("/private_office")
        setIsLoggedIn(true);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [name, navigate, password]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
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
              <>
                <form>
                  <p className="input__text Montherat">Логин</p>
                  <input type="text" className="auth__input Montherat" value={name} onChange={e => setName(e.target.value)} placeholder="Логин" />
                  <p className="input__text Montherat">Пароль</p>
                  <input type="password" autoComplete="on" className="auth__input Montherat" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
                </form>
                <div className="auth__btn-center">
                  <button onClick={handleLogout} className="bnt__log Edu__text-S">Выйти</button>
                </div>
              </>
            ) : (
              <form onSubmit={handleLogin}>
                <p className="input__text Montherat">Логин</p>
                <input type="text" className="auth__input Montherat" value={name} onChange={e => setName(e.target.value)} placeholder="Логин" />
                <p className="input__text Montherat">Пароль</p>
                <input type="password" autoComplete="on" className="auth__input Montherat" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
              </form>
            )}
          </label>
          {!isLoggedIn && (
            <div className="auth__btn">
              <button onClick={handleLogin} className="bnt__log Edu__text-S">Войти</button>
              <Link to="/Registration" className="bnt__reg Edu__text-S link_btn">Регистрация</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authorization;