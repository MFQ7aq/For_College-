import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import RegNav from "../../components/RegNav";
import AccountConf from "../../components/AccountConf";
import { useNavigate } from "react-router-dom";
import Select from "./Select";

function Test3() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [linkInputs, setLinkInputs] = useState({}); // Добавляем состояние для linkInputs

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8092/api/user/education");
      const userData = response.data[0];
      setData(userData);
      const initialSelectedValues = {};
      userData.forEach((educations) => {
        initialSelectedValues[educations.id] = "";
      });
      setSelectedValues(initialSelectedValues);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, token]);

  const updateLinkInputs = useCallback((newLinkInputs) => {
    setLinkInputs(newLinkInputs);
  }, []);

  const handleSubmit = async (e, selectedOptions) => {
    e.preventDefault();
    try {
      const payload = {
        educations: {}
      };
      if (Array.isArray(selectedOptions)) {
        selectedOptions.forEach((optionName) => {
          const option = data.researchActivitiesSubtitles.find((item) => item.name === optionName);
          const links = Array.isArray(linkInputs[option.id]) ? linkInputs[option.id] : []; // Проверяем, является ли linkInputs[option.id] массивом
          links.forEach((linkData, index) => {
            payload.educations[`${option.name}-${index}`] = {
              subId: option.id,
              link: linkData.link
            };
          });
        });
      }      
      const response = await axios.post("http://localhost:8092/api/user/education/add", payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      console.log(payload);
    } catch (error) {
      console.error(error);
    }
  };

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
            <form onSubmit={(e) => handleSubmit(e, selectedOptions)}>
              <div className="auth_auth-c">
              {data.map((educations) => (
                <Select data={educations} key={educations.id}></Select>
              ))}
              </div>
              <button className="bnt__reg btn__green btn__link" onClick={handleSubmit}>
                Отправить
              </button>
              <button onClick={Back} className="btn__link btn__blue montherat">
                Назад
              </button>
            </form>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Test3;