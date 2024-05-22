import { useCallback, useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import RegNav from "../../components/RegNav";
import AccountConf from "../../components/AccountConf";
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
  const [institutes, setInstitutes] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    name: '',
    stat: '',
    email: '',
    inst: '',
    post: '',
    otherPost: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await axios.get('http://localhost:8092/api/user/name', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const { name, institut, position, regular, email } = response.data.user;
        setUserData({ name, institut, position, regular, email });
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      }
    };

    const fetchDataInst = async () => {
      try {
        const response = await axios.get('http://localhost:8092/api/user/info');
        const { institutes, position } = response.data;
        setInstitutes(institutes);
        setPositions(position);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataUser();
    fetchDataInst();
  }, [token]);

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
    const { name, inst, post, otherPost, stat, email } = selectedValues;
    const position = post === 'Другое' ? otherPost : post;
    const dataToSend = JSON.stringify({
      name,
      institut: inst,
      position,
      regular: stat,
      email,
    });

    axios.post('http://localhost:8092/api/user/info/add', dataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        console.log(response);
        setIsAuthenticated(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [selectedValues, token]);

  return (
    <div className="private-office-contents">
      <div className="header">
        <NavBar />
      </div>
      <div className="private-office__main">
        <AccountConf />
        <div className="office">
          <RegNav />
          <h3 className="Edu__text-M Edu__text-M-office">Личные данные</h3>
          <div className="office__in">
            {isAuthenticated ? (
              <div className="form">
                <p className="input__text-s bold">ФИО</p>
                <div className="input__office Montherat">
                  <p className="input__text-s">{userData.name}</p>
                </div>
                <p className="input__text-s bold">Институт</p>
                <div className="input__office Montherat">
                  <p className="input__text-s">{userData.institut}</p>
                </div>
                <p className="input__text-s bold">Должность</p>
                <div className="input__office Montherat">
                  <p className="input__text-s">{userData.position}</p>
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
            ) : (
              <div className="form">
                <p className="input__text-s bold">ФИО</p>
                <input type="text" value={selectedValues.name} onChange={(e) => handleSelect('name', e.target.value)} className="input__office Montherat" />
                <p className="input__text-s bold">Институт</p>
                <select value={selectedValues.inst} onChange={(e) => handleSelect('inst', e.target.value)} className="input__office Montherat">
                  <option value=""></option>
                  {institutes && institutes.length > 0 && institutes.map((instItem, index) => (
                    <option key={index} value={instItem}>
                      {instItem}
                    </option>
                  ))}
                </select>
                <p className="input__text-s bold">Должность</p>
                <select value={selectedValues.post} onChange={(e) => handleSelect('post', e.target.value)} className="input__office Montherat">
                  <option value=""></option>
                  {positions && positions.length > 0 && positions.map((postItem, index) => (
                    <option key={index} value={postItem}>
                      {postItem}
                    </option>
                  ))}
                  <option value="Другое">Другое</option>
                </select>
                {selectedValues.post === 'Другое' && (
                  <div>
                    <p className="input__text-s bold">Укажите должность</p>
                    <input type="text" value={selectedValues.otherPost} onChange={(e) => handleSelect('otherPost', e.target.value)} className="input__office Montherat" />
                  </div>
                )}
                <p className="input__text-s bold">Штат/Совм.</p>
                <select value={selectedValues.stat} onChange={(e) => handleSelect('stat', e.target.value)} className="input__office Montherat">
                  <option value=""></option>
                  <option value="Штат">Штат</option>
                  <option value="Совместитель">Совместитель</option>
                </select>
                <p className="input__text-s bold">Email</p>
                <input type="text" value={selectedValues.email} onChange={(e) => handleSelect('email', e.target.value)} className="input__office Montherat" />
                <button onClick={handleSubmit} className="btn__link btn__blue montherat">Сохранить</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateOffice;