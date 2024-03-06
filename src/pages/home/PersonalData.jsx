import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import { Link, useNavigate } from "react-router-dom";

function UserInfo() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  const [degree, setDegree] = useState([]);
  const [rank, setRank] = useState([]);
  const [stateAwards, setStateAwards] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    degree: '',
    rank: '',
    awards: [],
    links: {}
  });
  const [customInputValue, setCustomInputValue] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    institut: '',
    position: '',
    regular: '',
    email: ''
  });

  const handleSelect = useCallback((field, value) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [field]: value
    }));
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8092/api/user/progress');
      const { degree, rank, state_awards } = response.data;
      setDegree(degree);
      setRank(rank);
      setStateAwards(state_awards);
    } catch (error) {
      console.log(error);
    }
  }, [setDegree, setRank, setStateAwards]);
  
  useEffect(() => {
    const userInfo = async () => {
      try {
        const resp = await axios.get('http://localhost:8092/api/user/name', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const { name } = resp.data.user;
        setUserData({ name });
      } catch (error) {
        console.log(error);
      }
    };

    userInfo();
    fetchData();
  }, [fetchData, token]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const formData = {
      degree: selectedValues.degree || null,
      rank: selectedValues.rank || null,
      awards: [],
    };
    stateAwards.forEach((award) => {
      const checkbox = document.querySelector(`input[name="${award.name}"]:checked`);
      if (checkbox) {
        const linkInput = document.querySelector(`input[name="${award.name}_link"]`);
        formData.awards.push({
          id: award.id,
          name: award.name,
          link: linkInput.value,
        });
      }
    });
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8092/api/user/progress/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [selectedValues, stateAwards]);

  const Back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
  <div className="private-office-contents">
    <div className="header">
      <NavBar/>
      <div className="private-office-bg">
        <div className="header__menu">
          <Link to="/Personal_data" className="head__item Montherat">Личные данные и достижения</Link>
          <Link className="head__item Montherat">Научно-исследовательская деятельность</Link>
          <Link className="head__item Montherat">Инновационно-образовательная деятельность</Link>
          <Link className="head__item Montherat">Воспетательная, общественная деятельность</Link>
          <Link className="head__item Montherat">Проф. деятельность</Link>
          <Link className="head__item Montherat">Взаимодействие со стейкхолдерами</Link>
          <Link className="head__item Montherat">Дополнительные данные</Link>
        </div>
      </div>
    </div>
    <div className="private-office__main">
      <div className="account__config">
        <div className="avatar__container"><div className="avatar"></div></div>
        <h4 className="user__name">{userData.name}</h4>
        <ul className="config__list">
          <li className="config__items-li"><Link to="" className="config__items">Моя учётная запись</Link></li>
          <li className="config__items-li"><Link to="/Authorization"  onClick={Back} className="config__items">Выйти</Link></li>
        </ul>
      </div>
      <div className="auth__contain-doble">
        <label htmlFor="" className="auth__label">
          <form onSubmit={handleSubmit}>
            <div className="auth_auth">
              {selectedValues.post === "Другое" && (
                <input type="text" className="input__office input__text-s Montherat" value={customInputValue} onChange={(e) => setCustomInputValue(e.target.value)} placeholder="Введите другую должность" />
              )}
              <select value={selectedValues.degree} onChange={(e) => handleSelect('degree', e.target.value)} className="input__office input__text-s Montherat">
              <option value="">Ученая степень</option>
              {degree.map((degree) =>
                <option key={degree.id} value={degree.id}>
                  {degree.name}
                </option>)}
            </select>
            <select value={selectedValues.rank} onChange={(e) => handleSelect('rank', e.target.value)} className="input__office input__text-s Montherat">
              <option value="">Ученое звание</option>
              {rank.map((rank) =>
                <option key={rank.id} value={rank.id}>
                  {rank.name}
              </option>)}
            </select>
            </div>
            <div className="awards">
              {stateAwards.map((award) => (
                <div className="awards__block" key={award.id}>
                  <div className="input__office input__text-s Montherat">
                    <input type="checkbox" className="checkbox" name={award.name} id={award.name} />
                    <label htmlFor={award.name}>{award.name}</label>
                  </div>
                  <input type="text" className="input__office input__text-s Montherat" name={`${award.name}_link`} placeholder="Введите ссылку" />
                </div>
              ))}
            </div>
            <button className="bnt__reg btn__green btn__link" onClick={handleSubmit}>Отправить</button>
            <button onClick={Back} className="btn__link btn__blue montherat">Назад</button>
          </form>
        </label>
      </div>
      </div>
    </div>
  );
}

export default UserInfo;