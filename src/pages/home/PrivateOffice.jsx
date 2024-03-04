import { useCallback, useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PrivateOffice() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState({
    name: '',
    institut: '',
    position: '',
    regular: '',
    email: ''
  });
  const [inst, setInst] = useState([]);
  const [post, setPost] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    name: '',
    inst: '',
    stat: '',
    post: '',
    email: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8092/api/user/info');
        const { institutes, position } = response.data;
        setInst(institutes);
        setPost(position);
      } catch (error) {
        console.log(error);
      }
    };

    const userInfo = async () => {
      try {
        const resp = await axios.get('http://localhost:8092/api/user/name', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const { name, institut, position, regular, email } = resp.data.user;
        setUserData({ name, institut, position, regular, email });
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
      }
    };

    const checkAuthentication = async () => {
      try {
        const resp = await axios.get('http://localhost:8092/api/user/name', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!resp.data.user === null)
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    fetchData();
    userInfo();
    checkAuthentication();
  }, [token]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }, []);
  
  const handleSelect = useCallback((field, value) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [field]: value
    }));
  }, []);
  
  const Back = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    axios.post('http://localhost:8092/api/user/info/add', {
      "name": selectedValues.name,
      "institut": selectedValues.inst,
      "position": selectedValues.post,
      "regular": selectedValues.stat,
      "email": selectedValues.email,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(function (response) {
      console.log(response);
      setIsAuthenticated(true)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [selectedValues, token]);

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
            <li className="config__items-li"><Link to="" className="config__items">Моя учётная запись</Link></li>
            <li className="config__items-li"><Link to="/Authorization"  onClick={handleLogout} className="config__items">Выйти</Link></li>
          </ul>
        </div>
        <div className="office">
          <h3 className="Edu__text-L">Личный кабинет</h3>
          <div className="office__in">
            {isAuthenticated ? (
              <>
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
              </>
            ) : (
              <>
                <div className="form">
                  <p className="input__text-s">ФИО</p>
                  <input type="text" value={selectedValues.name} onChange={(e) => handleSelect('name', e.target.value)} className="input__office Montherat" />
                  <p className="input__text-s">Институт</p>
                  <select value={selectedValues.inst} onChange={(e) => handleSelect('inst', e.target.value)} className="input__office Montherat">
                    <option value=""></option>
                    {inst.map((inst) => <option key={inst.id} value={inst.name}>
                      {inst.name}
                    </option>)}
                  </select>
                  <p className="input__text-s">Должность</p>
                  <select value={selectedValues.post} onChange={(e) => handleSelect('post', e.target.value)} className="input__office Montherat">
                    <option value=""></option>
                    {post.map((post) => <option key={post.id} value={post.name}>
                      {post.name}
                    </option>)}
                    <option value="Другое">Другое</option>
                  </select>
                  <p className="input__text-s">Штат/Совм.</p>
                  <select value={selectedValues.stat} onChange={(e) => handleSelect('stat', e.target.value)} className="input__office Montherat">
                    <option value=""></option>
                    <option value="Штат">Штат</option>
                    <option value="Совместитель">Совместитель</option>
                  </select>
                  <p className="input__text-s">Email</p>
                  <input type="email" value={selectedValues.email} onChange={(e) => handleSelect('email', e.target.value)} className="input__office Montherat" />
                </div>
                <div className="btn__office">
                  <button onClick={handleSubmit} className="btn__link btn__green montherat">Отправить</button>
                  <button onClick={Back} className="btn__link btn__blue montherat">Назад</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateOffice;