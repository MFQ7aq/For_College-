import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";

function UserInfo() {
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
    fetchData();
  }, [fetchData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const formData = {
      degree: selectedValues.degree,
      rank: selectedValues.rank,
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

  return (
    <div className="сontents">
      <div className="header">
        <NavBar />
      </div>
      <div className="main">
        <div className="title__contain"><h2 className="Edu__text-L center">Персональные данные</h2></div>
        <div className="auth__contain-doble">
          <label htmlFor="" className="auth__label">
            <form onSubmit={handleSubmit} className="auth_auth">
              {selectedValues.post === "Другое" && (
                <input type="text" className="auth__input Montherat" value={customInputValue} onChange={(e) => setCustomInputValue(e.target.value)} placeholder="Введите другую должность" />
              )}
              <select value={selectedValues.degree} onChange={(e) => handleSelect('degree', e.target.value)} className="auth__input auth__select Montherat">
                <option value="">Ученая степень</option>
                {degree.map((degree) =>
                  <option key={degree.id} value={degree.id}>
                    {degree.name}
                  </option>)}
              </select>
              <select value={selectedValues.rank} onChange={(e) => handleSelect('rank', e.target.value)} className="auth__input auth__select Montherat">
                <option value="">Ученое звание</option>
                {rank.map((rank) =>
                  <option key={rank.id} value={rank.id}>
                    {rank.name}
                  </option>)}
              </select>
              <div className="awards">
                {stateAwards.map((award) => (
                  <div className="awards__block" key={award.id}>
                    <div className="auth__input awards__select Montherat">
                      <input type="checkbox" className="checkbox" name={award.name} id={award.name} />
                      <label htmlFor={award.name}>{award.name}</label>
                    </div>
                    <input type="text" className="auth__input awards__select Montherat" name={`${award.name}_link`} placeholder="Введите ссылку" />
                  </div>
                ))}
              </div>
            </form>
          </label>
          <div className="auth__btn-center">
            <button className="bnt__reg Edu__text-S" onClick={handleSubmit}>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo;