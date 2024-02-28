import { useCallback } from "react";
import NavBar from "../../components/NavBar"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function PrivateOffice() {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
  }, []);

  const Back = () => {
    navigate(-1);
  };
  const reolad = () => {
    window.location.reload()
  }

  return (
    <div className="private-office-contents">
      <div className="header">
        <NavBar/>
        <div className="private-office-bg"></div>
      </div>
      <div className="private-office__main">
        <div className="account__config">
          <div className="avatar__container"><div className="avatar"></div></div>
          <h4 className="user__name">Test</h4>
          <ul className="config__list">
          <li className="config__items-li"><Link to="/Personal_data" className="config__items">Персональные данные</Link></li>
            <li className="config__items-li"><Link to="" className="config__items">Моя учётная записьывап</Link></li>
            <li className="config__items-li"><Link to="/Authorization"  onClick={handleLogout} className="config__items">Выйти</Link></li>
          </ul>
        </div>
          <div className="office">
            <h3 className="Edu__text-L">Личный кабинет</h3>
            <div className="office__in">
            <div className="form">
              <label htmlFor="">
                <p className="input__text-s">Анкета</p>
                <input type="text" className="input__office"/>
              </label>
              <label htmlFor="">
                <p className="input__text-s">Институт</p>
                <input type="text" className="input__office"/>
              </label>
              <label htmlFor="">
                <p className="input__text-s">Штат/совм.</p>
                <input type="text" className="input__office"/>
              </label>
              <label htmlFor="">
                <p className="input__text-s">E-mail</p>
                <input type="text" className="input__office"/></label>
              <label htmlFor="">
                <p className="input__text-s">Номер телефона</p>
                <input type="text" className="input__office"/></label>
            </div>
            <div className="btn__office">
              <button onClick={reolad} className="btn__link btn__green montherat">Обновить</button>
              <button onClick={Back} className="btn__link btn__blue montherat">Назад</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivateOffice