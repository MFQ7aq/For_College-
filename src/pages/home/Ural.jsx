import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import RegNav from "../../components/RegNav"
import AccountConf from "../../components/AccountConf";

function Ural() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    degree: '',
    rank: '',
    awards: [],
    links: {}
  });

  const handleSelect = useCallback((field, value, index) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [field]: {
        ...prevValues[field],
        [index]: value
      }
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
        <div>
          {data.length > 0 && data.map((item, index) => (
            <select key={index} value={selectedValues.degree[index] || ''} onChange={(e) => handleSelect('degree', e.target.value, index)} className="input__office input__text-s Montherat">
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