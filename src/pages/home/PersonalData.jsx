import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import RegNav from "../../components/RegNav"
import { useNavigate } from "react-router-dom";
import AccountConf from "../../components/AccountConf";

function UserInfo() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  const [degree, setDegree] = useState([]);
  const [rank, setRank] = useState([]);
  const [stateAwards, setStateAwards] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    degree: "",
    rank: "",
    awards: [],
    links: {}
  });
  const [customInputValue, setCustomInputValue] = useState('');

  const handleSelect = useCallback((field, value) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [field]: value
    }));
  }, []);

  useEffect(() => {
    const fetchData = useCallback(async () => {
      try {
        const response = await axios.get('http://localhost:8092/api/user/progress');
        const data = response.data[0];
        const degrees = data.find(item => item.name === 'Ученая степень');
        const ranks = data.find(item => item.name === 'Ученое звание');
        const stateAwards = data.find(item => item.name === 'Гос.награды');
  
        setDegree(degrees ? degrees.personalAwardsSubtitles : []);
        setRank(ranks ? ranks.personalAwardsSubtitles : []);
        setStateAwards(stateAwards ? stateAwards.personalAwardsSubtitles.map(award => ({ id: award.id, name: award.name, link: '' })) : []);
      } catch (error) {
        console.log(error);
      }
    }, [setDegree, setRank, setStateAwards]);

    fetchData()
  }, [token]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const awards = {};
    if (selectedValues.degree) { awards.a = { subId: Number(selectedValues.degree)} }
    if (selectedValues.rank) { awards.b = { subId: Number(selectedValues.rank)} }
    stateAwards.forEach((award, index) => {
      const checkbox = document.querySelector(`input[name="${award.name}"]:checked`);
      const linkInput = document.querySelector(`input[name="${award.name}_link"]`);
      if (checkbox) {
        const awardKey = String.fromCharCode(99 + index);
        awards[awardKey] = { subId: award.id };
        awards[awardKey].link = linkInput ? linkInput.value.trim() : 'Нет ссылки';
      }
    });
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8092/api/user/progress/add', { awards }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(awards);
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
        <NavBar />
        <div className="private-office-bg">
          <RegNav />
        </div>
      </div>
      <div className="private-office__main">
        <AccountConf />
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
                    </option>
                  )}
                </select>
                <select value={selectedValues.rank} onChange={(e) => handleSelect('rank', e.target.value)} className="input__office input__text-s Montherat">
                  <option value="">Ученое звание</option>
                  {rank.map((rank) =>
                    <option key={rank.id} value={rank.id}>
                      {rank.name}
                    </option>
                  )}
                </select>
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