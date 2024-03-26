import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import RegNav from "../../components/RegNav";
import AccountConf from "../../components/AccountConf";
import { useNavigate } from "react-router-dom";
import Select from "./Select";

function Test4() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8092/api/user/social");
      const userData = response.data[0] || []; // Проверяем наличие данных в ответе
      setData(userData);
      const initialSelectedValues = {};
      userData.forEach((research) => {
        initialSelectedValues[research.id] = null; // Используем null для инициализации
      });
      setSelectedValues(initialSelectedValues);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, token]);

  const handleSelectChange = (optionId, value) => {
    setSelectedValues(prevValues => ({
      ...prevValues,
      [optionId]: value
    }));
  };

  const handleSubmit = async (e, selectedOptions) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming token is defined somewhere
      const payload = {
        educations: []
      };
      if (Array.isArray(selectedOptions)) {
        selectedOptions.forEach((optionName) => {
          const option = data.researchActivitiesSubtitles.find((item) => item.name === optionName);
          const links = Array.isArray(linkInputs[option.id]) ? linkInputs[option.id] : [];
          links.forEach((linkData) => {
            payload.educations.push({
              subId: option.id,
              link: linkData.link.trim() // Assuming you want to trim the link
            });
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
            <form onSubmit={(e) => handleSubmit(e, Object.keys(selectedValues).filter(key => selectedValues[key]))}>
              <div className="auth_auth-c">
              {data.map((research) => (
                <Select 
                  data={research} 
                  key={research.id} 
                  selectedValue={selectedValues[research.id]} 
                  setSelectedValue={(value) => setSelectedValues(prevState => ({ ...prevState, [research.id]: value }))} 
                />
              ))}
              </div>
              <button type="submit" className="bnt__reg btn__green btn__link">
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
export default Test4;