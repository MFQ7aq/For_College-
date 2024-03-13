import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import RegNav from "../../components/RegNav"
import AccountConf from "../../components/AccountConf";
import { useNavigate } from "react-router-dom";

function Ural() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  const [publications, setPublications] = useState([]);
  const [hIndex, setHIndex] = useState([]);
  const [patent, setPatent] = useState([]);
  const [dissertationDefense, setDissertationDefense] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    publications: "",
    hIndex: "",
    patent: "",
    dissertationDefense: "",
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
      const data = response.data[0];
      const publications = data.find(item => item.name === 'Публикации в научном журнале «Наука и инновационные технологии» МУИТ');
      const hIndex = data.find(item => item.name === 'Индекс Хирша по публикациям');
      const patent = data.find(item => item.name === 'Патент / Авторское свидетельство');
      const dissertationDefense = data.find(item => item.name === 'Защита диссертации');

      setPublications(publications ? publications.value : []);
      setHIndex(hIndex ? hIndex.value : []);
      setPatent(patent ? patent.value : []);
      setDissertationDefense(dissertationDefense ? dissertationDefense.value : []);
      console.log(hIndex);
    } catch (error) {
      console.log(error);
    }
  }, [setPublications, setHIndex, setPatent, setDissertationDefense]);
  useEffect(() => {
    fetchData();
  }, [fetchData, token]);

  const Back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
  <div className="private-office-contents">
    <div className="header">
      <NavBar/>
      <div className="private-office-bg">
      <RegNav/>
      </div>
    </div>
    <div className="private-office__main">
    <AccountConf />
      <div className="auth__contain-doble">
        <label htmlFor="" className="auth__label">
          <form>
            <div className="auth_auth">
              <select value={selectedValues.publications} onChange={(e) => handleSelect('publications', e.target.value)} className="input__office input__text-s Montherat">
                <option value="">«Наука и инновационные технологии» МУИТ</option>
                {publications.map((publications) =>
                  <option key={publications.id} value={publications.id}>
                    {publications.name}
                  </option>
                )}
              </select>
              <select value={selectedValues.hIndex} onChange={(e) => handleSelect('hIndex', e.target.value)} className="input__office input__text-s Montherat">
                <option value="">Индекс Хирша по публикациям</option>
                {hIndex.map((hIndex) =>
                  <option key={hIndex.id} value={hIndex.id}>
                    {hIndex.name}
                  </option>
                )}
              </select>
              <select value={selectedValues.patent} onChange={(e) => handleSelect('patent', e.target.value)} className="input__office input__text-s Montherat">
                <option value="">Патент / Авторское свидетельство</option>
                {patent.map((patent) =>
                  <option key={patent.id} value={patent.id}>
                    {patent.name}
                  </option>
                )}
              </select>
              <select value={selectedValues.dissertationDefense} onChange={(e) => handleSelect('dissertationDefense', e.target.value)} className="input__office input__text-s Montherat">
                <option value="">Защита диссертации</option>
                {dissertationDefense.map((dissertationDefense) =>
                  <option key={dissertationDefense.id} value={dissertationDefense.id}>
                    {dissertationDefense.name}
                  </option>
                )}
              </select>
            </div>
            {/* <button className="bnt__reg btn__green btn__link" onClick={handleSubmit}>Отправить</button> */}
            <button onClick={Back} className="btn__link btn__blue montherat">Назад</button>
          </form>
        </label>
      </div>
      </div>
    </div>
  );
}

export default Ural;