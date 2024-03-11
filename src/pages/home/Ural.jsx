import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import RegNav from "../../components/RegNav"
import { Link, useNavigate } from "react-router-dom";

function Ural() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const navigate = useNavigate();
  const [selectedValues, setSelectedValues] = useState({
    degree: '',
    rank: '',
    awards: [],
    links: {}
  });

  const handleSelect = useCallback((field, value) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [field]: value
    }));
  }, []);

  useEffect(() => {
    const userInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8092/api/user/research');
        const resp = response.data;
        const allNames = [];
        const allSubtitles = [];
        resp.forEach(subArray => {
          subArray.forEach(item => {
            const name = item.name;
            const researchActivitiesSubtitles = item.researchActivitiesSubtitles;
            allNames.push(name);
            allSubtitles.push(researchActivitiesSubtitles);
          });
        });
        setData(allNames);
        setSubData(allSubtitles);
      } catch (error) {
        console.log(error);
      }      
    };

    userInfo();
  }, [token]);

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
        <div className="account__config">
          <div className="avatar__container"><div className="avatar"></div></div>
          <h4 className="user__name"></h4>
          <ul className="config__list">
            <li className="config__items-li"><Link to="" className="config__items">Моя учётная запись</Link></li>
            <li className="config__items-li"><Link to="/Authorization" onClick={Back} className="config__items">Выйти</Link></li>
          </ul>
        </div>
        <div className="auth_auth">
          {data.length > 0 && data.map((item, index) => (
            <select key={index} value={selectedValues.subtitle} onChange={(e) => handleSelect('subtitle', e.target.value)} className="input__office input__text-s Montherat">
              <option value="">{item}</option>
              {subData[index] && subData[index].map((subItem, subIndex) => (
                <option key={subIndex} value={subItem.id}>
                  {subItem.name}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ural;