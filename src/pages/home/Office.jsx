import { useCallback, useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import RegNav from "../../components/RegNav"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AccountConf from "../../components/AccountConf";

function Office() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const { id } = useParams()
  const [userData, setUserData] = useState({
    name: '',
    institutions: '',
    position: '',
    regular: '',
    email: ''
  });

  useEffect(() => {
    const userInfo = async () => {
      try {
        const resp = await axios.get(`http://localhost:8092/api/user/us/${id}`);
        const { name, institutions, position, regular, email } = resp.data.id;
        setUserData({ name, institutions, position, regular, email });
      } catch (error) {
        console.log(error);
      }
    };

    userInfo();
  }, [id, token]);

  const Back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="private-office-contents">
      <div className="header">
        <NavBar />
      </div>
      <div className="private-office__main">
        <AccountConf />
        <div className="office">
          <RegNav />
          <h3 className="Edu__text-L">Личный кабинет</h3>
          <div className="office__in">
            <div className="form">
              <p className="input__text-s bold">ФИО</p>
              <div className="input__office Montherat">
                <p className="input__text-s">{userData.name}</p>
              </div>
              <p className="input__text-s bold">Институт</p>
              <div className="input__office Montherat">
                <p className="input__text-s">{userData.institutions ? userData.institutions.name : ''}</p>
              </div>
              <p className="input__text-s bold">Должность</p>
              <div className="input__office Montherat">
                <p className="input__text-s">{userData.position ? userData.position.name : ''}</p>
              </div>
              <p className="input__text-s bold">Штат/Совм.</p>
              <div className="input__office Montherat">
                <p className="input__text-s">{userData.regular}</p>
              </div>
              <p className="input__text-s bold">Email</p>
              <div className="input__office Montherat">
                <p className="input__text-s">{userData.email}</p>
              </div>
              <button onClick={Back} className="btn__link btn__blue montherat">Назад</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Office;