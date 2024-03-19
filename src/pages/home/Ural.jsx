import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import RegNav from "../../components/RegNav";
import AccountConf from "../../components/AccountConf";
import { useNavigate } from "react-router-dom";
import Select from "./Select";

function Ural() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8092/api/user/research");
      const userData = response.data[0];
      setData(userData);
      const initialSelectedValues = {};
      userData.forEach((research) => {
        initialSelectedValues[research.id] = "";
      });
      setSelectedValues(initialSelectedValues);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, token]);

  // const handleSelect = useCallback((field, value) => {
  //   setSelectedValues((prevValues) => ({
  //     ...prevValues,
  //     [field]: { subId: value, link: "" },
  //   }));
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ural: selectedValues,
      };
      const response = await axios.post("http://localhost:8092/api/user/research/add", payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
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
            <form>
              <div className="auth_auth-c">
              {data.map((research) => (
                <Select data={research} key={research.id}></Select>
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

export default Ural;