import { useCallback, useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PrivateOffice() {
  const navigate = useNavigate();
  const { id } = useParams()
  const [userData, setUserData] = useState({
    name: '',
    institut: '',
    position: '',
    regular: '',
    email: ''
  });

  useEffect(() => {
    const userInfo = async () => {
      try {
        const resp = await axios.get('http://localhost:8092/api/user/us', {
          params: id
        });
        const { name, institut, position, regular, email } = resp.data.user;
        setUserData({ name, institut, position, regular, email });
      } catch (error) {
        console.log(error);
      }
    };

    userInfo();
  }, [id]);

  const Back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="private-office-contents">
      <div className="header">
        <NavBar/>
        <div className="private-office-bg"></div>
      </div>
      <div className="private-office__main">
        <div className="account__config">
          <div className="avatar__container"><div className="avatar"></div></div>
          <h4 className="user__name">{userData.name}</h4>
          <ul className="config__list">
            <li className="config__items-li"><Link to="/Personal_data" className="config__items">Персональные данные</Link></li>
            <li className="config__items-li"><Link to="" className="config__items">Моя учётная записьывап</Link></li>
            <li className="config__items-li"><Link to="/Authorization"  onClick={Back} className="config__items">Выйти</Link></li>
          </ul>
        </div>
        <div className="office">
          <h3 className="Edu__text-L">Личный кабинет</h3>
          <div className="office__in">
            <div className="form">
              <p className="input__text-s">ФИО</p>
              <div className="input__office Montherat">
                <p className="input__text-s">{userData.name}</p>
              </div>
              <p className="input__text-s">Институт</p>
              <div className="input__office Montherat">
                <p className="input__text-s">{userData.institut}</p>
              </div>
              <p className="input__text-s">Должность</p>
              <div className="input__office Montherat">
                <p className="input__text-s">{userData.position}</p>
              </div>
              <p className="input__text-s">Штат/Совм.</p>
              <div className="input__office Montherat">
                <p className="input__text-s">{userData.regular}</p>
              </div>
              <p className="input__text-s">Email</p>
              <div className="input__office Montherat">
                <p className="input__text-s">{userData.email}</p>
              </div>
            </div>
            <div className="btn__office">
              <button onClick={Back} className="btn__link btn__blue montherat">Назад</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateOffice;